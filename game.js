/**
 * Social Stars - Complete Game Engine with Multi-Profile Support
 * Multiple kids can each have their own saved progress on the same device.
 */
(function () {
"use strict";

// ===== Helpers =====
var $ = function(s) { return document.querySelector(s); };
var $$ = function(s) { return document.querySelectorAll(s); };

function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
}

function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85; u.pitch = 1.1; u.lang = "en-US";
    window.speechSynthesis.speak(u);
}

function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

function friendlyDate(iso) {
    var d = new Date(iso);
    try { return d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }); }
    catch(e) { return iso; }
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ===== Default State for a new profile =====
function freshState(name) {
    return {
        playerName: name || "",
        totalStars: 0,
        difficulty: 1,
        categoriesCompleted: [],
        emotionMatchDone: false,
        calmUsed: false,
        storyRead: false,
        perfectRound: false,
        earnedBadges: [],
        activeTheme: "",
        checkins: [],
        categoryStats: {}
    };
}

// ===== Runtime state (not saved) =====
var state = freshState("");
var currentProfileId = null;

// Transient game state
var game = {
    currentCategory: null,
    currentScenarios: [],
    currentIndex: 0,
    roundStars: 0,
    answered: false
};

// ===== Multi-Profile Persistence =====
function getAllProfiles() {
    try {
        var raw = localStorage.getItem("socialStarsProfiles");
        return raw ? JSON.parse(raw) : {};
    } catch(e) { return {}; }
}

function saveAllProfiles(profiles) {
    try { localStorage.setItem("socialStarsProfiles", JSON.stringify(profiles)); } catch(e) {}
}

function loadProfile(id) {
    var profiles = getAllProfiles();
    var p = profiles[id];
    if (p) {
        state = freshState("");
        Object.keys(p).forEach(function(k) { state[k] = p[k]; });
        currentProfileId = id;
    }
}

function saveProfile() {
    if (!currentProfileId) return;
    var profiles = getAllProfiles();
    profiles[currentProfileId] = JSON.parse(JSON.stringify(state));
    saveAllProfiles(profiles);
}

function createProfile(name) {
    var profiles = getAllProfiles();
    var id = "p_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    state = freshState(name);
    currentProfileId = id;
    profiles[id] = JSON.parse(JSON.stringify(state));
    saveAllProfiles(profiles);
    return id;
}

function deleteProfile(id) {
    var profiles = getAllProfiles();
    delete profiles[id];
    saveAllProfiles(profiles);
}

// Migrate old single-profile data if it exists
function migrateOldData() {
    try {
        var old = localStorage.getItem("socialStars2");
        if (old) {
            var d = JSON.parse(old);
            if (d.playerName) {
                var profiles = getAllProfiles();
                var id = "p_migrated_" + Math.random().toString(36).substr(2, 5);
                var s = freshState(d.playerName);
                Object.keys(d).forEach(function(k) { if (k in s) s[k] = d[k]; });
                profiles[id] = s;
                saveAllProfiles(profiles);
                localStorage.removeItem("socialStars2");
            }
        }
    } catch(e) {}
}

// ===== Screen Management =====
function showScreen(id) {
    $$(".screen").forEach(function(s) { s.classList.remove("active"); });
    var el = $("#" + id);
    if (el) { el.classList.add("active"); el.scrollTop = 0; window.scrollTo(0, 0); }
}

function updateStars() {
    var t = "\u2B50 " + state.totalStars;
    ["#star-count","#cat-star-count","#game-star-count","#em-star-count","#hf-star-count"].forEach(function(s) {
        var el = $(s); if (el) el.textContent = t;
    });
    var bc = $("#badge-count");
    if (bc) bc.textContent = "\u{1F3C5} " + state.earnedBadges.length;
}

function applyTheme() { document.body.className = state.activeTheme || ""; }

function checkBadges() {
    var newBadge = null;
    BADGES.forEach(function(b) {
        if (state.earnedBadges.indexOf(b.id) === -1 && b.condition(state)) {
            state.earnedBadges.push(b.id);
            newBadge = b;
        }
    });
    saveProfile(); updateStars();
    return newBadge;
}

// ===== Profile Picker Screen =====
function renderProfilePicker() {
    migrateOldData();
    var profiles = getAllProfiles();
    var keys = Object.keys(profiles);
    var grid = $("#profile-grid");
    grid.innerHTML = "";

    keys.forEach(function(id) {
        var p = profiles[id];
        var card = document.createElement("button");
        card.className = "profile-card";
        card.innerHTML =
            '<span class="profile-avatar">' + getAvatar(p.playerName) + '</span>' +
            '<span class="profile-name">' + escHtml(p.playerName) + '</span>' +
            '<span class="profile-stars">\u2B50 ' + (p.totalStars || 0) + '</span>';
        card.addEventListener("click", function() {
            loadProfile(id);
            applyTheme();
            updateStars();
            $("#player-greeting").textContent = "Hi, " + state.playerName + "!";
            showScreen("menu-screen");
        });

        // Long-press / right-click to delete
        card.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            if (confirm("Remove " + p.playerName + "'s profile? This cannot be undone.")) {
                deleteProfile(id);
                renderProfilePicker();
            }
        });

        grid.appendChild(card);
    });

    // "Add new player" card
    var addCard = document.createElement("button");
    addCard.className = "profile-card profile-add";
    addCard.innerHTML =
        '<span class="profile-avatar">➕</span>' +
        '<span class="profile-name">New Player</span>' +
        '<span class="profile-stars">Add a new profile</span>';
    addCard.addEventListener("click", function() { showScreen("welcome-screen"); });
    grid.appendChild(addCard);

    // If no profiles exist, go straight to welcome
    if (keys.length === 0) {
        showScreen("welcome-screen");
    } else {
        showScreen("profile-screen");
    }
}

function getAvatar(name) {
    var avatars = ["\u{1F31F}","\u{1F338}","\u{1F98B}","\u{1F984}","\u{1F308}","\u{1F680}","\u{1F436}","\u{1F431}","\u{1F42C}","\u{1F985}"];
    var sum = 0;
    for (var i = 0; i < (name||"").length; i++) sum += name.charCodeAt(i);
    return avatars[sum % avatars.length];
}

function escHtml(s) {
    var d = document.createElement("div"); d.textContent = s; return d.innerHTML;
}

