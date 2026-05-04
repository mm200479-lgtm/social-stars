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
        categoryStats: {},
        lastLoginDate: "",
        streakBonuses: {},
        _thermUsedToday: "",
        toneDone: false,
        perspDone: false,
        vocabDone: false,
        copingDone: false,
        rulesRead: false,
        timerUsed: false,
        _sotdDate: "",
        _fontSize: 2,
        _highContrast: false,
        _simplified: false,
        chores: [],
        choresCompleted: {},
        choresDayComplete: false,
        weeklyComplete: false,
        weeklyProgress: {},
        weeklyId: "",
        replayCount: 0,
        levelsDone: { em: 1, tone: 1, persp: 1, hf: 1 }
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

// ===== Multi-Profile Persistence (with cloud sync) =====
function getAllProfiles() {
    try {
        var raw = localStorage.getItem("socialStarsProfiles");
        return raw ? JSON.parse(raw) : {};
    } catch(e) { return {}; }
}

function saveAllProfiles(profiles) {
    try { localStorage.setItem("socialStarsProfiles", JSON.stringify(profiles)); } catch(e) {}
    // Sync to cloud
    cloudSaveProfiles(profiles);
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

function getActiveTheme() {
    return THEMES.find(function(t) { return t.className === state.activeTheme; }) || THEMES[0];
}

function updateStars() {
    var theme = getActiveTheme();
    var icon = theme.starIcon || "\u2B50";
    var t = icon + " " + state.totalStars;
    ["#star-count","#cat-star-count","#game-star-count","#em-star-count","#hf-star-count","#tone-star-count","#persp-star-count"].forEach(function(s) {
        var el = $(s); if (el) el.textContent = t;
    });
    var bc = $("#badge-count");
    if (bc) bc.textContent = "\u{1F3C5} " + state.earnedBadges.length;
}

function applyTheme() {
    document.body.className = state.activeTheme || "";
    // Update welcome character if on welcome screen
    var wc = document.querySelector(".welcome-character");
    if (wc) {
        var theme = getActiveTheme();
        wc.textContent = theme.welcomeChar || "\u{1F31F}";
    }
}

function checkBadges() {
    var newBadge = null;
    var starsEarned = 0;
    BADGES.forEach(function(b) {
        if (state.earnedBadges.indexOf(b.id) === -1 && b.condition(state)) {
            state.earnedBadges.push(b.id);
            newBadge = b;
            starsEarned += 3;
        }
    });
    if (starsEarned > 0) {
        state.totalStars += starsEarned;
    }
    saveProfile(); updateStars();
    return newBadge;
}

function showBadgeResult(badge) {
    var rb = $("#results-badge");
    if (!rb) return;
    if (badge) {
        rb.classList.remove("hidden");
        rb.textContent = "\u{1F389} New Badge: " + badge.emoji + " " + badge.name + "! +3 \u2B50";
    } else {
        rb.classList.add("hidden");
    }
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
        var card = document.createElement("div");
        card.className = "profile-card";
        card.innerHTML =
            '<span class="profile-avatar">' + getAvatar(p.playerName) + '</span>' +
            '<span class="profile-name">' + escHtml(p.playerName) + '</span>' +
            '<span class="profile-stars">\u2B50 ' + (p.totalStars || 0) + '</span>' +
            '<button class="profile-delete-btn" aria-label="Delete profile" title="Delete profile">\u{274C}</button>';

        // Click the card to load profile
        card.addEventListener("click", function(e) {
            if (e.target.classList.contains("profile-delete-btn")) return;
            loadProfile(id);
            applyTheme();
            updateStars();
            $("#player-greeting").textContent = "Hi, " + state.playerName + "!";
            showScreen("menu-screen");
        });

        // Delete button
        (function(profileId, profileName) {
            card.querySelector(".profile-delete-btn").addEventListener("click", function(e) {
                e.stopPropagation();
                showDeleteModal(profileName, function() {
                    deleteProfile(profileId);
                    renderProfilePicker();
                });
            });
        })(id, p.playerName);

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

// Custom delete confirmation modal (works on iPad PWA)
var deleteModalCallback = null;

function showDeleteModal(name, onConfirm) {
    var modal = $("#delete-modal");
    var text = $("#delete-modal-text");
    if (!modal || !text) { if (onConfirm) onConfirm(); return; }
    text.innerHTML = "Remove <strong>" + escHtml(name) + "</strong>'s profile?<br><br>This will delete all their stars, badges, and journal entries.";
    deleteModalCallback = onConfirm;
    modal.classList.remove("hidden");
}

var delConfirmBtn = document.getElementById("delete-confirm-btn");
var delCancelBtn = document.getElementById("delete-cancel-btn");

if (delConfirmBtn) delConfirmBtn.addEventListener("click", function() {
    $("#delete-modal").classList.add("hidden");
    if (deleteModalCallback) { deleteModalCallback(); deleteModalCallback = null; }
});

if (delCancelBtn) delCancelBtn.addEventListener("click", function() {
    $("#delete-modal").classList.add("hidden");
    deleteModalCallback = null;
});

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
        "menu-rewards": function() { checkBadges(); renderRewards(); showScreen("rewards-screen"); },
        "menu-tone": function() { startTone(); },
        "menu-perspective": function() { startPerspective(); },
        "menu-coping": function() { startCoping(); },
        "menu-timer": function() { showScreen("timer-screen"); },
        "menu-vocab": function() { startVocab(); },
        "menu-rules": function() { renderRules(); showScreen("rules-screen"); },
        "menu-settings": function() { initSettings(); showScreen("settings-screen"); },
        "menu-chores": function() { renderChores(); showScreen("chores-screen"); },
        "menu-parent": function() {
            pinEntry = ""; updatePinDots();
            var pe = $("#pin-error"); if (pe) pe.classList.add("hidden");
            showScreen("pin-screen");
        }
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
    if (ratio === 1) {
        state.perfectRound = true;
        state.totalStars += 3;
    }
    // +2 completion bonus every time (replay rewards!)
    state.totalStars += 2;
    state.replayCount = (state.replayCount || 0) + 1;
    // Track weekly progress
    if (!state.weeklyProgress) state.weeklyProgress = {};
    state.weeklyProgress.catsPlayed = (state.weeklyProgress.catsPlayed || 0) + 1;

    if (!state.categoryStats) state.categoryStats = {};
    var prev = state.categoryStats[game.currentCategory] || { played:0, bestScore:0, totalQ:0, totalCorrect:0 };
    prev.played++; prev.totalQ += total; prev.totalCorrect += stars;
    if (stars > prev.bestScore) prev.bestScore = stars;
    state.categoryStats[game.currentCategory] = prev;
    saveProfile();

    if (ratio >= 0.8) {
        $("#results-emoji").textContent = "\u{1F3C6}"; $("#results-title").textContent = "Superstar!";
        var bonusMsg = ratio === 1 ? " (+3 bonus for perfect round!)" : "";
        $("#results-message").textContent = "Wow, " + state.playerName + "! You got " + stars + " out of " + total + " right away!" + bonusMsg;
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
    showBadgeResult(badge);
    updateStars(); showScreen("results-screen");
}

$("#replay-btn").addEventListener("click", function() { startCategory(game.currentCategory); });
$("#new-topic-btn").addEventListener("click", function() { renderCategories(); showScreen("category-screen"); });


// ===== Emotion Match (with levels) =====
var emState = { items: [], index: 0, stars: 0, answered: false, level: 1 };

function startEmotionMatch() {
    var maxLevel = (state.levelsDone || {}).em || 1;
    // Show level picker
    var lvl = maxLevel;
    if (maxLevel > 1) {
        var choice = prompt("Choose level (1-" + maxLevel + "):", maxLevel);
        if (choice) lvl = Math.max(1, Math.min(maxLevel, parseInt(choice) || 1));
    }
    emState.level = lvl;
    var data = (EMOTION_MATCH_LEVELS && EMOTION_MATCH_LEVELS[lvl]) ? EMOTION_MATCH_LEVELS[lvl] : EMOTION_MATCH;
    emState.items = shuffleArray(data.slice());
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
        state.emotionMatchDone = true;
        // Level completion: unlock next level, bonus stars based on level
        if (!state.levelsDone) state.levelsDone = {};
        if (emState.level >= (state.levelsDone.em || 1)) {
            state.levelsDone.em = Math.min(3, emState.level + 1);
        }
        var levelBonus = emState.level * 2; // Lv1=2, Lv2=4, Lv3=6
        state.totalStars += levelBonus;
        saveProfile(); checkBadges();
        var total = emState.items.length, stars = emState.stars;
        $("#results-emoji").textContent = "\u{1F3AD}";
        $("#results-title").textContent = "Emotion Match Complete!";
        $("#results-message").textContent = "You matched " + stars + " out of " + total + " faces correctly! Great job, " + state.playerName + "!";
        var si = ""; for (var i = 0; i < total; i++) si += i < stars ? "\u2B50" : "\u2606";
        $("#results-stars").textContent = si;
        showBadgeResult(checkBadges());
        showScreen("results-screen");
    } else { showEmRound(); }
});

