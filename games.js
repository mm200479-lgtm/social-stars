/**
 * Social Stars — Mini Games
 * Memory Match, Tic-Tac-Toe, Hangman, Word Search, Drawing Pad,
 * Colouring Book, Feelings Bingo, Pattern Match, Spot the Difference, Dots & Boxes
 */

// Local shuffleArray in case game.js hasn't loaded yet
function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
}

// ===== MEMORY MATCH =====
var memoryPairs = [
    {emoji:"\u{1F604}",name:"Happy"},{emoji:"\u{1F622}",name:"Sad"},{emoji:"\u{1F621}",name:"Angry"},
    {emoji:"\u{1F628}",name:"Scared"},{emoji:"\u{1F632}",name:"Surprised"},{emoji:"\u{1F634}",name:"Tired"},
    {emoji:"\u{1F60A}",name:"Proud"},{emoji:"\u{1F914}",name:"Confused"}
];
var memCards=[], memFlipped=[], memMatched=0, memMoves=0, memLocked=false;

function startMemory() {
    var pairs = memoryPairs.slice(0,6);
    var deck = []; pairs.forEach(function(p) { deck.push({type:"emoji",val:p.emoji,id:p.name}); deck.push({type:"word",val:p.name,id:p.name}); });
    memCards = shuffleArray(deck); memFlipped=[]; memMatched=0; memMoves=0; memLocked=false;
    var grid = document.getElementById("memory-grid"); if(!grid) return; grid.innerHTML="";
    memCards.forEach(function(c,i) {
        var card = document.createElement("button");
        card.className = "mem-card"; card.dataset.idx = i;
        card.innerHTML = '<span class="mem-back">?</span><span class="mem-front">' + c.val + '</span>';
        card.addEventListener("click", function() { flipMemCard(i, card); });
        grid.appendChild(card);
    });
    var info = document.getElementById("memory-info"); if(info) info.textContent = "Find the matching pairs!";
}

function flipMemCard(idx, el) {
    if (memLocked || el.classList.contains("flipped") || el.classList.contains("matched")) return;
    el.classList.add("flipped"); memFlipped.push({idx:idx, el:el});
    if (memFlipped.length === 2) {
        memMoves++; memLocked = true;
        var a = memFlipped[0], b = memFlipped[1];
        if (memCards[a.idx].id === memCards[b.idx].id && a.idx !== b.idx) {
            a.el.classList.add("matched"); b.el.classList.add("matched");
            memMatched++; memFlipped=[]; memLocked=false;
            if (typeof playChime === "function") playChime();
            if (memMatched >= memCards.length/2) {
                var info = document.getElementById("memory-info");
                if(info) info.textContent = "\u{1F389} You matched them all in " + memMoves + " moves! +5\u2B50";
                if (typeof state !== "undefined") { state.totalStars += 5; state.memoryDone = true; state.replayCount = (state.replayCount||0)+1; if(typeof saveProfile==="function") saveProfile(); if(typeof updateStars==="function") updateStars(); if(typeof checkBadges==="function") checkBadges(); }
                if (typeof fireConfetti === "function") fireConfetti();
            }
        } else {
            setTimeout(function() { a.el.classList.remove("flipped"); b.el.classList.remove("flipped"); memFlipped=[]; memLocked=false; }, 800);
        }
    }
}

// ===== TIC-TAC-TOE =====
var tttBoard, tttTurn, tttDone;

function startTTT() {
    tttBoard = ["","","","","","","","",""]; tttTurn = "X"; tttDone = false;
    var grid = document.getElementById("ttt-grid"); if(!grid) return; grid.innerHTML = "";
    for (var i = 0; i < 9; i++) {
        var cell = document.createElement("button");
        cell.className = "ttt-cell"; cell.dataset.idx = i;
        cell.addEventListener("click", function() { tttMove(parseInt(this.dataset.idx), this); });
        grid.appendChild(cell);
    }
    var info = document.getElementById("ttt-info"); if(info) info.textContent = "X goes first! Take turns with a friend.";
}

function tttMove(idx, el) {
    if (tttDone || tttBoard[idx]) return;
    tttBoard[idx] = tttTurn; el.textContent = tttTurn; el.classList.add("ttt-" + tttTurn.toLowerCase());
    var winner = tttCheck();
    var info = document.getElementById("ttt-info");
    if (winner) {
        tttDone = true;
        if(info) info.textContent = winner + " wins! \u{1F389} Great game! +3\u2B50";
        if(typeof state!=="undefined") { state.totalStars += 3; state.tttPlayed = true; if(typeof saveProfile==="function") saveProfile(); if(typeof updateStars==="function") updateStars(); if(typeof checkBadges==="function") checkBadges(); }
        if(typeof playComplete==="function") playComplete();
    } else if (tttBoard.indexOf("") === -1) {
        tttDone = true;
        if(info) info.textContent = "It's a draw! Good game! +2\u2B50";
        if(typeof state!=="undefined") { state.totalStars += 2; if(typeof saveProfile==="function") saveProfile(); if(typeof updateStars==="function") updateStars(); }
    } else {
        tttTurn = tttTurn === "X" ? "O" : "X";
        if(info) info.textContent = tttTurn + "'s turn!";
    }
}

function tttCheck() {
    var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (var i = 0; i < wins.length; i++) {
        var a=wins[i][0],b=wins[i][1],c=wins[i][2];
        if (tttBoard[a] && tttBoard[a]===tttBoard[b] && tttBoard[b]===tttBoard[c]) return tttBoard[a];
    }
    return null;
}