// ===== Welcome Screen (New Profile) =====
function initWelcome() {
    var inp = $("#player-name");
    var btn = $("#start-btn");
    inp.value = "";
    btn.disabled = true;

    inp.addEventListener("input", function() {
        btn.disabled = inp.value.trim().length === 0;
    });
    inp.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !btn.disabled) createAndStart();
    });
    btn.addEventListener("click", createAndStart);

    // Back to profiles button
    var backBtn = $("#welcome-back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", function() {
            var profiles = getAllProfiles();
            if (Object.keys(profiles).length > 0) renderProfilePicker();
        });
    }
}

function createAndStart() {
    var name = $("#player-name").value.trim();
    if (!name) return;
    createProfile(name);
    applyTheme();
    updateStars();
    $("#player-greeting").textContent = "Hi, " + state.playerName + "!";
    showScreen("menu-screen");
}

// ===== Menu Navigation =====
function initMenu() {
    var routes = {
        "menu-learn": function() { showScreen("category-screen"); renderCategories(); },
        "menu-emotions": function() { startEmotionMatch(); },
        "menu-howfeel": function() { startHowFeel(); },
        "menu-stories": function() { renderStories(); showScreen("stories-screen"); },
        "menu-calm": function() { state.calmUsed = true; saveProfile(); checkBadges(); showScreen("calm-screen"); },
        "menu-thermometer": function() { initThermometer(); showScreen("thermometer-screen"); },
        "menu-checkin": function() { renderCheckin(); showScreen("checkin-screen"); },
        "menu-rewards": function() { renderRewards(); showScreen("rewards-screen"); },
        "menu-parent": function() { renderParent(); showScreen("parent-screen"); }
    };
    Object.keys(routes).forEach(function(id) {
        var el = $("#" + id); if (el) el.addEventListener("click", routes[id]);
    });

    // Back buttons to menu
    ["#cat-back-btn","#em-back-btn","#hf-back-btn","#ss-back-btn","#calm-back-btn",
     "#therm-back-btn","#ci-back-btn","#rew-back-btn","#par-back-btn","#menu-from-results"].forEach(function(s) {
        var el = $(s); if (el) el.addEventListener("click", function() { showScreen("menu-screen"); });
    });

    // Switch profile button
    var spBtn = $("#switch-profile-btn");
    if (spBtn) spBtn.addEventListener("click", function() { renderProfilePicker(); });
}

// ===== Learn & Play with Difficulty =====
function renderCategories() {
    var grid = $("#category-grid"); grid.innerHTML = "";
    CATEGORIES.forEach(function(cat) {
        var card = document.createElement("button");
        card.className = "category-card";
        card.innerHTML = '<span class="card-emoji">' + cat.emoji + '</span>' +
            '<span class="card-title">' + cat.title + '</span>' +
            '<span class="card-desc">' + cat.description + '</span>';
        card.addEventListener("click", function() {
            state.difficulty = parseInt($("#difficulty-select").value) || 1;
            startCategory(cat.id);
        });
        grid.appendChild(card);
    });
}

function startCategory(catId) {
    game.currentCategory = catId;
    game.currentIndex = 0;
    game.roundStars = 0;
    game.answered = false;
    var all = SCENARIOS[catId] || [];
    var diff = state.difficulty;
    var filtered = all.filter(function(s) { return s.difficulty <= diff; });
    if (filtered.length === 0) filtered = all;
    game.currentScenarios = shuffleArray(filtered);
    updateStars(); showScenario(); showScreen("game-screen");
}

function showScenario() {
    var sc = game.currentScenarios[game.currentIndex];
    var total = game.currentScenarios.length;
    $("#progress-bar").style.width = ((game.currentIndex / total) * 100) + "%";
    $("#scenario-emoji").textContent = sc.emoji;
    $("#scenario-text").textContent = sc.text;
    var area = $("#choices-area"); area.innerHTML = "";
    shuffleArray(sc.choices).forEach(function(ch) {
        var btn = document.createElement("button");
        btn.className = "choice-btn"; btn.textContent = ch.text;
        btn.addEventListener("click", function() { handleChoice(ch, btn); });
        area.appendChild(btn);
    });
    $("#feedback-area").classList.add("hidden");
    game.answered = false;
}

function handleChoice(choice, selBtn) {
    if (game.answered) return;
    game.answered = true;
    var sc = game.currentScenarios[game.currentIndex];
    $$("#choices-area .choice-btn").forEach(function(btn) {
        btn.disabled = true;
        var correct = sc.choices.find(function(c) { return c.correct; });
        if (btn.textContent === correct.text) btn.classList.add("correct");
    });
    if (choice.correct) {
        selBtn.classList.add("correct");
        $("#feedback-icon").textContent = "\u{1F31F}";
        $("#feedback-text").textContent = "Amazing job!";
        $("#feedback-text").className = "feedback-text success";
        $("#feedback-explanation").textContent = sc.correctFeedback;
        game.roundStars++; state.totalStars++;
    } else {
        selBtn.classList.add("gentle");
        $("#feedback-icon").textContent = "\u{1F4A1}";
        $("#feedback-text").textContent = "Good try! Here's a tip:";
        $("#feedback-text").className = "feedback-text encourage";
        $("#feedback-explanation").textContent = sc.encourageFeedback;
    }
    saveProfile(); updateStars();
    $("#feedback-area").classList.remove("hidden");
    $("#next-btn").focus();
}

$("#next-btn").addEventListener("click", function() {
    game.currentIndex++;
    if (game.currentIndex >= game.currentScenarios.length) finishRound();
    else showScenario();
});

$("#back-btn").addEventListener("click", function() { renderCategories(); showScreen("category-screen"); });
$("#audio-btn").addEventListener("click", function() { speak($("#scenario-text").textContent); });