// ===== How Would You Feel (with levels) =====
var hfState = { items: [], index: 0, answered: false, level: 1 };

function startHowFeel() {
    var maxLevel = (state.levelsDone || {}).hf || 1;
    var lvl = maxLevel;
    if (maxLevel > 1) {
        var choice = prompt("Choose level (1-" + maxLevel + "):", maxLevel);
        if (choice) lvl = Math.max(1, Math.min(maxLevel, parseInt(choice) || 1));
    }
    hfState.level = lvl;
    var data = (HOWFEEL_LEVELS && HOWFEEL_LEVELS[lvl]) ? HOWFEEL_LEVELS[lvl] : HOW_WOULD_YOU_FEEL;
    hfState.items = shuffleArray(data.slice());
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
    if (hfState.index >= hfState.items.length) {
        if (!state.levelsDone) state.levelsDone = {};
        if (hfState.level >= (state.levelsDone.hf || 1)) {
            state.levelsDone.hf = Math.min(3, hfState.level + 1);
        }
        state.totalStars += hfState.level * 2;
        if (!state.weeklyProgress) state.weeklyProgress = {};
        state.weeklyProgress.hfDone = true;
        saveProfile(); updateStars(); checkBadges();
        showScreen("menu-screen");
    }
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
    else {
        // +2 stars for reading a full story
        state.totalStars += 2; saveProfile(); updateStars(); playChime();
        renderStories(); showScreen("stories-screen");
    }
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
                    counter.textContent = "You did 5 breaths! +1 \u2B50";
                    $("#breathing-start").textContent = "Start Breathing";
                    breathInterval = null;
                    state.calmUsed = true; state.totalStars++; saveProfile(); updateStars(); checkBadges();
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
    else { state.calmUsed = true; state.totalStars++; saveProfile(); updateStars(); checkBadges(); showScreen("calm-screen"); }
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
        $("#squeeze-counter").textContent = "Great job! " + squeezeCount + " squeezes! +1 \u2B50";
        state.calmUsed = true; state.totalStars++; saveProfile(); updateStars(); checkBadges();
    }
}
sqCircle.addEventListener("mousedown", sqDown);
sqCircle.addEventListener("mouseup", sqUp);
sqCircle.addEventListener("mouseleave", function() { if (sqCircle.classList.contains("pressed")) sqUp(); });
sqCircle.addEventListener("touchstart", function(e) { e.preventDefault(); sqDown(); }, { passive: false });
sqCircle.addEventListener("touchend", function(e) { e.preventDefault(); sqUp(); }, { passive: false });
$("#squeeze-back-btn").addEventListener("click", function() { showScreen("calm-screen"); });