// ===== HANGMAN =====
var hangWords = ["HAPPY","SAD","ANGRY","SCARED","PROUD","CONFUSED","GRATEFUL","EMBARRASSED","FRUSTRATED","JEALOUS","ANXIOUS","DISAPPOINTED","CONFIDENT","LONELY","OVERWHELMED","CURIOUS"];
var hangWord, hangGuessed, hangWrong, hangMax=6;

function startHangman() {
    hangWord = hangWords[Math.floor(Math.random()*hangWords.length)];
    hangGuessed = []; hangWrong = 0;
    renderHangman();
}

function renderHangman() {
    var display = document.getElementById("hang-word"); if(!display) return;
    var shown = ""; for(var i=0;i<hangWord.length;i++) { shown += hangGuessed.indexOf(hangWord[i])!==-1 ? hangWord[i]+" " : "_ "; }
    display.textContent = shown.trim();
    var info = document.getElementById("hang-info");
    if(info) info.textContent = "Wrong guesses: " + hangWrong + "/" + hangMax;
    // Draw hangman
    var canvas = document.getElementById("hang-canvas");
    if(canvas) {
        var ctx = canvas.getContext("2d"); ctx.clearRect(0,0,200,200);
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--color-primary").trim() || "#6c63ff";
        ctx.lineWidth = 3;
        // Base
        ctx.beginPath(); ctx.moveTo(20,180); ctx.lineTo(180,180); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(60,180); ctx.lineTo(60,20); ctx.lineTo(130,20); ctx.lineTo(130,40); ctx.stroke();
        if(hangWrong>=1){ctx.beginPath();ctx.arc(130,55,15,0,Math.PI*2);ctx.stroke();} // head
        if(hangWrong>=2){ctx.beginPath();ctx.moveTo(130,70);ctx.lineTo(130,120);ctx.stroke();} // body
        if(hangWrong>=3){ctx.beginPath();ctx.moveTo(130,85);ctx.lineTo(105,105);ctx.stroke();} // left arm
        if(hangWrong>=4){ctx.beginPath();ctx.moveTo(130,85);ctx.lineTo(155,105);ctx.stroke();} // right arm
        if(hangWrong>=5){ctx.beginPath();ctx.moveTo(130,120);ctx.lineTo(110,155);ctx.stroke();} // left leg
        if(hangWrong>=6){ctx.beginPath();ctx.moveTo(130,120);ctx.lineTo(150,155);ctx.stroke();} // right leg
    }
    // Keyboard
    var kb = document.getElementById("hang-keyboard"); if(!kb) return; kb.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function(letter) {
        var btn = document.createElement("button");
        btn.className = "hang-key" + (hangGuessed.indexOf(letter)!==-1 ? " used" : "");
        btn.textContent = letter; btn.disabled = hangGuessed.indexOf(letter)!==-1;
        btn.addEventListener("click", function() { guessHangLetter(letter); });
        kb.appendChild(btn);
    });
    // Check win/lose
    var won = hangWord.split("").every(function(l){return hangGuessed.indexOf(l)!==-1;});
    var lost = hangWrong >= hangMax;
    if(won) {
        if(info) info.textContent = "\u{1F389} You got it! The word was " + hangWord + "! +3\u2B50";
        kb.querySelectorAll(".hang-key").forEach(function(b){b.disabled=true;});
        if(typeof state!=="undefined"){state.totalStars+=3;state.hangmanWon=true;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();if(typeof checkBadges==="function")checkBadges();}
        if(typeof playComplete==="function")playComplete();
    } else if(lost) {
        if(info) info.textContent = "The word was " + hangWord + ". Try again! +1\u2B50";
        display.textContent = hangWord.split("").join(" ");
        kb.querySelectorAll(".hang-key").forEach(function(b){b.disabled=true;});
        if(typeof state!=="undefined"){state.totalStars+=1;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();}
    }
}

function guessHangLetter(letter) {
    if(hangGuessed.indexOf(letter)!==-1) return;
    hangGuessed.push(letter);
    if(hangWord.indexOf(letter)===-1) hangWrong++;
    else if(typeof playChime==="function") playChime();
    renderHangman();
}

// ===== DRAWING PAD =====
var drawCanvas, drawCtx, drawing=false, drawColor="#6c63ff", drawSize=4;