function finishRound() {
    var total = game.currentScenarios.length;
    var stars = game.roundStars;
    var ratio = stars / total;
    if (state.categoriesCompleted.indexOf(game.currentCategory) === -1)
        state.categoriesCompleted.push(game.currentCategory);
    if (ratio === 1) state.perfectRound = true;
    if (!state.categoryStats) state.categoryStats = {};
    var prev = state.categoryStats[game.currentCategory] || { played:0, bestScore:0, totalQ:0, totalCorrect:0 };
    prev.played++; prev.totalQ += total; prev.totalCorrect += stars;
    if (stars > prev.bestScore) prev.bestScore = stars;
    state.categoryStats[game.currentCategory] = prev;
    saveProfile();

    if (ratio >= 0.8) {
        $("#results-emoji").textContent = "\u{1F3C6}"; $("#results-title").textContent = "Superstar!";
        $("#results-message").textContent = "Wow, " + state.playerName + "! You got " + stars + " out of " + total + " right away!";
    } else if (ratio >= 0.5) {
        $("#results-emoji").textContent = "\u{1F31F}"; $("#results-title").textContent = "Great Job!";
        $("#results-message").textContent = "Nice work, " + state.playerName + "! You got " + stars + " out of " + total + ". You're learning so much!";
    } else {
        $("#results-emoji").textContent = "\u{1F4AA}"; $("#results-title").textContent = "Keep Going!";
        $("#results-message").textContent = "You're doing great, " + state.playerName + "! You got " + stars + " out of " + total + ". Every try helps you learn!";
    }
    var si = ""; for (var i = 0; i < total; i++) si += i < stars ? "\u2B50" : "\u2606";
    $("#results-stars").textContent = si;
    var badge = checkBadges();
    var rb = $("#results-badge");
    if (badge) { rb.classList.remove("hidden"); rb.textContent = "\u{1F389} New Badge: " + badge.emoji + " " + badge.name + "!"; }
    else { rb.classList.add("hidden"); }
    updateStars(); showScreen("results-screen");
}

$("#replay-btn").addEventListener("click", function() { startCategory(game.currentCategory); });
$("#new-topic-btn").addEventListener("click", function() { renderCategories(); showScreen("category-screen"); });


// ===== Emotion Match =====
var emState = { items: [], index: 0, stars: 0, answered: false };

function startEmotionMatch() {
    emState.items = shuffleArray(EMOTION_MATCH.slice());
    emState.index = 0; emState.stars = 0; emState.answered = false;
    updateStars(); showEmRound(); showScreen("emotion-match-screen");
}

function showEmRound() {
    var item = emState.items[emState.index];
    $("#em-progress-bar").style.width = ((emState.index / emState.items.length) * 100) + "%";
    $("#em-face").textContent = item.face;
    var area = $("#em-choices"); area.innerHTML = "";
    shuffleArray(item.options).forEach(function(opt) {
        var btn = document.createElement("button");
        btn.className = "em-choice-btn"; btn.textContent = opt;
        btn.addEventListener("click", function() { handleEmChoice(opt, btn); });
        area.appendChild(btn);
    });
    $("#em-feedback").classList.add("hidden"); emState.answered = false;
}

function handleEmChoice(opt, selBtn) {
    if (emState.answered) return; emState.answered = true;
    var item = emState.items[emState.index];
    $$("#em-choices .em-choice-btn").forEach(function(btn) {
        btn.disabled = true;
        if (btn.textContent === item.answer) btn.classList.add("correct");
    });
    if (opt === item.answer) {
        selBtn.classList.add("correct");
        $("#em-feedback-icon").textContent = "\u{1F31F}";
        $("#em-feedback-text").textContent = "That's right! This face shows " + item.answer + "!";
        $("#em-feedback-text").className = "feedback-text success";
        emState.stars++; state.totalStars++;
    } else {
        selBtn.classList.add("gentle");
        $("#em-feedback-icon").textContent = "\u{1F4A1}";
        $("#em-feedback-text").textContent = "Good try! This face actually shows " + item.answer + ".";
        $("#em-feedback-text").className = "feedback-text encourage";
    }
    saveProfile(); updateStars();
    $("#em-feedback").classList.remove("hidden"); $("#em-next-btn").focus();
}

$("#em-next-btn").addEventListener("click", function() {
    emState.index++;
    if (emState.index >= emState.items.length) {
        state.emotionMatchDone = true; saveProfile(); checkBadges();
        var total = emState.items.length, stars = emState.stars;
        $("#results-emoji").textContent = "\u{1F3AD}";
        $("#results-title").textContent = "Emotion Match Complete!";
        $("#results-message").textContent = "You matched " + stars + " out of " + total + " faces correctly! Great job, " + state.playerName + "!";
        var si = ""; for (var i = 0; i < total; i++) si += i < stars ? "\u2B50" : "\u2606";
        $("#results-stars").textContent = si;
        var badge = checkBadges(); var rb = $("#results-badge");
        if (badge) { rb.classList.remove("hidden"); rb.textContent = "\u{1F389} New Badge: " + badge.emoji + " " + badge.name + "!"; }
        else { rb.classList.add("hidden"); }
        showScreen("results-screen");
    } else { showEmRound(); }
});

// ===== How Would You Feel =====
var hfState = { items: [], index: 0, answered: false };

function startHowFeel() {
    hfState.items = shuffleArray(HOW_WOULD_YOU_FEEL.slice());
    hfState.index = 0; hfState.answered = false;
    showHfRound(); showScreen("howfeel-screen");
}

function showHfRound() {
    var item = hfState.items[hfState.index];
    $("#hf-emoji").textContent = item.emoji; $("#hf-text").textContent = item.text;
    var area = $("#hf-choices"); area.innerHTML = "";
    item.feelings.forEach(function(f) {
        var btn = document.createElement("button");
        btn.className = "em-choice-btn"; btn.textContent = f;
        btn.addEventListener("click", function() { handleHfChoice(f, btn); });
        area.appendChild(btn);
    });
    $("#hf-feedback").classList.add("hidden"); hfState.answered = false;
}

function handleHfChoice(feeling, selBtn) {
    if (hfState.answered) return; hfState.answered = true;
    var item = hfState.items[hfState.index];
    $$("#hf-choices .em-choice-btn").forEach(function(btn) { btn.disabled = true; });
    selBtn.classList.add("correct");
    $("#hf-feedback-icon").textContent = "\u{1F49C}";
    $("#hf-feedback-text").textContent = "Thanks for sharing!";
    $("#hf-feedback-text").className = "feedback-text success";
    $("#hf-feedback-explain").textContent = item.responses[feeling] || "That's a completely valid feeling!";
    state.totalStars++; saveProfile(); updateStars();
    $("#hf-feedback").classList.remove("hidden"); $("#hf-next-btn").focus();
}

$("#hf-next-btn").addEventListener("click", function() {
    hfState.index++;
    if (hfState.index >= hfState.items.length) { checkBadges(); showScreen("menu-screen"); }
    else { showHfRound(); }
});