// ===== Emotion Thermometer =====
function initThermometer() {
    $("#therm-slider").value = 0; updateTherm();
    // +1 star for using the thermometer (once per session)
    if (!state._thermUsedToday || state._thermUsedToday !== todayStr()) {
        state._thermUsedToday = todayStr();
        state.totalStars++; saveProfile(); updateStars();
    }
}
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
var pendingCheckinMood = null;

function renderCheckin() {
    $$(".ci-face").forEach(function(f) { f.classList.remove("selected"); });
    $("#ci-response").classList.add("hidden");
    var noteInput = $("#ci-note-input");
    if (noteInput) noteInput.value = "";
    pendingCheckinMood = null;
    renderCheckinHistory();
}

$$(".ci-face").forEach(function(face) {
    face.addEventListener("click", function() {
        var mood = face.getAttribute("data-mood");
        $$(".ci-face").forEach(function(f) { f.classList.remove("selected"); });
        face.classList.add("selected");
        pendingCheckinMood = { mood: mood, emoji: face.querySelector(".ci-face-emoji").textContent };

        // Save entry immediately (without note)
        var entry = { mood: mood, date: todayStr(), emoji: pendingCheckinMood.emoji, note: "" };
        state.checkins = state.checkins.filter(function(c) { return c.date !== todayStr(); });
        state.checkins.push(entry);
        state.totalStars++; saveProfile(); updateStars();

        $("#ci-response-text").textContent = CHECKIN_RESPONSES[mood] || "Thanks for sharing!";
        $("#ci-response").classList.remove("hidden");
        var noteInput = $("#ci-note-input");
        if (noteInput) { noteInput.value = ""; noteInput.focus(); }

        checkBadges(); renderCheckinHistory();
    });
});

// Save note button
var saveNoteBtn = $("#ci-save-note");
if (saveNoteBtn) {
    saveNoteBtn.addEventListener("click", function() {
        var noteInput = $("#ci-note-input");
        var noteText = noteInput ? noteInput.value.trim() : "";
        if (!noteText) return;

        // Find today's entry and add the note
        var todayEntry = state.checkins.find(function(c) { return c.date === todayStr(); });
        if (todayEntry) {
            var isNewNote = !todayEntry.note;
            todayEntry.note = noteText;
            // 5 bonus stars for writing about feelings!
            if (isNewNote) {
                state.totalStars += 5;
            }
            saveProfile(); updateStars();
            renderCheckinHistory();
            // Visual feedback
            saveNoteBtn.textContent = isNewNote ? "Saved! +5 \u2B50\u2714" : "Updated! \u2714";
            setTimeout(function() { saveNoteBtn.textContent = "Save to Journal \u{1F4DD}"; }, 2500);
            if (isNewNote) { playChime(); }
        }
    });
}