function startDrawing() {
    drawCanvas = document.getElementById("draw-canvas"); if(!drawCanvas) return;
    drawCanvas.width = Math.min(600, window.innerWidth - 40);
    drawCanvas.height = 400;
    drawCtx = drawCanvas.getContext("2d");
    drawCtx.fillStyle = "#ffffff"; drawCtx.fillRect(0,0,drawCanvas.width,drawCanvas.height);
    drawCtx.lineCap = "round"; drawCtx.lineJoin = "round";

    // Colour picker
    var colorDiv = document.getElementById("draw-colors");
    if (colorDiv) {
        colorDiv.innerHTML = "";
        var colors = ["#000000","#f44336","#e91e63","#9c27b0","#2196f3","#4caf50","#ffeb3b","#ff9800","#795548","#ffffff"];
        colors.forEach(function(c) {
            var btn = document.createElement("button");
            btn.className = "color-swatch" + (c === drawColor ? " active" : "");
            btn.style.background = c;
            btn.addEventListener("click", function() {
                drawColor = c;
                colorDiv.querySelectorAll(".color-swatch").forEach(function(b) { b.classList.remove("active"); });
                btn.classList.add("active");
            });
            colorDiv.appendChild(btn);
        });
        // Size buttons
        [2, 4, 8, 16].forEach(function(s) {
            var btn = document.createElement("button");
            btn.className = "color-swatch" + (s === drawSize ? " active" : "");
            btn.style.background = "var(--color-card)";
            btn.style.border = "2px solid var(--color-border)";
            btn.style.fontSize = "0.7rem";
            btn.style.fontWeight = "700";
            btn.textContent = s === 2 ? "S" : (s === 4 ? "M" : (s === 8 ? "L" : "XL"));
            btn.addEventListener("click", function() { drawSize = s; });
            colorDiv.appendChild(btn);
        });
    }

    function getPos(e) {
        var rect = drawCanvas.getBoundingClientRect();
        var t = e.touches ? e.touches[0] : e;
        return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    drawCanvas.onmousedown = function(e) { drawing=true; var p=getPos(e); drawCtx.beginPath(); drawCtx.moveTo(p.x,p.y); };
    drawCanvas.onmousemove = function(e) { if(!drawing) return; var p=getPos(e); drawCtx.strokeStyle=drawColor; drawCtx.lineWidth=drawSize; drawCtx.lineTo(p.x,p.y); drawCtx.stroke(); };
    drawCanvas.onmouseup = function() { drawing=false; if(typeof state!=="undefined"){state.drawingDone=true;if(typeof saveProfile==="function")saveProfile();} };
    drawCanvas.ontouchstart = function(e) { e.preventDefault(); drawing=true; var p=getPos(e); drawCtx.beginPath(); drawCtx.moveTo(p.x,p.y); };
    drawCanvas.ontouchmove = function(e) { e.preventDefault(); if(!drawing) return; var p=getPos(e); drawCtx.strokeStyle=drawColor; drawCtx.lineWidth=drawSize; drawCtx.lineTo(p.x,p.y); drawCtx.stroke(); };
    drawCanvas.ontouchend = function() { drawing=false; };
}

// ===== COLOURING BOOK =====
var coloringColors = ["#f44336","#e91e63","#9c27b0","#673ab7","#2196f3","#03a9f4","#4caf50","#8bc34a","#ffeb3b","#ff9800","#795548","#ffffff","#000000","#607d8b","#ff80ab"];
var coloringCurrent = "#f44336";
var coloringSections = [];
var coloringPageIdx = 0;

var COLORING_PAGES = [
    { name: "Butterfly", emoji: "\u{1F98B}", sections: [
        {x:250,y:100,r:30,color:"#fff"}, // head
        {x:250,y:170,r:40,color:"#fff"}, // body top
        {x:250,y:240,r:35,color:"#fff"}, // body mid
        {x:250,y:300,r:25,color:"#fff"}, // body bottom
        {x:170,y:120,r:55,color:"#fff"}, // left wing top
        {x:330,y:120,r:55,color:"#fff"}, // right wing top
        {x:160,y:210,r:50,color:"#fff"}, // left wing bottom
        {x:340,y:210,r:50,color:"#fff"}, // right wing bottom
        {x:170,y:120,r:25,color:"#fff"}, // left wing inner top
        {x:330,y:120,r:25,color:"#fff"}, // right wing inner top
        {x:160,y:210,r:22,color:"#fff"}, // left wing inner bottom
        {x:340,y:210,r:22,color:"#fff"}  // right wing inner bottom
    ]},
    { name: "Flower", emoji: "\u{1F33B}", sections: [
        {x:250,y:200,r:40,color:"#fff"}, // center
        {x:250,y:130,r:35,color:"#fff"}, // top petal
        {x:250,y:270,r:35,color:"#fff"}, // bottom petal
        {x:180,y:200,r:35,color:"#fff"}, // left petal
        {x:320,y:200,r:35,color:"#fff"}, // right petal
        {x:200,y:145,r:32,color:"#fff"}, // top-left petal
        {x:300,y:145,r:32,color:"#fff"}, // top-right petal
        {x:200,y:255,r:32,color:"#fff"}, // bottom-left petal
        {x:300,y:255,r:32,color:"#fff"}, // bottom-right petal
        {x:250,y:350,r:20,color:"#fff"}, // stem top
        {x:250,y:400,r:20,color:"#fff"}, // stem bottom
        {x:200,y:380,r:28,color:"#fff"}, // leaf left
        {x:300,y:360,r:28,color:"#fff"}  // leaf right
    ]},
    { name: "Star", emoji: "\u2B50", sections: [
        {x:250,y:80,r:40,color:"#fff"},  // top point
        {x:150,y:180,r:40,color:"#fff"}, // left point
        {x:350,y:180,r:40,color:"#fff"}, // right point
        {x:180,y:320,r:40,color:"#fff"}, // bottom-left point
        {x:320,y:320,r:40,color:"#fff"}, // bottom-right point
        {x:250,y:200,r:60,color:"#fff"}, // center
        {x:200,y:140,r:30,color:"#fff"}, // inner top-left
        {x:300,y:140,r:30,color:"#fff"}, // inner top-right
        {x:210,y:260,r:30,color:"#fff"}, // inner bottom-left
        {x:290,y:260,r:30,color:"#fff"}  // inner bottom-right
    ]},
    { name: "Heart", emoji: "\u2764\uFE0F", sections: [
        {x:200,y:140,r:55,color:"#fff"}, // left bump
        {x:300,y:140,r:55,color:"#fff"}, // right bump
        {x:250,y:200,r:50,color:"#fff"}, // center
        {x:210,y:250,r:40,color:"#fff"}, // lower left
        {x:290,y:250,r:40,color:"#fff"}, // lower right
        {x:250,y:300,r:35,color:"#fff"}, // bottom
        {x:250,y:350,r:20,color:"#fff"}, // tip
        {x:170,y:180,r:25,color:"#fff"}, // inner left
        {x:330,y:180,r:25,color:"#fff"}  // inner right
    ]},
    { name: "Rainbow", emoji: "\u{1F308}", sections: [
        {x:100,y:350,r:40,color:"#fff"}, // left cloud
        {x:400,y:350,r:40,color:"#fff"}, // right cloud
        {x:150,y:280,r:35,color:"#fff"}, // arc 1 left
        {x:250,y:200,r:40,color:"#fff"}, // arc 1 top
        {x:350,y:280,r:35,color:"#fff"}, // arc 1 right
        {x:180,y:250,r:30,color:"#fff"}, // arc 2 left
        {x:250,y:240,r:30,color:"#fff"}, // arc 2 top
        {x:320,y:250,r:30,color:"#fff"}, // arc 2 right
        {x:200,y:300,r:28,color:"#fff"}, // arc 3 left
        {x:250,y:280,r:28,color:"#fff"}, // arc 3 mid
        {x:300,y:300,r:28,color:"#fff"}, // arc 3 right
        {x:60,y:370,r:30,color:"#fff"},  // cloud left extra
        {x:440,y:370,r:30,color:"#fff"}  // cloud right extra
    ]},
    { name: "Cat", emoji: "\u{1F431}", sections: [
        {x:250,y:200,r:70,color:"#fff"}, // face
        {x:190,y:120,r:30,color:"#fff"}, // left ear
        {x:310,y:120,r:30,color:"#fff"}, // right ear
        {x:220,y:180,r:15,color:"#fff"}, // left eye
        {x:280,y:180,r:15,color:"#fff"}, // right eye
        {x:250,y:210,r:12,color:"#fff"}, // nose
        {x:250,y:320,r:55,color:"#fff"}, // body
        {x:180,y:380,r:25,color:"#fff"}, // left paw
        {x:320,y:380,r:25,color:"#fff"}, // right paw
        {x:350,y:300,r:20,color:"#fff"}, // tail base
        {x:390,y:260,r:18,color:"#fff"}, // tail mid
        {x:410,y:220,r:15,color:"#fff"}  // tail tip
    ]},
    { name: "Unicorn", emoji: "\u{1F984}", sections: [
        {x:250,y:220,r:65,color:"#fff"}, // head
        {x:250,y:120,r:20,color:"#fff"}, // horn base
        {x:250,y:80,r:15,color:"#fff"},  // horn tip
        {x:200,y:200,r:15,color:"#fff"}, // left eye
        {x:280,y:200,r:15,color:"#fff"}, // right eye
        {x:250,y:240,r:12,color:"#fff"}, // nose
        {x:180,y:160,r:25,color:"#fff"}, // left ear
        {x:320,y:160,r:25,color:"#fff"}, // right ear
        {x:300,y:140,r:20,color:"#fff"}, // mane 1
        {x:330,y:180,r:22,color:"#fff"}, // mane 2
        {x:340,y:220,r:20,color:"#fff"}, // mane 3
        {x:250,y:360,r:60,color:"#fff"}, // body
        {x:190,y:430,r:22,color:"#fff"}, // front left leg
        {x:230,y:430,r:22,color:"#fff"}, // front right leg
        {x:280,y:430,r:22,color:"#fff"}, // back left leg
        {x:320,y:430,r:22,color:"#fff"}  // back right leg
    ]},
    { name: "House", emoji: "\u{1F3E0}", sections: [
        {x:250,y:150,r:30,color:"#fff"}, // roof top
        {x:180,y:190,r:35,color:"#fff"}, // roof left
        {x:320,y:190,r:35,color:"#fff"}, // roof right
        {x:200,y:280,r:45,color:"#fff"}, // wall left
        {x:300,y:280,r:45,color:"#fff"}, // wall right
        {x:250,y:350,r:40,color:"#fff"}, // wall bottom
        {x:250,y:300,r:25,color:"#fff"}, // door
        {x:190,y:250,r:18,color:"#fff"}, // window left
        {x:310,y:250,r:18,color:"#fff"}, // window right
        {x:350,y:160,r:20,color:"#fff"}, // chimney
        {x:100,y:400,r:35,color:"#fff"}, // tree left
        {x:400,y:400,r:35,color:"#fff"}  // tree right
    ]}
];

function startColoring(pageIdx) {
    if (pageIdx === undefined) pageIdx = coloringPageIdx;
    coloringPageIdx = pageIdx;
    var page = COLORING_PAGES[pageIdx];
    if (!page) return;

    var canvas = document.getElementById("color-canvas"); if(!canvas) return;
    canvas.width = Math.min(500, window.innerWidth - 40); canvas.height = 500;

    // Scale sections to canvas size
    var scale = canvas.width / 500;
    coloringSections = page.sections.map(function(s) {
        return { x: s.x * scale, y: s.y * scale, r: s.r * scale, color: "#ffffff" };
    });

    var ctx = canvas.getContext("2d");
    drawColoringBook(ctx, canvas);

    canvas.onclick = function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = (e.clientX - rect.left) * (canvas.width / rect.width);
        var y = (e.clientY - rect.top) * (canvas.height / rect.height);
        for (var i = coloringSections.length-1; i >= 0; i--) {
            var s = coloringSections[i];
            var dx = x-s.x, dy = y-s.y;
            if (dx*dx + dy*dy <= s.r*s.r) {
                s.color = coloringCurrent;
                drawColoringBook(ctx, canvas);
                if(typeof playChime==="function") playChime();
                break;
            }
        }
    };

    // Color palette
    var palette = document.getElementById("color-palette"); if(!palette) return; palette.innerHTML = "";
    coloringColors.forEach(function(c) {
        var btn = document.createElement("button");
        btn.className = "color-swatch" + (c===coloringCurrent?" active":"");
        btn.style.background = c;
        btn.addEventListener("click", function() {
            coloringCurrent = c;
            palette.querySelectorAll(".color-swatch").forEach(function(b){b.classList.remove("active");});
            btn.classList.add("active");
        });
        palette.appendChild(btn);
    });

    // Page picker
    var picker = document.getElementById("color-page-picker");
    if (picker) {
        picker.innerHTML = "";
        COLORING_PAGES.forEach(function(p, idx) {
            var btn = document.createElement("button");
            btn.className = "timer-preset-btn" + (idx === pageIdx ? " active" : "");
            btn.textContent = p.emoji + " " + p.name;
            btn.addEventListener("click", function() { startColoring(idx); });
            picker.appendChild(btn);
        });
    }
}