// ===== Social Stories =====
var svState = { story: null, step: 0 };

function renderStories() {
    var list = $("#ss-list"); list.innerHTML = "";
    SOCIAL_STORIES.forEach(function(story) {
        var card = document.createElement("button");
        card.className = "story-card";
        card.innerHTML = '<span class="story-icon">' + story.emoji + '</span>' +
            '<div class="story-info"><div class="story-title">' + story.title + '</div>' +
            '<div class="story-desc">' + story.description + '</div></div>';
        card.addEventListener("click", function() { openStory(story); });
        list.appendChild(card);
    });
}

function openStory(story) {
    svState.story = story; svState.step = 0;
    state.storyRead = true; saveProfile(); checkBadges();
    $("#sv-title").textContent = story.emoji + " " + story.title;
    showStoryStep(); showScreen("story-viewer-screen");
}

function showStoryStep() {
    var s = svState.story.steps[svState.step], total = svState.story.steps.length;
    $("#sv-step-indicator").textContent = "Step " + (svState.step+1) + " of " + total;
    $("#sv-step-emoji").textContent = s.emoji; $("#sv-step-text").textContent = s.text;
    $("#sv-prev").disabled = svState.step === 0;
    $("#sv-next").textContent = svState.step === total-1 ? "Done \u2714" : "Next \u2192";
}

$("#sv-prev").addEventListener("click", function() { if (svState.step > 0) { svState.step--; showStoryStep(); } });
$("#sv-next").addEventListener("click", function() {
    if (svState.step < svState.story.steps.length-1) { svState.step++; showStoryStep(); }
    else { renderStories(); showScreen("stories-screen"); }
});
$("#sv-back-btn").addEventListener("click", function() { renderStories(); showScreen("stories-screen"); });
$("#sv-audio-btn").addEventListener("click", function() { speak($("#sv-step-text").textContent); });

// ===== Calm Down Corner =====
var breathInterval = null, breathCount = 0;

$("#calm-breathing").addEventListener("click", function() { showScreen("breathing-screen"); });
$("#calm-grounding").addEventListener("click", function() { groundState.step = 0; showGroundStep(); showScreen("grounding-screen"); });
$("#calm-squeeze").addEventListener("click", function() { squeezeCount = 0; $("#squeeze-counter").textContent = "Squeezes: 0"; showScreen("squeeze-screen"); });

$("#breathing-start").addEventListener("click", startBreathing);
$("#breathing-circle").addEventListener("click", startBreathing);

function startBreathing() {
    if (breathInterval) { stopBreathing(); return; }
    breathCount = 0; $("#breathing-start").textContent = "Stop"; doBreathe();
}

function doBreathe() {
    var circle = $("#breathing-circle"), label = $("#breathing-label"), counter = $("#breathing-counter");
    circle.classList.remove("exhale"); circle.classList.add("inhale"); label.textContent = "Breathe in...";
    breathInterval = setTimeout(function() {
        label.textContent = "Hold...";
        breathInterval = setTimeout(function() {
            circle.classList.remove("inhale"); circle.classList.add("exhale");
            label.textContent = "Breathe out..."; breathCount++;
            counter.textContent = "Breaths: " + breathCount;
            breathInterval = setTimeout(function() {
                if (breathCount >= 5) {
                    label.textContent = "Great job! \u{1F31F}";
                    counter.textContent = "You did 5 breaths! Feel calmer?";
                    $("#breathing-start").textContent = "Start Breathing";
                    breathInterval = null;
                    state.calmUsed = true; saveProfile(); checkBadges();
                } else { doBreathe(); }
            }, 4000);
        }, 2000);
    }, 4000);
}

function stopBreathing() {
    if (breathInterval) { clearTimeout(breathInterval); breathInterval = null; }
    $("#breathing-circle").classList.remove("inhale","exhale");
    $("#breathing-label").textContent = "Tap to start";
    $("#breathing-start").textContent = "Start Breathing";
}

$("#breath-back-btn").addEventListener("click", function() { stopBreathing(); showScreen("calm-screen"); });

// Grounding
var groundState = { step: 0 };
function showGroundStep() {
    var s = GROUNDING_STEPS[groundState.step];
    $("#grounding-emoji").textContent = s.emoji; $("#grounding-prompt").textContent = s.text;
    $("#grounding-prev").disabled = groundState.step === 0;
    $("#grounding-next").textContent = groundState.step === GROUNDING_STEPS.length-1 ? "Done \u2714" : "Next \u2192";
}
$("#grounding-prev").addEventListener("click", function() { if (groundState.step > 0) { groundState.step--; showGroundStep(); } });
$("#grounding-next").addEventListener("click", function() {
    if (groundState.step < GROUNDING_STEPS.length-1) { groundState.step++; showGroundStep(); }
    else { state.calmUsed = true; saveProfile(); checkBadges(); showScreen("calm-screen"); }
});
$("#ground-back-btn").addEventListener("click", function() { showScreen("calm-screen"); });

// Squeeze
var squeezeCount = 0, sqCircle = $("#squeeze-circle");
function sqDown() { sqCircle.classList.add("pressed"); sqCircle.querySelector(".breathing-label").textContent = "Squeezing..."; }
function sqUp() {
    sqCircle.classList.remove("pressed"); squeezeCount++;
    sqCircle.querySelector(".breathing-label").textContent = "Hold me!";
    $("#squeeze-counter").textContent = "Squeezes: " + squeezeCount;
    if (squeezeCount >= 5) {
        $("#squeeze-counter").textContent = "Great job! " + squeezeCount + " squeezes! \u{1F31F}";
        state.calmUsed = true; saveProfile(); checkBadges();
    }
}
sqCircle.addEventListener("mousedown", sqDown);
sqCircle.addEventListener("mouseup", sqUp);
sqCircle.addEventListener("mouseleave", function() { if (sqCircle.classList.contains("pressed")) sqUp(); });
sqCircle.addEventListener("touchstart", function(e) { e.preventDefault(); sqDown(); }, { passive: false });
sqCircle.addEventListener("touchend", function(e) { e.preventDefault(); sqUp(); }, { passive: false });
$("#squeeze-back-btn").addEventListener("click", function() { showScreen("calm-screen"); });