function renderCheckinHistory() {
    var hist = $("#ci-history"), empty = $("#ci-empty");
    hist.innerHTML = "";
    if (!state.checkins || state.checkins.length === 0) { empty.style.display = "block"; return; }
    empty.style.display = "none";
    state.checkins.slice(-14).reverse().forEach(function(e) {
        var div = document.createElement("div"); div.className = "ci-entry";
        var noteHtml = e.note ? '<div class="ci-entry-note">"' + escHtml(e.note) + '"</div>' : '';
        div.innerHTML = '<span class="ci-entry-emoji">' + (e.emoji||"\u{1F60A}") + '</span>' +
            '<div class="ci-entry-info"><div class="ci-entry-mood">' + capitalize(e.mood) + '</div>' +
            '<div class="ci-entry-date">' + friendlyDate(e.date) + '</div>' + noteHtml + '</div>';
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
            '<div class="reward-desc">' + (unlocked ? t.desc + (active ? " \u2714 Active" : " \u2014 Tap to use!") : "\u{1F512} Need " + t.starsNeeded + " stars") + '</div>';
        if (unlocked) card.addEventListener("click", function() {
            state.activeTheme = t.className; saveProfile(); applyTheme(); updateStars(); renderRewards();
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
            var noteHtml = e.note ? '<div class="ci-entry-note">"' + escHtml(e.note) + '"</div>' : '';
            div.innerHTML = '<span class="ci-entry-emoji">' + (e.emoji||"\u{1F60A}") + '</span>' +
                '<div class="ci-entry-info"><div class="ci-entry-mood">' + capitalize(e.mood) + '</div>' +
                '<div class="ci-entry-date">' + friendlyDate(e.date) + '</div>' + noteHtml + '</div>';
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
    var colors = getComputedStyle(document.body).getPropertyValue("--color-primary").trim();
    var themeColors = {
        "theme-unicorn": ["#d946ef","#f0abfc","#fce4ff","#a855f7","#ec4899","#f472b6"],
        "theme-princess": ["#ffd700","#d4a017","#ffe082","#ffb300","#fff176","#f9a825"],
        "theme-fairy": ["#66bb6a","#a5d6a7","#81c784","#4caf50","#c8e6c9","#aed581"],
        "theme-ocean": ["#1e88e5","#42a5f5","#90caf9","#64b5f6","#29b6f6","#0288d1"],
        "theme-cherry": ["#ec407a","#f48fb1","#f8bbd0","#e91e63","#ff80ab","#f06292"],
        "theme-katseye": ["#ab47bc","#ce93d8","#ba68c8","#9c27b0","#e1bee7","#8e24aa"],
        "theme-space": ["#e94560","#533483","#0f3460","#16213e","#e94560","#ff6b6b"],
        "theme-galaxy": ["#7b1fa2","#ce93d8","#ab47bc","#9c27b0","#e1bee7","#6a1b9a"],
        "theme-rainbow": ["#f44336","#ff9800","#ffeb3b","#4caf50","#2196f3","#9c27b0"]
    };
    var cArr = themeColors[state.activeTheme] || ["#6c63ff","#ff9800","#4caf50","#e91e63","#ffc107","#2196f3","#9c27b0"];
    for (var i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: -20 - Math.random() * 100,
            w: 6 + Math.random() * 6,
            h: 4 + Math.random() * 4,
            color: cArr[Math.floor(Math.random() * cArr.length)],
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

    // Streak bonus stars (awarded once per streak milestone)
    if (!state.streakBonuses) state.streakBonuses = {};
    var bonuses = [[3,2],[7,5],[14,10],[30,20]];
    bonuses.forEach(function(b) {
        var key = "streak_" + b[0];
        if (streak >= b[0] && !state.streakBonuses[key]) {
            state.streakBonuses[key] = true;
            state.totalStars += b[1];
            saveProfile(); updateStars();
        }
    });

    if (streak >= 2) {
        var banner = $("#streak-banner"), text = $("#streak-text");
        if (banner && text) {
            var bonusMsg = "";
            bonuses.forEach(function(b) {
                if (streak === b[0]) bonusMsg = " +" + b[1] + " bonus stars!";
            });
            text.textContent = "\u{1F525} " + streak + " day streak!" + bonusMsg + " Keep it up, " + state.playerName + "!";
            banner.classList.remove("hidden");
            setTimeout(function() { banner.classList.add("hidden"); }, 5000);
        }
    }
}

// ===== DAILY LOGIN BONUS =====
function checkDailyBonus() {
    if (!state.lastLoginDate || state.lastLoginDate !== todayStr()) {
        state.lastLoginDate = todayStr();
        state.totalStars += 1;
        saveProfile(); updateStars();
        // Show a brief welcome message
        var banner = $("#streak-banner"), text = $("#streak-text");
        if (banner && text) {
            text.textContent = "\u{1F31F} Welcome back, " + state.playerName + "! +1 daily star!";
            banner.classList.remove("hidden");
            setTimeout(function() {
                banner.classList.add("hidden");
                // Then check streak after daily bonus
                checkStreak();
            }, 3000);
        }
    } else {
        checkStreak();
    }
}

// ===== TONE OF VOICE (with levels) =====
var toneState = { items: [], index: 0, stars: 0, answered: false, level: 1 };

function startTone() {
    var maxLevel = (state.levelsDone || {}).tone || 1;
    var lvl = maxLevel;
    if (maxLevel > 1) {
        var choice = prompt("Choose level (1-" + maxLevel + "):", maxLevel);
        if (choice) lvl = Math.max(1, Math.min(maxLevel, parseInt(choice) || 1));
    }
    toneState.level = lvl;
    var data = (TONE_LEVELS && TONE_LEVELS[lvl]) ? TONE_LEVELS[lvl] : TONE_OF_VOICE;
    toneState.items = shuffleArray(data.slice());
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
        state.toneDone = true;
        if (!state.levelsDone) state.levelsDone = {};
        if (toneState.level >= (state.levelsDone.tone || 1)) {
            state.levelsDone.tone = Math.min(3, toneState.level + 1);
        }
        state.totalStars += toneState.level * 2;
        state.weeklyProgress.toneDone = true;
        saveProfile();
        playComplete(); fireConfetti();
        $("#results-emoji").textContent = "\u{1F5E3}\uFE0F";
        $("#results-title").textContent = "Tone Expert!";
        $("#results-message").textContent = "You identified " + toneState.stars + " out of " + toneState.items.length + " tones correctly! Great listening, " + state.playerName + "!";
        var si = ""; for (var i = 0; i < toneState.items.length; i++) si += i < toneState.stars ? "\u2B50" : "\u2606";
        $("#results-stars").textContent = si;
        showBadgeResult(checkBadges());
        showScreen("results-screen");
    } else { showToneRound(); }
});

$("#tone-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });
$("#tone-audio-btn").addEventListener("click", function() {
    speak($("#tone-quote").textContent + ". " + $("#tone-context").textContent);
});

// ===== PERSPECTIVE TAKING (with levels) =====
var perspState = { items: [], index: 0, stars: 0, answered: false, level: 1 };

function startPerspective() {
    var maxLevel = (state.levelsDone || {}).persp || 1;
    var lvl = maxLevel;
    if (maxLevel > 1) {
        var choice = prompt("Choose level (1-" + maxLevel + "):", maxLevel);
        if (choice) lvl = Math.max(1, Math.min(maxLevel, parseInt(choice) || 1));
    }
    perspState.level = lvl;
    var data = (PERSPECTIVE_LEVELS && PERSPECTIVE_LEVELS[lvl]) ? PERSPECTIVE_LEVELS[lvl] : PERSPECTIVE_TAKING;
    perspState.items = shuffleArray(data.slice());
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
        state.perspDone = true;
        if (!state.levelsDone) state.levelsDone = {};
        if (perspState.level >= (state.levelsDone.persp || 1)) {
            state.levelsDone.persp = Math.min(3, perspState.level + 1);
        }
        state.totalStars += perspState.level * 2;
        if (!state.weeklyProgress) state.weeklyProgress = {};
        state.weeklyProgress.perspDone = true;
        saveProfile();
        playComplete(); fireConfetti();
        $("#results-emoji").textContent = "\u{1F440}";
        $("#results-title").textContent = "Empathy Star!";
        $("#results-message").textContent = "You understood " + perspState.stars + " out of " + perspState.items.length + " perspectives! Amazing, " + state.playerName + "!";
        var si = ""; for (var i = 0; i < perspState.items.length; i++) si += i < perspState.stars ? "\u2B50" : "\u2606";
        $("#results-stars").textContent = si;
        showBadgeResult(checkBadges());
        showScreen("results-screen");
    } else { showPerspRound(); }
});

$("#persp-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });

// ===== COPING CARDS =====
var copingState = { cards: [], index: 0, cardsViewed: 0 };

function startCoping() {
    copingState.cards = shuffleArray(COPING_CARDS.slice());
    copingState.index = 0;
    copingState.cardsViewed = 0;
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
    copingState.cardsViewed++;
    if (copingState.index < copingState.cards.length - 1) { copingState.index++; showCopingCard(); }
    else { copingState.index = 0; showCopingCard(); }
    // +1 star for viewing 5 coping cards
    if (copingState.cardsViewed === 5) {
        state.copingDone = true;
        state.totalStars++; saveProfile(); updateStars(); playChime();
        checkBadges();
    }
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
                if (!state.timerUsed) {
                    state.timerUsed = true;
                    state.totalStars++; saveProfile(); updateStars();
                    checkBadges();
                }
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
// Settings: family code display
var sfc2 = document.getElementById("settings-family-code");
if (sfc2 && familyCode) sfc2.textContent = familyCode;

// ===== WEEKLY CHALLENGE =====
function getWeekId() {
    var d = new Date();
    var jan1 = new Date(d.getFullYear(), 0, 1);
    var week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
    return d.getFullYear() + "-W" + week;
}

function showWeeklyChallenge() {
    var el = $("#weekly-challenge");
    if (!el) return;
    var currentWeek = getWeekId();

    // Reset weekly progress if new week
    if (state.weeklyId !== currentWeek) {
        state.weeklyId = currentWeek;
        state.weeklyProgress = {};
        saveProfile();
    }

    // Pick challenge based on week number
    var seed = 0;
    for (var i = 0; i < currentWeek.length; i++) seed += currentWeek.charCodeAt(i);
    var challenge = WEEKLY_CHALLENGES[seed % WEEKLY_CHALLENGES.length];

    $("#weekly-title").textContent = challenge.emoji + " Weekly Challenge: " + challenge.title;
    $("#weekly-desc").textContent = challenge.desc;

    var done = challenge.check(state);
    var statusEl = $("#weekly-status");
    if (done) {
        statusEl.textContent = "\u2705 Complete! +10 bonus stars!";
        statusEl.className = "weekly-status complete";
        if (!state.weeklyProgress._rewarded) {
            state.weeklyProgress._rewarded = true;
            state.weeklyComplete = true;
            state.totalStars += 10;
            saveProfile(); updateStars(); checkBadges();
        }
    } else {
        statusEl.textContent = "\u{1F4AA} In progress \u2014 keep going!";
        statusEl.className = "weekly-status in-progress";
    }
    el.classList.remove("hidden");
}

// ===== STAR OF THE DAY =====
function showStarOfTheDay() {
    var banner = $("#sotd-banner");
    if (!banner) return;
    // Use date as seed for consistent daily question
    var today = todayStr();
    var seed = 0;
    for (var i = 0; i < today.length; i++) seed += today.charCodeAt(i);
    var qIndex = seed % STAR_OF_THE_DAY.length;
    var q = STAR_OF_THE_DAY[qIndex];

    // Check if already answered today
    if (state._sotdDate === today) { banner.classList.add("hidden"); return; }

    var emoji = $("#sotd-question");
    emoji.textContent = q.emoji + " " + q.question;
    var area = $("#sotd-choices"); area.innerHTML = "";
    var result = $("#sotd-result"); result.classList.add("hidden");

    q.choices.forEach(function(ch, idx) {
        var btn = document.createElement("button");
        btn.className = "sotd-choice-btn"; btn.textContent = ch;
        btn.addEventListener("click", function() {
            $$(".sotd-choice-btn").forEach(function(b, bi) {
                b.disabled = true;
                if (bi === q.answer) b.classList.add("correct");
            });
            if (idx === q.answer) {
                btn.classList.add("correct");
                result.textContent = "\u{1F31F} Correct! +2 stars!";
                result.style.color = "#4caf50";
                state.totalStars += 2; playChime();
            } else {
                btn.classList.add("wrong");
                result.textContent = "\u{1F4A1} The answer was: " + q.choices[q.answer];
                result.style.color = "#ff9800";
                playGentle();
            }
            state._sotdDate = today;
            saveProfile(); updateStars();
            result.classList.remove("hidden");
            setTimeout(function() { banner.classList.add("hidden"); }, 4000);
        });
        area.appendChild(btn);
    });
    banner.classList.remove("hidden");
}

// ===== FEELINGS VOCABULARY =====
var vocabState = { index: 0 };

function startVocab() {
    vocabState.index = 0;
    showVocabCard(); showScreen("vocab-screen");
}

function showVocabCard() {
    var v = FEELINGS_VOCAB[vocabState.index];
    $("#vocab-emoji").textContent = v.emoji;
    $("#vocab-word").textContent = v.word;
    $("#vocab-meaning").textContent = v.meaning;
    $("#vocab-example").textContent = "\u{1F4AC} \"" + v.example + "\"";
    $("#vocab-counter").textContent = (vocabState.index + 1) + " of " + FEELINGS_VOCAB.length;
}

$("#vocab-prev").addEventListener("click", function() {
    if (vocabState.index > 0) { vocabState.index--; showVocabCard(); }
});
$("#vocab-next").addEventListener("click", function() {
    if (vocabState.index < FEELINGS_VOCAB.length - 1) { vocabState.index++; showVocabCard(); }
    else {
        // +2 stars for reading all vocab
        state.vocabDone = true;
        state.totalStars += 2; saveProfile(); updateStars(); playChime();
        checkBadges();
        showScreen("menu-screen");
    }
});
$("#vocab-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });

// ===== SOCIAL RULES =====
function renderRules() {
    var list = $("#rules-list"); list.innerHTML = "";
    // Award star and badge for reading rules
    if (!state.rulesRead) {
        state.rulesRead = true;
        state.totalStars += 2; saveProfile(); updateStars();
        checkBadges();
    }
    SOCIAL_RULES.forEach(function(rule) {
        var card = document.createElement("div");
        card.className = "story-card";
        card.style.cursor = "default";
        card.innerHTML = '<span class="story-icon">' + rule.emoji + '</span>' +
            '<div class="story-info"><div class="story-title">' + rule.rule + '</div>' +
            '<div class="story-desc">' + rule.detail + '</div></div>';
        list.appendChild(card);
    });
}

$("#rules-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });

// ===== CHORE LIST =====
function getChores() {
    if (!state.chores || state.chores.length === 0) {
        state.chores = DEFAULT_CHORES.map(function(c, i) {
            return { id: "chore_" + i, name: c.name, stars: c.stars, emoji: c.emoji };
        });
        saveProfile();
    }
    return state.chores;
}

function getCompletedToday() {
    if (!state.choresCompleted) state.choresCompleted = {};
    var today = todayStr();
    if (!state.choresCompleted[today]) state.choresCompleted[today] = [];
    return state.choresCompleted[today];
}

function renderChores() {
    var chores = getChores();
    var completed = getCompletedToday();
    var list = $("#chores-list");
    list.innerHTML = "";
    var allDone = true;

    chores.forEach(function(chore) {
        var isDone = completed.indexOf(chore.id) !== -1;
        if (!isDone) allDone = false;
        var item = document.createElement("div");
        item.className = "chore-item" + (isDone ? " completed" : "");
        item.innerHTML =
            '<span class="chore-check">' + (isDone ? "\u2705" : "\u2B1C") + '</span>' +
            '<div class="chore-info"><div class="chore-name">' + (chore.emoji || "") + " " + escHtml(chore.name) + '</div></div>' +
            '<span class="chore-stars-value">' + (isDone ? "Done!" : "+" + chore.stars + " \u2B50") + '</span>';

        if (!isDone) {
            item.addEventListener("click", function() {
                completed.push(chore.id);
                state.totalStars += chore.stars;
                saveProfile(); updateStars();
                playChime();
                renderChores();
                checkBadges();
            });
        }
        list.appendChild(item);
    });

    var doneMsg = $("#chores-done-msg");
    if (allDone && chores.length > 0) { doneMsg.classList.remove("hidden"); }
    else { doneMsg.classList.add("hidden"); }
}

// Chore edit toggle
var choreEditVisible = false;
$("#chores-edit-toggle").addEventListener("click", function() {
    choreEditVisible = !choreEditVisible;
    var section = $("#chores-edit-section");
    if (choreEditVisible) {
        section.classList.remove("hidden");
        renderChoreManage();
        this.textContent = "\u2B06\uFE0F Hide Edit";
    } else {
        section.classList.add("hidden");
        this.textContent = "\u{1F527} Edit Chores (Parent)";
    }
});

// Add chore
$("#chore-add-btn").addEventListener("click", function() {
    var input = $("#chore-add-input");
    var name = input.value.trim();
    if (!name) return;
    var stars = parseInt($("#chore-stars-select").value) || 3;
    var chores = getChores();
    chores.push({ id: "chore_" + Date.now(), name: name, stars: stars, emoji: "\u2B50" });
    state.chores = chores;
    saveProfile();
    input.value = "";
    renderChoreManage();
    renderChores();
});

function renderChoreManage() {
    var list = $("#chores-manage-list");
    list.innerHTML = "";
    var chores = getChores();
    chores.forEach(function(chore, idx) {
        var item = document.createElement("div");
        item.className = "chore-manage-item";
        item.innerHTML = '<span>' + escHtml(chore.name) + ' (' + chore.stars + '\u2B50)</span>' +
            '<button class="chore-remove-btn">\u274C</button>';
        item.querySelector(".chore-remove-btn").addEventListener("click", function() {
            chores.splice(idx, 1);
            state.chores = chores;
            saveProfile();
            renderChoreManage();
            renderChores();
        });
        list.appendChild(item);
    });
}

$("#chores-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });

// ===== SETTINGS =====
var fontSizes = ["font-xs","font-sm","font-md","font-lg","font-xl"];

function initSettings() {
    var slider = $("#font-size-slider");
    slider.value = state._fontSize || 2;
    var contrastBtn = $("#contrast-toggle");
    contrastBtn.textContent = state._highContrast ? "On" : "Off";
    var simpBtn = $("#simplified-toggle");
    simpBtn.textContent = state._simplified ? "On" : "Off";
}

$("#font-size-slider").addEventListener("input", function() {
    var val = parseInt(this.value);
    state._fontSize = val;
    fontSizes.forEach(function(c) { document.body.classList.remove(c); });
    document.body.classList.add(fontSizes[val]);
    saveProfile();
});

$("#contrast-toggle").addEventListener("click", function() {
    state._highContrast = !state._highContrast;
    this.textContent = state._highContrast ? "On" : "Off";
    if (state._highContrast) document.body.classList.add("high-contrast");
    else document.body.classList.remove("high-contrast");
    saveProfile();
});

$("#simplified-toggle").addEventListener("click", function() {
    state._simplified = !state._simplified;
    this.textContent = state._simplified ? "On" : "Off";
    saveProfile();
});

$("#save-pin-btn").addEventListener("click", function() {
    var inp = $("#new-pin-input");
    var val = inp.value.trim();
    if (val.length === 4 && /^\d{4}$/.test(val)) {
        parentPin = val;
        try { localStorage.setItem("socialStarsPin", val); } catch(e) {}
        inp.value = "";
        this.textContent = "Saved! \u2714";
        setTimeout(function() { $("#save-pin-btn").textContent = "Save PIN"; }, 2000);
    }
});

$("#settings-back-btn").addEventListener("click", function() { showScreen("menu-screen"); });

// Apply saved settings on load
function applySavedSettings() {
    if (state._fontSize !== undefined) {
        fontSizes.forEach(function(c) { document.body.classList.remove(c); });
        document.body.classList.add(fontSizes[state._fontSize]);
    }
    if (state._highContrast) document.body.classList.add("high-contrast");
}

// ===== SIMPLIFIED MODE SUPPORT =====
// Patch choice rendering to show only 2 choices when simplified mode is on
var _origShowScenario = showScenario;
showScenario = function() {
    _origShowScenario();
    if (state._simplified) {
        var btns = $$("#choices-area .choice-btn");
        if (btns.length > 2) {
            // Keep the correct answer and one wrong answer
            var sc = game.currentScenarios[game.currentIndex];
            var correctText = sc.choices.find(function(c) { return c.correct; }).text;
            var wrongBtns = [];
            btns.forEach(function(btn) {
                if (btn.textContent !== correctText) wrongBtns.push(btn);
            });
            // Remove all but one wrong answer
            for (var i = 1; i < wrongBtns.length; i++) {
                wrongBtns[i].remove();
            }
        }
    }
};

// Add confetti and sound to existing correct answers
var origHandleChoice = handleChoice;
var _origHandleChoice = handleChoice;

var origFinishRound = finishRound;

// Add confetti to results screen, star of the day to menu
var origShowScreen2 = showScreen;
showScreen = function(id) {
    origShowScreen2(id);
    if (id === "results-screen") { fireConfetti(); playComplete(); }
    if (id === "menu-screen") { checkDailyBonus(); checkBadges(); showWeeklyChallenge(); showStarOfTheDay(); applySavedSettings(); }
};

// ===== Init =====
initFirebase();
initWelcome();
initMenu();
initFamilyScreen();

// Check if we have a family code already
var savedCode = getFamilyCode();
if (savedCode) {
    familyCode = savedCode;
    startWithSync();
} else {
    // Show family code screen first
    showScreen("family-screen");
}

function startWithSync() {
    if (syncEnabled && familyCode) {
        // Show sync indicator
        var si = document.getElementById("sync-indicator");
        if (si) si.classList.remove("hidden");
        // Update settings display
        var sfc = document.getElementById("settings-family-code");
        if (sfc) sfc.textContent = familyCode;

        // Load from cloud, merge with local, then show profiles
        cloudLoadProfiles().then(function(cloudProfiles) {
            if (cloudProfiles) {
                var local = getAllProfiles();
                var merged = mergeProfiles(local, cloudProfiles);
                try { localStorage.setItem("socialStarsProfiles", JSON.stringify(merged)); } catch(e) {}
                // Save merged back to cloud
                cloudSaveProfiles(merged);
            }
            renderProfilePicker();

            // Listen for real-time changes from other devices
            cloudListen(function(cloudProfiles) {
                var local = getAllProfiles();
                var merged = mergeProfiles(local, cloudProfiles);
                try { localStorage.setItem("socialStarsProfiles", JSON.stringify(merged)); } catch(e) {}
            });
        });
    } else {
        renderProfilePicker();
    }
}

function initFamilyScreen() {
    var joinBtn = document.getElementById("family-join-btn");
    var createBtn = document.getElementById("family-create-btn");
    var skipBtn = document.getElementById("family-skip-btn");
    var input = document.getElementById("family-code-input");
    var status = document.getElementById("family-status");

    if (joinBtn) joinBtn.addEventListener("click", function() {
        var code = (input.value || "").trim().toUpperCase();
        if (code.length < 4) {
            status.textContent = "Please enter at least 4 characters";
            status.className = "family-status error";
            status.classList.remove("hidden");
            return;
        }
        joinBtn.disabled = true;
        joinBtn.textContent = "Checking...";

        if (syncEnabled) {
            cloudCheckCode(code).then(function(exists) {
                if (exists) {
                    setFamilyCode(code);
                    familyCode = code;
                    status.textContent = "\u2714 Joined family! Syncing profiles...";
                    status.className = "family-status success";
                    status.classList.remove("hidden");
                    setTimeout(function() { startWithSync(); }, 1000);
                } else {
                    // Code doesn't exist yet — create it
                    setFamilyCode(code);
                    familyCode = code;
                    // Upload current local profiles
                    var local = getAllProfiles();
                    cloudSaveProfiles(local);
                    status.textContent = "\u2714 Created family code: " + code + "! Use this on other devices.";
                    status.className = "family-status success";
                    status.classList.remove("hidden");
                    setTimeout(function() { startWithSync(); }, 1500);
                }
                joinBtn.disabled = false;
                joinBtn.textContent = "Join Family";
            });
        } else {
            status.textContent = "Cloud sync not available. Playing offline.";
            status.className = "family-status error";
            status.classList.remove("hidden");
            joinBtn.disabled = false;
            joinBtn.textContent = "Join Family";
        }
    });

    if (createBtn) createBtn.addEventListener("click", function() {
        var code = generateFamilyCode();
        setFamilyCode(code);
        familyCode = code;
        var local = getAllProfiles();
        cloudSaveProfiles(local);
        status.textContent = "\u2714 Your family code is: " + code + "\nUse this code on other devices to sync!";
        status.className = "family-status success";
        status.classList.remove("hidden");
        input.value = code;
        setTimeout(function() { startWithSync(); }, 2500);
    });

    if (skipBtn) skipBtn.addEventListener("click", function() {
        renderProfilePicker();
    });

    // Settings: change family code
    var changeFamBtn = document.getElementById("settings-change-family");
    if (changeFamBtn) changeFamBtn.addEventListener("click", function() {
        showScreen("family-screen");
    });
}

})();