function drawColoringBook(ctx, canvas) {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,canvas.width,canvas.height);
    coloringSections.forEach(function(s) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = s.color; ctx.fill();
        ctx.strokeStyle = "#333"; ctx.lineWidth = 2; ctx.stroke();
    });
}

// ===== PATTERN MATCH =====
var patternEmojis = ["\u{1F604}","\u{1F622}","\u{1F621}","\u{1F628}","\u{1F60A}","\u{1F634}","\u{1F914}","\u{1F633}"];
var patternSeq=[], patternAnswer="", patternDone=false;

function startPattern() {
    var len = 4 + Math.floor(Math.random()*3); // 4-6 items
    patternSeq = [];
    for(var i=0;i<len;i++) patternSeq.push(patternEmojis[Math.floor(Math.random()*patternEmojis.length)]);
    // Repeat pattern and hide last one
    var full = patternSeq.concat(patternSeq);
    patternAnswer = full[full.length-1];
    patternDone = false;

    var display = document.getElementById("pattern-display"); if(!display) return;
    display.innerHTML = "";
    for(var j=0;j<full.length-1;j++) {
        var span = document.createElement("span"); span.className = "pattern-item"; span.textContent = full[j];
        display.appendChild(span);
    }
    var q = document.createElement("span"); q.className = "pattern-item pattern-missing"; q.textContent = "?";
    display.appendChild(q);

    var choices = document.getElementById("pattern-choices"); if(!choices) return; choices.innerHTML = "";
    var opts = shuffleArray(patternEmojis.slice(0,5));
    if(opts.indexOf(patternAnswer)===-1) opts[0] = patternAnswer;
    opts = shuffleArray(opts);
    opts.forEach(function(e) {
        var btn = document.createElement("button"); btn.className = "em-choice-btn"; btn.textContent = e;
        btn.addEventListener("click", function() {
            if(patternDone) return; patternDone = true;
            if(e === patternAnswer) {
                btn.classList.add("correct"); q.textContent = patternAnswer; q.classList.remove("pattern-missing");
                if(typeof state!=="undefined"){state.totalStars+=2;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();}
                if(typeof playChime==="function") playChime();
                var info = document.getElementById("pattern-info"); if(info) info.textContent = "\u{1F389} Correct! +2\u2B50";
            } else {
                btn.classList.add("gentle"); q.textContent = patternAnswer; q.classList.remove("pattern-missing");
                var info2 = document.getElementById("pattern-info"); if(info2) info2.textContent = "The answer was " + patternAnswer + ". Try again!";
                if(typeof playGentle==="function") playGentle();
            }
        });
        choices.appendChild(btn);
    });
    var info3 = document.getElementById("pattern-info"); if(info3) info3.textContent = "What comes next in the pattern?";
}