// ===== Emotion Thermometer =====
function initThermometer() { $("#therm-slider").value = 0; updateTherm(); }
function updateTherm() {
    var val = parseInt($("#therm-slider").value), level = THERM_LEVELS[val];
    $("#therm-emoji").textContent = level.emoji;
    $("#therm-label").textContent = level.label;
    $("#therm-label").style.color = level.color;
    $("#therm-tip").textContent = level.tip;
    if (val >= 3) $("#therm-calm-btn").classList.remove("hidden");
    else $("#therm-calm-btn").classList.add("hidden");
}
$("#therm-slider").addEventListener("input", updateTherm);
$("#therm-calm-btn").addEventListener("click", function() { state.calmUsed = true; saveProfile(); checkBadges(); showScreen("calm-screen"); });


// ===== Daily Check-In =====
function renderCheckin() {
    $$(".ci-face").forEach(function(f) { f.classList.remove("selected"); });
    $("#ci-response").classList.add("hidden");
    renderCheckinHistory();
}

$$(".ci-face").forEach(function(face) {
    face.addEventListener("click", function() {
        var mood = face.getAttribute("data-mood");
        $$(".ci-face").forEach(function(f) { f.classList.remove("selected"); });
        face.classList.add("selected");
        var entry = { mood: mood, date: todayStr(), emoji: face.querySelector(".ci-face-emoji").textContent };
        state.checkins = state.checkins.filter(function(c) { return c.date !== todayStr(); });
        state.checkins.push(entry);
        state.totalStars++; saveProfile(); updateStars();
        $("#ci-response-text").textContent = CHECKIN_RESPONSES[mood] || "Thanks for sharing!";
        $("#ci-response").classList.remove("hidden");
        checkBadges(); renderCheckinHistory();
    });
});

function renderCheckinHistory() {
    var hist = $("#ci-history"), empty = $("#ci-empty");
    hist.innerHTML = "";
    if (!state.checkins || state.checkins.length === 0) { empty.style.display = "block"; return; }
    empty.style.display = "none";
    state.checkins.slice(-14).reverse().forEach(function(e) {
        var div = document.createElement("div"); div.className = "ci-entry";
        div.innerHTML = '<span class="ci-entry-emoji">' + (e.emoji||"\u{1F60A}") + '</span>' +
            '<div class="ci-entry-info"><div class="ci-entry-mood">' + capitalize(e.mood) + '</div>' +
            '<div class="ci-entry-date">' + friendlyDate(e.date) + '</div></div>';
        hist.appendChild(div);
    });
}

// ===== Rewards & Themes =====
function renderRewards() {
    var grid = $("#rewards-grid"); grid.innerHTML = "";
    BADGES.forEach(function(b) {
        var earned = state.earnedBadges.indexOf(b.id) !== -1;
        var card = document.createElement("div");
        card.className = "reward-card " + (earned ? "earned" : "locked");
        card.innerHTML = '<span class="reward-emoji">' + b.emoji + '</span>' +
            '<div class="reward-name">' + b.name + '</div>' +
            '<div class="reward-desc">' + (earned ? b.desc : "\u{1F512} " + b.desc) + '</div>';
        grid.appendChild(card);
    });
    var tGrid = $("#themes-grid"); tGrid.innerHTML = "";
    THEMES.forEach(function(t) {
        var unlocked = state.totalStars >= t.starsNeeded;
        var active = state.activeTheme === t.className;
        var card = document.createElement("button");
        card.className = "reward-card " + (unlocked ? "earned" : "locked") + (active ? " active-theme" : "");
        card.innerHTML = '<span class="reward-emoji">' + t.emoji + '</span>' +
            '<div class="reward-name">' + t.name + '</div>' +
            '<div class="reward-desc">' + (unlocked ? t.desc : "\u{1F512} Need " + t.starsNeeded + " stars") + '</div>';
        if (unlocked) card.addEventListener("click", function() {
            state.activeTheme = t.className; saveProfile(); applyTheme(); renderRewards();
        });
        tGrid.appendChild(card);
    });
}

// ===== Parent Dashboard =====
function renderParent() {
    // If multiple profiles, show all kids
    var profiles = getAllProfiles();
    var keys = Object.keys(profiles);

    // Current child stats
    $("#parent-stats").innerHTML =
        '<div class="stat-card"><div class="stat-value">' + state.totalStars + '</div><div class="stat-label">Total Stars</div></div>' +
        '<div class="stat-card"><div class="stat-value">' + state.earnedBadges.length + '</div><div class="stat-label">Badges</div></div>' +
        '<div class="stat-card"><div class="stat-value">' + state.categoriesCompleted.length + '/6</div><div class="stat-label">Topics Done</div></div>' +
        '<div class="stat-card"><div class="stat-value">' + (state.checkins||[]).length + '</div><div class="stat-label">Check-Ins</div></div>' +
        (keys.length > 1 ? '<div class="stat-card"><div class="stat-value">' + keys.length + '</div><div class="stat-label">Total Players</div></div>' : '');

    // Category performance
    var catDiv = $("#parent-categories"); catDiv.innerHTML = "";
    CATEGORIES.forEach(function(cat) {
        var cs = (state.categoryStats||{})[cat.id]; var pct = 0;
        if (cs && cs.totalQ > 0) pct = Math.round((cs.totalCorrect / cs.totalQ) * 100);
        var row = document.createElement("div"); row.className = "parent-cat-row";
        row.innerHTML = '<span class="parent-cat-name">' + cat.emoji + ' ' + cat.title + '</span>' +
            '<div class="parent-cat-bar"><div class="parent-cat-fill" style="width:' + pct + '%"></div></div>' +
            '<span class="parent-cat-pct">' + pct + '%</span>';
        catDiv.appendChild(row);
    });

    // Journal
    var jDiv = $("#parent-journal"); jDiv.innerHTML = "";
    if (state.checkins && state.checkins.length > 0) {
        state.checkins.slice(-7).reverse().forEach(function(e) {
            var div = document.createElement("div"); div.className = "ci-entry";
            div.innerHTML = '<span class="ci-entry-emoji">' + (e.emoji||"\u{1F60A}") + '</span>' +
                '<div class="ci-entry-info"><div class="ci-entry-mood">' + capitalize(e.mood) + '</div>' +
                '<div class="ci-entry-date">' + friendlyDate(e.date) + '</div></div>';
            jDiv.appendChild(div);
        });
    } else { jDiv.innerHTML = '<p style="color:var(--color-text-light);font-style:italic;">No check-ins yet.</p>'; }

    // If multiple profiles, show a summary of all kids
    if (keys.length > 1) {
        var allKidsHtml = '<h3 style="margin:24px 0 12px;">All Players Overview</h3>';
        keys.forEach(function(id) {
            var p = profiles[id];
            allKidsHtml += '<div class="parent-cat-row">' +
                '<span class="parent-cat-name">' + getAvatar(p.playerName) + ' ' + escHtml(p.playerName) + '</span>' +
                '<div class="parent-cat-bar"><div class="parent-cat-fill" style="width:' + Math.min(100, (p.totalStars||0)) + '%"></div></div>' +
                '<span class="parent-cat-pct">\u2B50 ' + (p.totalStars||0) + '</span></div>';
        });
        jDiv.insertAdjacentHTML("afterend", allKidsHtml);
    }

    // Suggestions
    var sugDiv = $("#parent-suggestions"); var suggestions = [];
    if (state.categoriesCompleted.length === 0) suggestions.push("Start with 'Understanding Emotions' \u2014 it's a great foundation.");
    if (!state.calmUsed) suggestions.push("Explore the Calm Down Corner together \u2014 the breathing bubble is great for regulation.");
    if ((state.checkins||[]).length < 3) suggestions.push("Encourage daily check-ins to build emotional vocabulary.");
    var weakest = null, weakPct = 101;
    CATEGORIES.forEach(function(cat) {
        var cs = (state.categoryStats||{})[cat.id];
        if (cs && cs.totalQ > 0) { var p = (cs.totalCorrect/cs.totalQ)*100; if (p < weakPct) { weakPct = p; weakest = cat; } }
    });
    if (weakest && weakPct < 70) suggestions.push("'" + weakest.title + "' could use more practice (" + Math.round(weakPct) + "%). Try an easier difficulty.");
    if (state.totalStars >= 25 && state.difficulty < 3) suggestions.push("Your child is doing well! Consider Level 2 or 3 for more challenge.");
    if (suggestions.length === 0) suggestions.push("Great progress across all areas! Keep up the wonderful work. \u{1F31F}");
    sugDiv.innerHTML = suggestions.map(function(s) { return "\u2022 " + s; }).join("<br><br>");
}