// ===== FEELINGS BINGO =====
var bingoEmojis = ["\u{1F604} Happy","\u{1F622} Sad","\u{1F621} Angry","\u{1F628} Scared","\u{1F60A} Proud","\u{1F914} Confused","\u{1F634} Tired","\u{1F632} Surprised","\u{1F61E} Disappointed","\u{1F60D} Loving","\u{1F624} Frustrated","\u{1F630} Anxious","\u{1F633} Embarrassed","\u{1F60C} Calm","\u{1F929} Excited","\u{1F614} Lonely"];
var bingoMarked = [];

function startBingo() {
    bingoMarked = [];
    var grid = document.getElementById("bingo-grid"); if(!grid) return; grid.innerHTML = "";
    var selected = shuffleArray(bingoEmojis).slice(0,9);
    selected.forEach(function(item, idx) {
        var cell = document.createElement("button");
        cell.className = "bingo-cell";
        cell.innerHTML = '<span class="bingo-emoji">' + item.split(" ")[0] + '</span><span class="bingo-label">' + item.split(" ").slice(1).join(" ") + '</span>';
        cell.addEventListener("click", function() {
            if(cell.classList.contains("bingo-marked")) return;
            cell.classList.add("bingo-marked"); bingoMarked.push(idx);
            if(typeof playChime==="function") playChime();
            if(bingoMarked.length >= 5) {
                var info = document.getElementById("bingo-info");
                if(info) info.textContent = "\u{1F389} BINGO! You felt " + bingoMarked.length + " feelings today! +3\u2B50";
                if(typeof state!=="undefined"){state.totalStars+=3;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();}
            }
        });
        grid.appendChild(cell);
    });
    var info = document.getElementById("bingo-info"); if(info) info.textContent = "Tap a feeling when you experience it today!";
}

// ===== SPOT THE DIFFERENCE =====
var spotEmojis = ["\u{1F604}","\u{1F622}","\u{1F621}","\u{1F628}","\u{1F60A}","\u{1F634}","\u{1F914}","\u{1F633}","\u{1F60D}"];
var spotDiffIdx = -1, spotFound = false;

function startSpotDiff() {
    spotFound = false;
    var base = shuffleArray(spotEmojis).slice(0,9);
    spotDiffIdx = Math.floor(Math.random()*9);
    var changed = base.slice();
    var replacement;
    do { replacement = spotEmojis[Math.floor(Math.random()*spotEmojis.length)]; } while(replacement === base[spotDiffIdx]);
    changed[spotDiffIdx] = replacement;

    var grid1 = document.getElementById("spot-grid1"); if(!grid1) return; grid1.innerHTML = "";
    var grid2 = document.getElementById("spot-grid2"); if(!grid2) return; grid2.innerHTML = "";

    base.forEach(function(e) { var s = document.createElement("span"); s.className = "spot-cell"; s.textContent = e; grid1.appendChild(s); });
    changed.forEach(function(e, idx) {
        var s = document.createElement("button"); s.className = "spot-cell spot-clickable"; s.textContent = e;
        s.addEventListener("click", function() {
            if(spotFound) return;
            if(idx === spotDiffIdx) {
                spotFound = true; s.classList.add("spot-found");
                var info = document.getElementById("spot-info"); if(info) info.textContent = "\u{1F389} You found it! +3\u2B50";
                if(typeof state!=="undefined"){state.totalStars+=3;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();}
                if(typeof playComplete==="function") playComplete();
            } else {
                s.classList.add("spot-wrong");
                setTimeout(function(){s.classList.remove("spot-wrong");},500);
            }
        });
        grid2.appendChild(s);
    });
    var info = document.getElementById("spot-info"); if(info) info.textContent = "Find the ONE emoji that's different in the bottom grid!";
}

// ===== DOTS & BOXES =====
var dbRows=4, dbCols=4, dbLines, dbBoxes, dbTurn;

function startDotsBoxes() {
    dbLines = {}; dbBoxes = {}; dbTurn = 1;
    var grid = document.getElementById("db-grid"); if(!grid) return;
    grid.innerHTML = "";
    var totalCols = dbCols * 2 + 1;
    var colTemplate = "";
    for (var ci = 0; ci < totalCols; ci++) {
        colTemplate += (ci % 2 === 0) ? "28px " : "1fr ";
    }
    grid.style.gridTemplateColumns = colTemplate.trim();
    var totalRows = dbRows * 2 + 1;
    var rowTemplate = "";
    for (var ri = 0; ri < totalRows; ri++) {
        rowTemplate += (ri % 2 === 0) ? "28px " : "1fr ";
    }
    grid.style.gridTemplateRows = rowTemplate.trim();

    for(var r=0; r<=dbRows*2; r++) {
        for(var c=0; c<=dbCols*2; c++) {
            var el = document.createElement("div");
            if(r%2===0 && c%2===0) {
                el.className = "db-dot";
            } else if(r%2===0 && c%2===1) {
                el.className = "db-hline"; el.dataset.r=r; el.dataset.c=c;
                el.addEventListener("click", dbClickLine);
            } else if(r%2===1 && c%2===0) {
                el.className = "db-vline"; el.dataset.r=r; el.dataset.c=c;
                el.addEventListener("click", dbClickLine);
            } else {
                el.className = "db-box"; el.dataset.r=r; el.dataset.c=c;
            }
            grid.appendChild(el);
        }
    }
    var info = document.getElementById("db-info"); if(info) info.textContent = "Player 1's turn! Tap a line between dots.";
}

function dbClickLine(e) {
    var key = e.target.dataset.r + "," + e.target.dataset.c;
    if(dbLines[key]) return;
    dbLines[key] = dbTurn;
    e.target.classList.add("db-line-filled");
    e.target.style.background = dbTurn===1 ? "#6c63ff" : "#e91e63";

    var scored = dbCheckBoxes();
    if(!scored) { dbTurn = dbTurn===1 ? 2 : 1; }
    var info = document.getElementById("db-info");
    if(info) info.textContent = "Player " + dbTurn + "'s turn!";

    // Check if all lines filled
    var totalLines = 2*dbRows*dbCols + dbRows + dbCols;
    if(Object.keys(dbLines).length >= totalLines) {
        var s1=0, s2=0;
        Object.values(dbBoxes).forEach(function(v){if(v===1)s1++;else s2++;});
        if(info) info.textContent = "Game over! P1: " + s1 + " P2: " + s2 + (s1>s2?" P1 wins!":(s2>s1?" P2 wins!":" Draw!")) + " +3\u2B50";
        if(typeof state!=="undefined"){state.totalStars+=3;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();}
    }
}