// ===== Keyboard =====
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        var id = (document.querySelector(".screen.active") || {}).id;
        if (id === "game-screen") { renderCategories(); showScreen("category-screen"); }
        else if (["results-screen","category-screen","emotion-match-screen","howfeel-screen",
                  "stories-screen","calm-screen","thermometer-screen","checkin-screen",
                  "rewards-screen","parent-screen"].indexOf(id) !== -1) { showScreen("menu-screen"); }
        else if (["breathing-screen","grounding-screen","squeeze-screen"].indexOf(id) !== -1) { stopBreathing(); showScreen("calm-screen"); }
        else if (id === "story-viewer-screen") { renderStories(); showScreen("stories-screen"); }
        else if (id === "menu-screen") { renderProfilePicker(); }
    }
});

// ===== Service Worker =====
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() { navigator.serviceWorker.register("sw.js").catch(function(){}); });
}

// ===== CONFETTI =====
var confettiCanvas = document.getElementById("confetti-canvas");
var confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;

function fireConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    var particles = [];
    var colors = ["#6c63ff","#ff9800","#4caf50","#e91e63","#ffc107","#2196f3","#9c27b0"];
    for (var i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: -20 - Math.random() * 100,
            w: 6 + Math.random() * 6,
            h: 4 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            rot: Math.random() * 360,
            rv: (Math.random() - 0.5) * 10
        });
    }
    var frames = 0;
    function draw() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        var alive = false;
        particles.forEach(function(p) {
            p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.rot += p.rv;
            if (p.y < confettiCanvas.height + 20) alive = true;
            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate(p.rot * Math.PI / 180);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            confettiCtx.restore();
        });
        frames++;
        if (alive && frames < 180) requestAnimationFrame(draw);
        else confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
    draw();
}

// ===== SOUND EFFECTS =====
var soundEnabled = true;
var audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return audioCtx;
}

function playChime() {
    if (!soundEnabled) return;
    var ctx = getAudioCtx(); if (!ctx) return;
    var osc = ctx.createOscillator(); var gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine"; osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
}

function playGentle() {
    if (!soundEnabled) return;
    var ctx = getAudioCtx(); if (!ctx) return;
    var osc = ctx.createOscillator(); var gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "sine"; osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3);
}

function playComplete() {
    if (!soundEnabled) return;
    var ctx = getAudioCtx(); if (!ctx) return;
    [523, 659, 784, 1047].forEach(function(freq, i) {
        var osc = ctx.createOscillator(); var gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine"; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);
        osc.start(ctx.currentTime + i * 0.15); osc.stop(ctx.currentTime + i * 0.15 + 0.3);
    });
}

var soundBtn = $("#sound-toggle");
if (soundBtn) {
    soundBtn.addEventListener("click", function() {
        soundEnabled = !soundEnabled;
        soundBtn.textContent = soundEnabled ? "\u{1F514}" : "\u{1F515}";
    });
}

// ===== STREAK TRACKER =====
function checkStreak() {
    if (!state.checkins || state.checkins.length < 2) return;
    var dates = state.checkins.map(function(c) { return c.date; }).sort().reverse();
    var streak = 1;
    for (var i = 0; i < dates.length - 1; i++) {
        var d1 = new Date(dates[i]), d2 = new Date(dates[i+1]);
        var diff = (d1 - d2) / (1000*60*60*24);
        if (diff <= 1.5) streak++; else break;
    }
    if (streak >= 2) {
        var banner = $("#streak-banner"), text = $("#streak-text");
        if (banner && text) {
            text.textContent = "\u{1F525} " + streak + " day streak! Keep it up, " + state.playerName + "!";
            banner.classList.remove("hidden");
            setTimeout(function() { banner.classList.add("hidden"); }, 4000);
        }
    }
}

// ===== TONE OF VOICE =====
var toneState = { items: [], index: 0, stars: 0, answered: false };

function startTone() {
    toneState.items = shuffleArray(TONE_OF_VOICE.slice());
    toneState.index = 0; toneState.stars = 0; toneState.answered = false;
    showToneRound(); showScreen("tone-screen");
}