function dbCheckBoxes() {
    var scored = false;
    for(var r=1;r<=dbRows*2-1;r+=2) {
        for(var c=1;c<=dbCols*2-1;c+=2) {
            var key = r+","+c;
            if(dbBoxes[key]) continue;
            var top=(r-1)+","+c, bot=(r+1)+","+c, left=r+","+(c-1), right=r+","+(c+1);
            if(dbLines[top]&&dbLines[bot]&&dbLines[left]&&dbLines[right]) {
                dbBoxes[key] = dbTurn; scored = true;
                var box = document.querySelector('.db-box[data-r="'+r+'"][data-c="'+c+'"]');
                if(box) { box.textContent = dbTurn===1?"1":"2"; box.style.background = dbTurn===1?"rgba(108,99,255,0.2)":"rgba(233,30,99,0.2)"; }
            }
        }
    }
    return scored;
}


// ===== WORD SEARCH =====
var wsWords = ["HAPPY","SAD","ANGRY","SCARED","PROUD","CALM","BRAVE","KIND","SHY","LOVE"];
var wsGrid=[], wsSize=10, wsFound=[], wsTargets=[];

function startWordSearch() {
    wsFound = [];
    wsTargets = shuffleArray(wsWords).slice(0,5);
    wsGrid = [];
    for(var r=0;r<wsSize;r++) { wsGrid[r]=[]; for(var c=0;c<wsSize;c++) wsGrid[r][c]=""; }

    // Place words
    wsTargets.forEach(function(word) {
        var placed = false;
        for(var attempt=0; attempt<50 && !placed; attempt++) {
            var dir = Math.floor(Math.random()*3); // 0=horiz, 1=vert, 2=diag
            var dr = dir===0?0:(dir===1?1:1), dc = dir===0?1:(dir===1?0:1);
            var sr = Math.floor(Math.random()*(wsSize-word.length*dr));
            var sc = Math.floor(Math.random()*(wsSize-word.length*dc));
            var ok = true;
            for(var i=0;i<word.length;i++) {
                var cr=sr+i*dr, cc=sc+i*dc;
                if(wsGrid[cr][cc] && wsGrid[cr][cc]!==word[i]) { ok=false; break; }
            }
            if(ok) {
                for(var j=0;j<word.length;j++) wsGrid[sr+j*dr][sc+j*dc] = word[j];
                placed = true;
            }
        }
    });

    // Fill empty cells
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var r2=0;r2<wsSize;r2++) for(var c2=0;c2<wsSize;c2++) {
        if(!wsGrid[r2][c2]) wsGrid[r2][c2] = letters[Math.floor(Math.random()*26)];
    }

    renderWordSearch();
}

function renderWordSearch() {
    var grid = document.getElementById("ws-grid"); if(!grid) return;
    grid.innerHTML = ""; grid.style.gridTemplateColumns = "repeat("+wsSize+", 1fr)";
    for(var r=0;r<wsSize;r++) for(var c=0;c<wsSize;c++) {
        var cell = document.createElement("button");
        cell.className = "ws-cell"; cell.textContent = wsGrid[r][c];
        cell.dataset.r = r; cell.dataset.c = c;
        cell.addEventListener("click", function() {
            this.classList.toggle("ws-selected");
            checkWsWords();
        });
        grid.appendChild(cell);
    }
    var wordsEl = document.getElementById("ws-words");
    if(wordsEl) wordsEl.innerHTML = "Find: " + wsTargets.map(function(w) {
        return wsFound.indexOf(w)!==-1 ? "<s>"+w+"</s>" : "<strong>"+w+"</strong>";
    }).join(" &bull; ");
}

function checkWsWords() {
    var selected = document.querySelectorAll(".ws-cell.ws-selected");
    if(selected.length < 3) return;
    var word = ""; selected.forEach(function(c) { word += c.textContent; });
    var reversed = word.split("").reverse().join("");
    wsTargets.forEach(function(target) {
        if((word.indexOf(target)!==-1 || reversed.indexOf(target)!==-1) && wsFound.indexOf(target)===-1) {
            wsFound.push(target);
            selected.forEach(function(c) { c.classList.add("ws-found"); c.classList.remove("ws-selected"); });
            if(typeof playChime==="function") playChime();
            renderWordSearch();
            if(wsFound.length >= wsTargets.length) {
                var info = document.getElementById("ws-info");
                if(info) info.textContent = "\u{1F389} You found all the words! +5\u2B50";
                if(typeof state!=="undefined"){state.totalStars+=5;state.wordsearchDone=true;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();if(typeof checkBadges==="function")checkBadges();}
                if(typeof fireConfetti==="function") fireConfetti();
            }
        }
    });
    // Clear selection if no match
    if(word.length > 10) { selected.forEach(function(c){c.classList.remove("ws-selected");}); }
}

// ===== CONNECT THE DOTS =====
var ctdDots=[], ctdCurrent=0, ctdTotal=15;