function showToneRound() {
    var item = toneState.items[toneState.index];
    $("#tone-progress-bar").style.width = ((toneState.index / toneState.items.length) * 100) + "%";
    $("#tone-emoji").textContent = item.emoji;
    $("#tone-quote").textContent = item.quote;
    $("#tone-context").textContent = item.context;
    var area = $("#tone-choices"); area.innerHTML = "";
    shuffleArray(item.options).forEach(function(opt) {
        var btn = document.createElement("button");
        btn.className = "em-choice-btn"; btn.textContent = opt;
        btn.addEventListener("click", function() { handleToneChoice(opt, btn); });
        area.appendChild(btn);
    });
    $("#tone-feedback").classList.add("hidden"); toneState.answered = false;
}

function handleToneChoice(opt, selBtn) {
    if (toneState.answered) return; toneState.answered = true;
    var item = toneState.items[toneState.index];
    $$("#tone-choices .em-choice-btn").forEach(function(btn) {
        btn.disabled = true;
        if (btn.textContent === item.answer) btn.classList.add("correct");
    });
    if (opt === item.answer) {
        selBtn.classList.add("correct");
        $("#tone-feedback-icon").textContent = "\u{1F31F}";
        $("#tone-feedback-text").textContent = "You got it!";
        $("#tone-feedback-text").className = "feedback-text success";
        $("#tone-feedback-explain").textContent = item.correctFeedback;
        toneState.stars++; state.totalStars++; playChime();
    } else {
        selBtn.classList.add("gentle");
        $("#tone-feedback-icon").textContent = "\u{1F4A1}";
        $("#tone-feedback-text").textContent = "Good try!";
        $("#tone-feedback-text").className = "feedback-text encourage";
        $("#tone-feedback-explain").textContent = item.encourageFeedback;
        playGentle();
    }
    saveProfile(); updateStars();
    $("#tone-feedback").classList.remove("hidden"); $("#tone-next-btn").focus();
}

$("#tone-next-btn").addEventListener("click", function() {
    toneState.index++;
    if (toneState.index >= toneState.items.length) {
        playComplete(); fireConfetti();
        $("#results-emoji").textContent = "\u{1F5E3}\uFE0F";
        $("#results-title").textContent = "Tone Expert!";
        $("#results-message").textContent = "You identified " + toneState.stars + " out of " + toneState.items.length + " tones correctly! Great listening, " + state.playerName + "!";
        var si = ""; for (var i = 0; i < toneState.items.length; i++) si += i < toneState.stars ? "\u2B50" : "\u2606";
        $("#results-stars").textContent = si;
        var badge = checkBadges(); var rb = $("#results-badge");
        if (badge) { rb.classList.remove("hidden"); rb.textContent = "\u{1F389} New Badge: " + badge.emoji + " " + badge.name + "!"; }
        else { rb.classList.add("hidden"); }
        showScreen("results-screen");
    } else { showToneRound(); }
});

$("#tone-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });
$("#tone-audio-btn").addEventListener("click", function() {
    speak($("#tone-quote").textContent + ". " + $("#tone-context").textContent);
});

// ===== PERSPECTIVE TAKING =====
var perspState = { items: [], index: 0, stars: 0, answered: false };

function startPerspective() {
    perspState.items = shuffleArray(PERSPECTIVE_TAKING.slice());
    perspState.index = 0; perspState.stars = 0; perspState.answered = false;
    showPerspRound(); showScreen("perspective-screen");
}

function showPerspRound() {
    var item = perspState.items[perspState.index];
    $("#persp-progress-bar").style.width = ((perspState.index / perspState.items.length) * 100) + "%";
    $("#persp-emoji").textContent = item.emoji;
    $("#persp-text").textContent = item.text;
    var area = $("#persp-choices"); area.innerHTML = "";
    shuffleArray(item.choices).forEach(function(ch) {
        var btn = document.createElement("button");
        btn.className = "choice-btn"; btn.textContent = ch.text;
        btn.addEventListener("click", function() { handlePerspChoice(ch, btn); });
        area.appendChild(btn);
    });
    $("#persp-feedback").classList.add("hidden"); perspState.answered = false;
}

function handlePerspChoice(choice, selBtn) {
    if (perspState.answered) return; perspState.answered = true;
    var item = perspState.items[perspState.index];
    $$("#persp-choices .choice-btn").forEach(function(btn) {
        btn.disabled = true;
        var correct = item.choices.find(function(c) { return c.correct; });
        if (btn.textContent === correct.text) btn.classList.add("correct");
    });
    if (choice.correct) {
        selBtn.classList.add("correct");
        $("#persp-feedback-icon").textContent = "\u{1F31F}";
        $("#persp-feedback-text").textContent = "Great empathy!";
        $("#persp-feedback-text").className = "feedback-text success";
        $("#persp-feedback-explain").textContent = item.correctFeedback;
        perspState.stars++; state.totalStars++; playChime();
    } else {
        selBtn.classList.add("gentle");
        $("#persp-feedback-icon").textContent = "\u{1F4A1}";
        $("#persp-feedback-text").textContent = "Good thinking!";
        $("#persp-feedback-text").className = "feedback-text encourage";
        $("#persp-feedback-explain").textContent = item.encourageFeedback;
        playGentle();
    }
    saveProfile(); updateStars();
    $("#persp-feedback").classList.remove("hidden"); $("#persp-next-btn").focus();
}

$("#persp-next-btn").addEventListener("click", function() {
    perspState.index++;
    if (perspState.index >= perspState.items.length) {
        playComplete(); fireConfetti();
        $("#results-emoji").textContent = "\u{1F440}";
        $("#results-title").textContent = "Empathy Star!";
        $("#results-message").textContent = "You understood " + perspState.stars + " out of " + perspState.items.length + " perspectives! Amazing, " + state.playerName + "!";
        var si = ""; for (var i = 0; i < perspState.items.length; i++) si += i < perspState.stars ? "\u2B50" : "\u2606";
        $("#results-stars").textContent = si;
        var badge = checkBadges(); var rb = $("#results-badge");
        if (badge) { rb.classList.remove("hidden"); rb.textContent = "\u{1F389} New Badge: " + badge.emoji + " " + badge.name + "!"; }
        else { rb.classList.add("hidden"); }
        showScreen("results-screen");
    } else { showPerspRound(); }
});

$("#persp-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });

// ===== COPING CARDS =====
var copingState = { cards: [], index: 0 };

function startCoping() {
    copingState.cards = shuffleArray(COPING_CARDS.slice());
    copingState.index = 0;
    showCopingCard(); showScreen("coping-screen");
}

function showCopingCard() {
    var card = copingState.cards[copingState.index];
    $("#coping-card-emoji").textContent = card.emoji;
    $("#coping-card-title").textContent = card.title;
    $("#coping-card-text").textContent = card.text;
}

$("#coping-prev").addEventListener("click", function() {
    if (copingState.index > 0) { copingState.index--; showCopingCard(); }
});
$("#coping-next").addEventListener("click", function() {
    if (copingState.index < copingState.cards.length - 1) { copingState.index++; showCopingCard(); }
    else { copingState.index = 0; showCopingCard(); }
});
$("#coping-shuffle").addEventListener("click", function() {
    copingState.cards = shuffleArray(COPING_CARDS.slice());
    copingState.index = 0; showCopingCard();
    var card = $("#coping-card");
    card.style.transform = "rotateY(180deg)";
    setTimeout(function() { card.style.transform = "rotateY(0deg)"; }, 300);
});
$("#coping-back-btn").addEventListener("click", function() { showScreen("calm-screen"); });

// ===== VISUAL TIMER =====
var timerState = { total: 60, remaining: 60, running: false, interval: null };
var TIMER_CIRCUMFERENCE = 2 * Math.PI * 90; // ~565.48

$$(".timer-preset-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        $$(".timer-preset-btn").forEach(function(b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var secs = parseInt(btn.getAttribute("data-seconds"));
        timerState.total = secs; timerState.remaining = secs;
        timerState.running = false;
        if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; }
        updateTimerDisplay();
        $("#timer-start").textContent = "Start";
    });
});

function updateTimerDisplay() {
    var mins = Math.floor(timerState.remaining / 60);
    var secs = timerState.remaining % 60;
    $("#timer-text").textContent = mins + ":" + String(secs).padStart(2, "0");
    var pct = timerState.total > 0 ? timerState.remaining / timerState.total : 0;
    var ring = $("#timer-ring");
    if (ring) ring.setAttribute("stroke-dashoffset", TIMER_CIRCUMFERENCE * (1 - pct));
}

$("#timer-start").addEventListener("click", function() {
    if (timerState.running) {
        timerState.running = false;
        if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; }
        $("#timer-start").textContent = "Start";
    } else {
        if (timerState.remaining <= 0) { timerState.remaining = timerState.total; }
        timerState.running = true;
        $("#timer-start").textContent = "Pause";
        timerState.interval = setInterval(function() {
            timerState.remaining--;
            updateTimerDisplay();
            if (timerState.remaining <= 0) {
                clearInterval(timerState.interval); timerState.interval = null;
                timerState.running = false;
                $("#timer-start").textContent = "Start";
                $("#timer-text").textContent = "Done!";
                playComplete();
            }
        }, 1000);
    }
});

$("#timer-reset").addEventListener("click", function() {
    timerState.running = false;
    if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; }
    timerState.remaining = timerState.total;
    updateTimerDisplay();
    $("#timer-start").textContent = "Start";
});

$("#timer-back-btn").addEventListener("click", function() {
    timerState.running = false;
    if (timerState.interval) { clearInterval(timerState.interval); timerState.interval = null; }
    showScreen("menu-screen");
});

updateTimerDisplay();

// ===== PIN-PROTECTED PARENT DASHBOARD =====
var parentPin = "1234";
var pinEntry = "";

try {
    var savedPin = localStorage.getItem("socialStarsPin");
    if (savedPin) parentPin = savedPin;
} catch(e) {}

$$(".pin-key").forEach(function(key) {
    key.addEventListener("click", function() {
        var val = key.getAttribute("data-key");
        if (val === "clear") { pinEntry = ""; }
        else if (val === "back") { pinEntry = pinEntry.slice(0, -1); }
        else if (pinEntry.length < 4) { pinEntry += val; }
        updatePinDots();
        if (pinEntry.length === 4) {
            if (pinEntry === parentPin) {
                pinEntry = "";
                updatePinDots();
                $("#pin-error").classList.add("hidden");
                renderParent();
                showScreen("parent-screen");
            } else {
                $("#pin-error").classList.remove("hidden");
                pinEntry = "";
                updatePinDots();
            }
        }
    });
});

function updatePinDots() {
    var dots = $$("#pin-display .pin-dot");
    dots.forEach(function(dot, i) {
        if (i < pinEntry.length) dot.classList.add("filled");
        else dot.classList.remove("filled");
    });
}

$("#pin-back-btn").addEventListener("click", function() { pinEntry = ""; updatePinDots(); showScreen("menu-screen"); });

// ===== Hook up new menu items and add confetti/sound to existing features =====
// Override the original menu routes for new features
var menuTone = $("#menu-tone");
if (menuTone) menuTone.addEventListener("click", function() { startTone(); });

var menuPersp = $("#menu-perspective");
if (menuPersp) menuPersp.addEventListener("click", function() { startPerspective(); });

var menuCoping = $("#menu-coping");
if (menuCoping) menuCoping.addEventListener("click", function() { startCoping(); });

var menuTimer = $("#menu-timer");
if (menuTimer) menuTimer.addEventListener("click", function() { showScreen("timer-screen"); });

// Override parent dashboard to go through PIN
var menuParent = $("#menu-parent");
if (menuParent) {
    // Remove old listener by replacing node
    var newParent = menuParent.cloneNode(true);
    menuParent.parentNode.replaceChild(newParent, menuParent);
    newParent.addEventListener("click", function() {
        pinEntry = ""; updatePinDots();
        $("#pin-error").classList.add("hidden");
        showScreen("pin-screen");
    });
}

// Add confetti and sound to existing correct answers
var origHandleChoice = handleChoice;
var _origHandleChoice = handleChoice;
// We already have sound calls in tone/perspective. Let's patch the main game:
// (The functions are already defined, we just need to add confetti to finishRound)
var origFinishRound = finishRound;

// Add confetti to results screen
var origShowScreen = showScreen;
showScreen = function(id) {
    origShowScreen(id);
    if (id === "results-screen") { fireConfetti(); playComplete(); }
    if (id === "menu-screen") { checkStreak(); }
};

// ===== Init =====
initWelcome();
initMenu();
renderProfilePicker();

})();