function startConnectDots() {
    ctdCurrent = 0;
    ctdTotal = 12 + Math.floor(Math.random()*6);
    ctdDots = [];
    var canvas = document.getElementById("ctd-canvas"); if(!canvas) return;
    canvas.width = Math.min(500, window.innerWidth-40); canvas.height = 400;
    var ctx = canvas.getContext("2d");

    // Generate dots in a rough shape
    for(var i=0;i<ctdTotal;i++) {
        var angle = (i/ctdTotal)*Math.PI*2;
        var r = 120 + Math.random()*40;
        ctdDots.push({
            x: canvas.width/2 + Math.cos(angle)*r,
            y: canvas.height/2 + Math.sin(angle)*r,
            num: i+1
        });
    }
    drawConnectDots(ctx, canvas);

    canvas.onclick = function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = (e.clientX-rect.left)*(canvas.width/rect.width);
        var y = (e.clientY-rect.top)*(canvas.height/rect.height);
        var dot = ctdDots[ctdCurrent];
        if(!dot) return;
        var dx=x-dot.x, dy=y-dot.y;
        if(dx*dx+dy*dy < 900) { // within 30px
            ctdCurrent++;
            if(typeof playChime==="function") playChime();
            drawConnectDots(ctx, canvas);
            if(ctdCurrent >= ctdTotal) {
                var info = document.getElementById("ctd-info");
                if(info) info.textContent = "\u{1F389} Connected! +3\u2B50";
                if(typeof state!=="undefined"){state.totalStars+=3;if(typeof saveProfile==="function")saveProfile();if(typeof updateStars==="function")updateStars();}
                if(typeof fireConfetti==="function") fireConfetti();
            }
        }
    };
}

function drawConnectDots(ctx, canvas) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var primary = getComputedStyle(document.body).getPropertyValue("--color-primary").trim() || "#6c63ff";
    // Draw connected lines
    ctx.strokeStyle = primary; ctx.lineWidth = 3;
    for(var i=0;i<ctdCurrent-1;i++) {
        ctx.beginPath(); ctx.moveTo(ctdDots[i].x,ctdDots[i].y); ctx.lineTo(ctdDots[i+1].x,ctdDots[i+1].y); ctx.stroke();
    }
    // Draw dots
    ctdDots.forEach(function(dot,i) {
        ctx.beginPath(); ctx.arc(dot.x,dot.y,15,0,Math.PI*2);
        ctx.fillStyle = i<ctdCurrent ? primary : (i===ctdCurrent ? "#ff9800" : "#e0e0e0");
        ctx.fill(); ctx.strokeStyle="#333"; ctx.lineWidth=1; ctx.stroke();
        ctx.fillStyle = i<ctdCurrent ? "white" : "#333";
        ctx.font = "bold 11px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(dot.num, dot.x, dot.y);
    });
}

// ===== FACIAL EXPRESSION BUILDER =====
var faceEyebrows = ["\u{1F610}","\u2B06\uFE0F Raised","\u{1F615} Furrowed","\u{1F612} Flat"];
var faceEyes = ["\u{1F440} Normal","\u{1F60A} Squinting","\u{1F633} Wide","\u{1F622} Teary"];
var faceMouths = ["\u{1F610} Neutral","\u{1F604} Smiling","\u{1F641} Frowning","\u{1F62E} Open","\u{1F620} Gritting"];
var faceResults = {
    "Raised,Normal,Smiling":"Surprised and happy!",
    "Raised,Wide,Open":"Shocked or very surprised!",
    "Furrowed,Normal,Frowning":"Angry or frustrated",
    "Furrowed,Squinting,Gritting":"Very angry!",
    "Flat,Teary,Frowning":"Sad",
    "Raised,Teary,Frowning":"About to cry",
    "Flat,Normal,Neutral":"Calm or bored",
    "Flat,Squinting,Smiling":"Content and relaxed"
};

function startFaceBuilder() {
    var container = document.getElementById("face-builder"); if(!container) return;
    container.innerHTML = "";
    var selected = {eyebrows:"",eyes:"",mouth:""};

    function renderFB() {
        container.innerHTML = "";
        [["Eyebrows",faceEyebrows,"eyebrows"],["Eyes",faceEyes,"eyes"],["Mouth",faceMouths,"mouth"]].forEach(function(group) {
            var h = document.createElement("h3"); h.textContent = group[0]; h.style.margin = "12px 0 6px";
            container.appendChild(h);
            var row = document.createElement("div"); row.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;";
            group[1].forEach(function(opt,i) {
                if(i===0) return; // skip placeholder
                var name = opt.split(" ").slice(1).join(" ") || opt;
                var btn = document.createElement("button");
                btn.className = "em-choice-btn" + (selected[group[2]]===name?" correct":"");
                btn.textContent = opt; btn.style.flex = "1"; btn.style.minWidth = "80px";
                btn.addEventListener("click", function() {
                    selected[group[2]] = name; renderFB();
                });
                row.appendChild(btn);
            });
            container.appendChild(row);
        });
        // Show result
        if(selected.eyebrows && selected.eyes && selected.mouth) {
            var key = selected.eyebrows+","+selected.eyes+","+selected.mouth;
            var result = faceResults[key] || "Hmm, that's an interesting expression! What emotion do you think this shows?";
            var res = document.createElement("div");
            res.className = "feedback-area"; res.style.marginTop = "16px";
            res.innerHTML = '<p class="feedback-text success">' + result + '</p>';
            container.appendChild(res);
            if(typeof state!=="undefined" && !state._faceBuilderUsed) {
                state._faceBuilderUsed = true; state.totalStars += 2;
                if(typeof saveProfile==="function") saveProfile();
                if(typeof updateStars==="function") updateStars();
            }
        }
    }
    renderFB();
}
