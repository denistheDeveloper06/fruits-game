const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const overlayTitle = document.getElementById("overlayTitle");
const mainMenu = document.getElementById("mainMenu");
const questMenu = document.getElementById("questMenu");

const playButton = document.getElementById("playButton");
const menuButton = document.getElementById("menuButton");

const questsButton = document.getElementById("questsButton");

const backFromQuestsButton =
    document.getElementById("backFromQuestsButton");

const questList =
    document.getElementById("questList");

const questCoinsElement =
    document.getElementById("questCoins");

const totalApplesElement =
    document.getElementById("totalApples");

const trophiesElement =
    document.getElementById("trophies");

const rankElement =
    document.getElementById("rank");

const winsElement =
    document.getElementById("wins");

const rankProgressText =
    document.getElementById("rankProgressText");

const rankProgressFill =
    document.getElementById("rankProgressFill");

const rankProgressWins =
    document.getElementById("rankProgressWins");

const rankProgressNext =
    document.getElementById("rankProgressNext");

const gameStats =
    document.getElementById("gameStats");

const menuStats =
    document.getElementById("menuStats");

const gameApples =
    document.getElementById("gameApples");

const gameTrophies =
    document.getElementById("gameTrophies");

const gameKillsElement =
    document.getElementById("gameKills");

const totalKillsElement =
    document.getElementById("totalKills");


const mapWidth = 2500;
const mapHeight = 2500;

let cameraX = 0;
let cameraY = 0;

const maxPlayerRadius = 400;

let score = 0;
let gameState = "menu";

let totalApples =
    Number(localStorage.getItem("totalApples")) || 0;

let trophies =
    Number(localStorage.getItem("trophies")) || 0;

let wins =
    Number(localStorage.getItem("wins")) || 0;


// =========================
// QUEST DATA
// =========================

let questCoins =
    Number(localStorage.getItem("questCoins")) || 0;

let playersEaten =
    Number(localStorage.getItem("playersEaten")) || 0;

let startingKills = 0;

let completedQuests =
    JSON.parse(
        localStorage.getItem("completedQuests")
    ) || {};


const quests = [

    {
        id: "win1",
        title: "First Victory",
        description: "Win 1 game.",
        type: "wins",
        goal: 1,
        reward: 10
    },

    {
        id: "win5",
        title: "Getting Started",
        description: "Win 5 games.",
        type: "wins",
        goal: 5,
        reward: 25
    },

    {
        id: "win10",
        title: "Winner",
        description: "Win 10 games.",
        type: "wins",
        goal: 10,
        reward: 50
    },


    {
        id: "win50",
        title: "Seasoned Winner",
        description: "Win 50 games.",
        type: "wins",
        goal: 50,
        reward: 100
    },

    {
        id: "win100",
        title: "Conqueror",
        description: "Win 100 games.",
        type: "wins",
        goal: 100,
        reward: 200
    },

    {
        id: "eat3",
        title: "Up and Coming",
        description: "Eat 3 players.",
        type: "players",
        goal: 3,
        reward: 15
    },

    {
        id: "eat10",
        title: "Predator",
        description: "Eat 10 players.",
        type: "players",
        goal: 10,
        reward: 30
    },

    {
        id: "eat25",
        title: "Apex Player",
        description: "Eat 25 players.",
        type: "players",
        goal: 25,
        reward: 75
    },

    {
        id: "eat50",
        title: "Alpha",
        description: "Eat 50 players.",
        type: "players",
        goal: 50,
        reward: 100
    },

    {
        id: "eat100",
        title: "The DEATH Himself",
        description: "Eat 100 players.",
        type: "players",
        goal: 100,
        reward: 200
    },

    {
        id: "apples500",
        title: "Apple Collector",
        description: "Collect 500 apples.",
        type: "apples",
        goal: 500,
        reward: 30
    },

    {
        id: "apples1000",
        title: "Apple Hoarder",
        description: "Collect 1,000 apples.",
        type: "apples",
        goal: 1000,
        reward: 75
    },

    {
        id: "apples5000",
        title: "Apple Master",
        description: "Collect 5,000 apples.",
        type: "apples",
        goal: 5000,
        reward: 100
    },

    {
        id: "apples10000",
        title: "Apple King",
        description: "Collect 10,000 apples.",
        type: "apples",
        goal: 10000,
        reward: 200
    },

    {
        id: "apples50000",
        title: "Apple Legend",
        description: "Collect 50,000 apples.",
        type: "apples",
        goal: 50000,
        reward: 300
    },

    {
        id: "apples100000",
        title: "Unreal Apple Collector",
        description: "Collect 100,000 apples.",
        type: "apples",
        goal: 100000,
        reward: 400
    },

    {
        id: "apples5000000",
        title: "Apple GOAT",
        description: "Collect 500,000 apples.",
        type: "apples",
        goal: 500000,
        reward: 500
    },

    {
        id: "apples1000000",
        title: "Apple GOAT",
        description: "Collect 1,000,000 apples.",
        type: "apples",
        goal: 1000000,
        reward: 1000
    }

];


// =========================
// PLAYER SPECIAL ABILITIES
// =========================

let speedBoostTimer = 0;
let appleBoostTimer = 0;
let invisibilityTimer = 0;

let shield = false;

let abilityMessage = "";
let abilityMessageTimer = 0;


const player = {

    x: mapWidth / 2,
    y: mapHeight / 2,
    radius: 20,
    speed: 3.5,
    alive: false
};


// =========================
// RANKS
// =========================

const ranks = [

    {rank: "Bronze 1", wins: 10},
    {rank: "Bronze 2", wins: 20},
    {rank: "Bronze 3", wins: 30},

    {rank: "Silver 1", wins: 40},
    {rank: "Silver 2", wins: 50},
    {rank: "Silver 3", wins: 60},

    {rank: "Gold 1", wins: 70},
    {rank: "Gold 2", wins: 80},
    {rank: "Gold 3", wins: 90},

    {rank: "Platinum 1", wins: 100},
    {rank: "Platinum 2", wins: 110},
    {rank: "Platinum 3", wins: 120},

    {rank: "Diamond 1", wins: 140},
    {rank: "Diamond 2", wins: 160},
    {rank: "Diamond 3", wins: 180},

    {rank: "Elite 1", wins: 200},
    {rank: "Elite 2", wins: 220},
    {rank: "Elite 3", wins: 240},

    {rank: "Champion 1", wins: 280},
    {rank: "Champion 2", wins: 320},
    {rank: "Champion 3", wins: 360},

    {rank: "Grandmaster 1", wins: 400},
    {rank: "Grandmaster 2", wins: 440},
    {rank: "Grandmaster 3", wins: 480},

    {rank: "Unreal", wins: 650},

    {rank: "GOAT", wins: 1000}

];


function getRank() {

    let currentRank = "Copper 1";

    for (const rankInfo of ranks) {

        if (wins >= rankInfo.wins) {

            currentRank =
                rankInfo.rank;
        }
    }

    return currentRank;
}


// =========================
// SAVE NORMAL STATS
// =========================

function saveStats() {

    localStorage.setItem(
        "totalApples",
        totalApples
    );

    localStorage.setItem(
        "trophies",
        trophies
    );

    localStorage.setItem(
        "wins",
        wins
    );
}


// =========================
// SAVE QUEST DATA
// =========================

function saveQuestData() {

    localStorage.setItem(
        "questCoins",
        questCoins
    );

    localStorage.setItem(
        "playersEaten",
        playersEaten
    );

    localStorage.setItem(
        "completedQuests",
        JSON.stringify(completedQuests)
    );
}


// =========================
// UPDATE QUEST COINS
// =========================

function updateQuestCoins() {

    questCoinsElement.textContent =
        questCoins;
}


// =========================
// GET QUEST PROGRESS
// =========================

function getQuestProgress(quest) {

    if (quest.type === "wins") {

        return wins;
    }

    if (quest.type === "players") {

        return playersEaten;
    }

    if (quest.type === "apples") {

        return totalApples;
    }

    return 0;
}


// =========================
// CHECK QUESTS
// =========================

function checkQuests() {

    let changed = false;

    for (let quest of quests) {

        if (completedQuests[quest.id]) {

            continue;
        }

        const progress =
            getQuestProgress(quest);

        if (progress >= quest.goal) {

            completedQuests[quest.id] =
                true;

            questCoins +=
                quest.reward;

            changed = true;
        }
    }

    if (changed) {

        saveQuestData();
    }

    updateQuestCoins();
}


// =========================
// SHOW QUESTS
// =========================

function renderQuests() {

    questList.innerHTML = "";

    for (let quest of quests) {

        let progress =
            getQuestProgress(quest);

        if (progress > quest.goal) {

            progress =
                quest.goal;
        }

        const percent =
            (progress / quest.goal) * 100;

        const completed =
            completedQuests[quest.id] === true;


        const questDiv =
            document.createElement("div");

        questDiv.className =
            "quest";


        questDiv.innerHTML = `

            <div class="questTitle">
                ${quest.title}
            </div>

            <div class="questDescription">
                ${quest.description}
            </div>

            <div class="questProgressBar">

                <div
                    class="questProgressFill"
                    style="width: ${percent}%"
                ></div>

            </div>

            <div class="questDescription">
                ${progress} / ${quest.goal}
            </div>

            <div class="questReward">
                🪙 Reward: ${quest.reward} Quest Coins
            </div>

            ${
                completed
                ? `
                    <div class="questCompleted">
                        ✓ COMPLETED
                    </div>
                `
                : ""
            }

        `;


        questList.appendChild(
            questDiv
        );
    }
}


// =========================
// UPDATE MENU STATS
// =========================

function updateMenuStats() {

    totalKillsElement.textContent =
        playersEaten;

    totalApplesElement.textContent =
        totalApples;

    trophiesElement.textContent =
        trophies;

    rankElement.textContent =
        getRank();

    winsElement.textContent =
        wins;


    // GOAT
    if (wins >= 500) {

        rankProgressText.textContent =
            "GOAT";

        rankProgressFill.style.width =
            "100%";

        rankProgressWins.textContent =
            wins + " wins";

        rankProgressNext.textContent =
            "MAX RANK";

        return;
    }


    // Find current rank wins
    let currentRankWins = 0;

    for (
        let i = 0;
        i < ranks.length;
        i++
    ) {

        if (wins >= ranks[i].wins) {

            currentRankWins =
                ranks[i].wins;
        }
    }


    // Find next rank
    let nextRank = null;

    for (
        let i = 0;
        i < ranks.length;
        i++
    ) {

        if (wins < ranks[i].wins) {

            nextRank =
                ranks[i];

            break;
        }
    }


    // Find current rank name
    let currentRank =
        "Copper 1";

    for (
        let i = 0;
        i < ranks.length;
        i++
    ) {

        if (wins >= ranks[i].wins) {

            currentRank =
                ranks[i].rank;
        }
    }


    const winsNeeded =
        nextRank.wins -
        currentRankWins;

    const winsIntoRank =
        wins -
        currentRankWins;

    const progress =
        (winsIntoRank / winsNeeded) * 100;


    rankProgressText.textContent =
        currentRank;

    rankProgressFill.style.width =
        progress + "%";

    rankProgressWins.textContent =
        winsIntoRank +
        " / " +
        winsNeeded +
        " wins";

    rankProgressNext.textContent =
        (nextRank.wins - wins) +
        " wins until " +
        nextRank.rank;
}


// =========================
// RESIZE CANVAS
// =========================

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();


window.addEventListener(
    "resize",
    function() {

        resizeCanvas();

        updateCamera();
    }
);


// =========================
// AI DATA
// =========================

const aiColors = [

    "purple",
    "orange",
    "pink",
    "yellow",
    "cyan",
    "lime",
    "red",
    "white",
    "magenta",
    "gold",
    "gray",
    "black"

];


const aiNames = [

    "Botero",
    "Denis",
    "Julius",
    "Ismael",
    "Aarav",
    "Alex",
    "Lucas",
    "Nick",
    "Tony",
    "Sanin",
    "Eli",
    "Said"

];


const ais = [];


for (let i = 0; i < 12; i++) {

    ais.push({

        x:
            Math.random() *
            mapWidth,

        y:
            Math.random() *
            mapHeight,

        radius:
            20,

        speed:
            3.5,

        score:
            0,

        color:
            aiColors[i],

        name:
            aiNames[i],

        aggression:
            Math.random(),

        speedBoostTimer:
            0,

        appleBoostTimer:
            0,

        invisibilityTimer:
            0,

        shield:
            false,

        alive:
            true
    });
}


// =========================
// NORMAL APPLES
// =========================

const foods = [];


for (let i = 0; i < 1000; i++) {

    foods.push({

        x:
            Math.random() *
            (mapWidth - 100) +
            50,

        y:
            Math.random() *
            (mapHeight - 100) +
            50,

        radius:
            8
    });
}


// =========================
// SPECIAL APPLES
// 3 OF EACH TYPE
// =========================

const specialApples = [

    // Golden 1
    {
        type: "golden",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Golden 2
    {
        type: "golden",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Golden 3
    {
        type: "golden",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },


    // Silver 1
    {
        type: "silver",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Silver 2
    {
        type: "silver",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Silver 3
    {
        type: "silver",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },


    // Blue 1
    {
        type: "blue",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Blue 2
    {
        type: "blue",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Blue 3
    {
        type: "blue",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },


    // Invisibility 1
    {
        type: "invisibility",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Invisibility 2
    {
        type: "invisibility",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    },

    // Invisibility 3
    {
        type: "invisibility",
        x: 0,
        y: 0,
        radius: 13,
        active: false,
        spawned: false
    }

];


const keys = {};


document.addEventListener(
    "keydown",
    function(event) {

        keys[event.key] =
            true;
    }
);


document.addEventListener(
    "keyup",
    function(event) {

        keys[event.key] =
            false;
    }
);


// =========================
// DISTANCE
// =========================

function getDistance(a, b) {

    const dx =
        a.x - b.x;

    const dy =
        a.y - b.y;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


// =========================
// FOOD
// =========================

function respawnFood(food) {

    food.x =
        Math.random() *
        (mapWidth - 100) +
        50;

    food.y =
        Math.random() *
        (mapHeight - 100) +
        50;
}


function checkFoodCollision() {

    for (let food of foods) {

        const distance =
            getDistance(
                player,
                food
            );

        const radius =
            player.radius +
            food.radius;


        if (distance < radius) {

            respawnFood(food);


            if (
                appleBoostTimer >
                0
            ) {

                score += 2;

            } else {

                score += 1;
            }


            player.radius =
                Math.min(
                    maxPlayerRadius,
                    player.radius + 0.2
                );
        }
    }
}


function checkAIFoodCollision() {

    for (let ai of ais) {

        if (!ai.alive) {

            continue;
        }


        for (let food of foods) {

            const distance =
                getDistance(
                    ai,
                    food
                );

            const radius =
                ai.radius +
                food.radius;


            if (distance < radius) {

                respawnFood(food);


                if (
                    ai.appleBoostTimer >
                    0
                ) {

                    ai.score += 2;

                } else {

                    ai.score += 1;
                }


                ai.radius =
                    Math.min(
                        maxPlayerRadius,
                        ai.radius + 0.2
                    );
            }
        }
    }
}


// =========================
// SPECIAL APPLE SPAWN
// =========================

function spawnSpecialApple(apple) {

    apple.x =
        Math.random() *
        (mapWidth - 100) +
        50;

    apple.y =
        Math.random() *
        (mapHeight - 100) +
        50;

    apple.active =
        true;

    apple.spawned =
        true;
}


function spawnSpecialApples() {

    if (gameState !== "playing") {

        return;
    }


    // One special apple can appear
    // at a time
    if (Math.random() < 0.002) {

        const availableApples = [];


        for (
            let apple of specialApples
        ) {

            if (!apple.spawned) {

                availableApples.push(
                    apple
                );
            }
        }


        if (
            availableApples.length >
            0
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    availableApples.length
                );


            spawnSpecialApple(
                availableApples[
                    randomIndex
                ]
            );
        }
    }
}


// =========================
// PLAYER SPECIAL APPLE
// =========================

function checkSpecialAppleCollision() {

    for (
        let apple of specialApples
    ) {

        if (!apple.active) {

            continue;
        }


        const distance =
            getDistance(
                player,
                apple
            );

        const radius =
            player.radius +
            apple.radius;


        if (distance < radius) {

            apple.active =
                false;


            if (
                apple.type ===
                "golden"
            ) {

                speedBoostTimer =
                    5 * 60;

                abilityMessage =
                    "Golden Apple! 2X SPEED!";

                abilityMessageTimer =
                    120;
            }


            if (
                apple.type ===
                "silver"
            ) {

                appleBoostTimer =
                    7 * 60;

                abilityMessage =
                    "Silver Apple! 2X APPLES!";

                abilityMessageTimer =
                    120;
            }


            if (
                apple.type ===
                "blue"
            ) {

                shield =
                    true;

                abilityMessage =
                    "Blue Apple! SHIELD READY!";

                abilityMessageTimer =
                    120;
            }


            if (
                apple.type ===
                "invisibility"
            ) {

                invisibilityTimer =
                    6 * 60;

                abilityMessage =
                    "Invisible Apple! INVISIBLE!";

                abilityMessageTimer =
                    120;
            }
        }
    }
}


// =========================
// AI SPECIAL APPLE
// =========================

function checkAISpecialAppleCollision() {

    for (let ai of ais) {

        if (!ai.alive) {

            continue;
        }


        for (
            let apple of specialApples
        ) {

            if (!apple.active) {

                continue;
            }


            const distance =
                getDistance(
                    ai,
                    apple
                );

            const radius =
                ai.radius +
                apple.radius;


            if (distance < radius) {

                apple.active =
                    false;


                if (
                    apple.type ===
                    "golden"
                ) {

                    ai.speedBoostTimer =
                        5 * 60;
                }


                if (
                    apple.type ===
                    "silver"
                ) {

                    ai.appleBoostTimer =
                        7 * 60;
                }


                if (
                    apple.type ===
                    "blue"
                ) {

                    ai.shield =
                        true;
                }


                if (
                    apple.type ===
                    "invisibility"
                ) {

                    ai.invisibilityTimer =
                        6 * 60;
                }


                break;
            }
        }
    }
}


// =========================
// PLAYER VS AI
// =========================

function checkPlayerAICollision() {

    if (!player.alive) {

        return;
    }


    for (let ai of ais) {

        if (!ai.alive) {

            continue;
        }


        // Invisible AI cannot be eaten
        if (
            ai.invisibilityTimer >
            0
        ) {

            continue;
        }


        const distance =
            getDistance(
                player,
                ai
            );

        const radius =
            player.radius +
            ai.radius;


        if (distance < radius) {


            // AI is bigger
            if (score < ai.score) {


                // Player shield
                if (shield) {

                    shield =
                        false;


                    const dx =
                        player.x -
                        ai.x;

                    const dy =
                        player.y -
                        ai.y;


                    const pushDistance =
                        player.radius +
                        ai.radius +
                        20;


                    if (
                        distance >
                        0
                    ) {

                        player.x +=
                            (dx / distance) *
                            pushDistance;

                        player.y +=
                            (dy / distance) *
                            pushDistance;

                    } else {

                        player.x +=
                            pushDistance;
                    }


                    keepInBounds(
                        player
                    );


                    abilityMessage =
                        "SHIELD BLOCKED THE ATTACK!";

                    abilityMessageTimer =
                        120;


                    continue;
                }


                // AI eats player
                ai.score +=
                    score;


                ai.radius =
                    Math.min(
                        maxPlayerRadius,
                        ai.radius +
                        player.radius
                    );


                player.alive =
                    false;


                endGame(false);

                return;
            }


            // Player is bigger
            else if (
                score >
                ai.score
            ) {


                // AI shield
                if (ai.shield) {

                    ai.shield =
                        false;


                    const dx =
                        ai.x -
                        player.x;

                    const dy =
                        ai.y -
                        player.y;


                    const pushDistance =
                        player.radius +
                        ai.radius +
                        20;


                    if (
                        distance >
                        0
                    ) {

                        ai.x +=
                            (dx / distance) *
                            pushDistance;

                        ai.y +=
                            (dy / distance) *
                            pushDistance;

                    } else {

                        ai.x +=
                            pushDistance;
                    }


                    keepInBounds(ai);

                    continue;
                }


                // Player eats AI
                score +=
                    ai.score;


                player.radius =
                    Math.min(
                        maxPlayerRadius,
                        player.radius +
                        ai.radius
                    );


                ai.alive =
                    false;


                // Lifetime kills
                playersEaten++;


                saveQuestData();

                checkQuests();
            }


            // Same score
            else {

                const dx =
                    player.x -
                    ai.x;

                const dy =
                    player.y -
                    ai.y;


                if (
                    distance >
                    0
                ) {

                    player.x +=
                        (dx / distance) *
                        2;

                    player.y +=
                        (dy / distance) *
                        2;

                    ai.x -=
                        (dx / distance) *
                        2;

                    ai.y -=
                        (dy / distance) *
                        2;

                } else {

                    player.x += 2;

                    ai.x -= 2;
                }
            }
        }
    }
}


// =========================
// AI VS AI
// =========================

function checkAIAndAICollision() {

    for (
        let i = 0;
        i < ais.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < ais.length;
            j++
        ) {

            const ai1 =
                ais[i];

            const ai2 =
                ais[j];


            if (
                !ai1.alive ||
                !ai2.alive
            ) {

                continue;
            }


            // Invisible AIs cannot be
            // targeted or eaten
            if (
                ai1.invisibilityTimer > 0 ||
                ai2.invisibilityTimer > 0
            ) {

                continue;
            }


            const distance =
                getDistance(
                    ai1,
                    ai2
                );

            const radius =
                ai1.radius +
                ai2.radius;


            if (
                distance <
                radius
            ) {


                // AI 1 is bigger
                if (
                    ai1.score >
                    ai2.score
                ) {


                    // AI 2 shield
                    if (ai2.shield) {

                        ai2.shield =
                            false;


                        const dx =
                            ai2.x -
                            ai1.x;

                        const dy =
                            ai2.y -
                            ai1.y;


                        const pushDistance =
                            ai1.radius +
                            ai2.radius +
                            20;


                        if (
                            distance >
                            0
                        ) {

                            ai2.x +=
                                (dx / distance) *
                                pushDistance;

                            ai2.y +=
                                (dy / distance) *
                                pushDistance;

                        } else {

                            ai2.x +=
                                pushDistance;
                        }


                        keepInBounds(
                            ai2
                        );


                        continue;
                    }


                    ai1.score +=
                        ai2.score;


                    ai1.radius =
                        Math.min(
                            maxPlayerRadius,
                            ai1.radius +
                            ai2.radius
                        );


                    ai2.alive =
                        false;
                }


                // AI 2 is bigger
                else if (
                    ai2.score >
                    ai1.score
                ) {


                    // AI 1 shield
                    if (ai1.shield) {

                        ai1.shield =
                            false;


                        const dx =
                            ai1.x -
                            ai2.x;

                        const dy =
                            ai1.y -
                            ai2.y;


                        const pushDistance =
                            ai1.radius +
                            ai2.radius +
                            20;


                        if (
                            distance >
                            0
                        ) {

                            ai1.x +=
                                (dx / distance) *
                                pushDistance;

                            ai1.y +=
                                (dy / distance) *
                                pushDistance;

                        } else {

                            ai1.x +=
                                pushDistance;
                        }


                        keepInBounds(
                            ai1
                        );


                        continue;
                    }


                    ai2.score +=
                        ai1.score;


                    ai2.radius =
                        Math.min(
                            maxPlayerRadius,
                            ai2.radius +
                            ai1.radius
                        );


                    ai1.alive =
                        false;
                }


                // Same score
                else {

                    const dx =
                        ai1.x -
                        ai2.x;

                    const dy =
                        ai1.y -
                        ai2.y;


                    if (
                        distance >
                        0
                    ) {

                        ai1.x +=
                            (dx / distance) *
                            2;

                        ai1.y +=
                            (dy / distance) *
                            2;

                        ai2.x -=
                            (dx / distance) *
                            2;

                        ai2.y -=
                            (dy / distance) *
                            2;

                    } else {

                        ai1.x += 2;

                        ai2.x -= 2;
                    }
                }
            }
        }
    }
}


// =========================
// CLOSEST FOOD
// =========================

function findClosestFood(ai) {

    let closestFood =
        null;

    let closestDistance =
        Infinity;


    for (let food of foods) {

        const distance =
            getDistance(
                ai,
                food
            );


        if (
            distance <
            closestDistance
        ) {

            closestDistance =
                distance;

            closestFood =
                food;
        }
    }


    return closestFood;
}


// =========================
// NEARBY PLAYERS
// =========================

function findNearbyPlayers(ai) {

    const dangerousPlayers =
        [];

    const ediblePlayers =
        [];

    const visionRange =
        400;


    // Player
    if (
        player.alive &&
        invisibilityTimer <= 0
    ) {

        const distance =
            getDistance(
                player,
                ai
            );


        if (
            distance <
            visionRange
        ) {

            if (
                score >
                ai.score
            ) {

                dangerousPlayers.push({

                    target:
                        player,

                    distance:
                        distance
                });

            } else if (
                score <
                ai.score
            ) {

                ediblePlayers.push({

                    target:
                        player,

                    distance:
                        distance
                });
            }
        }
    }


    // Other AIs
    for (
        let otherAI of ais
    ) {

        if (
            otherAI === ai
        ) {

            continue;
        }


        if (!otherAI.alive) {

            continue;
        }


        // Invisible AI cannot be seen
        if (
            otherAI.invisibilityTimer >
            0
        ) {

            continue;
        }


        const distance =
            getDistance(
                otherAI,
                ai
            );


        if (
            distance <
            visionRange
        ) {

            if (
                otherAI.score >
                ai.score
            ) {

                dangerousPlayers.push({

                    target:
                        otherAI,

                    distance:
                        distance
                });

            } else if (
                otherAI.score <
                ai.score
            ) {

                ediblePlayers.push({

                    target:
                        otherAI,

                    distance:
                        distance
                });
            }
        }
    }


    return {

        dangerousPlayers:
            dangerousPlayers,

        ediblePlayers:
            ediblePlayers
    };
}


// =========================
// CLOSEST TARGET
// =========================

function findClosestTarget(players) {

    let closest =
        null;

    let closestDistance =
        Infinity;


    for (
        const enemy of players
    ) {

        if (
            enemy.distance <
            closestDistance
        ) {

            closest =
                enemy.target;

            closestDistance =
                enemy.distance;
        }
    }


    return closest;
}


// =========================
// KEEP IN BOUNDS
// =========================

function keepInBounds(entity) {

    entity.x =
        Math.max(
            entity.radius,

            Math.min(
                mapWidth -
                entity.radius,

                entity.x
            )
        );


    entity.y =
        Math.max(
            entity.radius,

            Math.min(
                mapHeight -
                entity.radius,

                entity.y
            )
        );
}


// =========================
// MOVE PLAYER
// =========================

function movePlayer() {

    let currentSpeed =
        player.speed;


    if (
        speedBoostTimer >
        0
    ) {

        currentSpeed =
            player.speed * 2;
    }


    if (
        keys["w"] ||
        keys["ArrowUp"]
    ) {

        player.y -=
            currentSpeed;
    }


    if (
        keys["s"] ||
        keys["ArrowDown"]
    ) {

        player.y +=
            currentSpeed;
    }


    if (
        keys["a"] ||
        keys["ArrowLeft"]
    ) {

        player.x -=
            currentSpeed;
    }


    if (
        keys["d"] ||
        keys["ArrowRight"]
    ) {

        player.x +=
            currentSpeed;
    }


    keepInBounds(
        player
    );
}


// =========================
// MOVE TOWARD
// =========================

function moveToward(
    entity,
    target
) {

    const dx =
        target.x -
        entity.x;

    const dy =
        target.y -
        entity.y;


    const distance =
        getDistance(
            target,
            entity
        );


    let currentSpeed =
        entity.speed;


    if (
        entity.speedBoostTimer >
        0
    ) {

        currentSpeed =
            entity.speed * 2;
    }


    if (
        distance >
        currentSpeed
    ) {

        entity.x +=
            (dx / distance) *
            currentSpeed;

        entity.y +=
            (dy / distance) *
            currentSpeed;
    }
}


// =========================
// MOVE AWAY
// =========================

function moveAway(
    entity,
    target
) {

    const dx =
        entity.x -
        target.x;

    const dy =
        entity.y -
        target.y;


    const distance =
        getDistance(
            target,
            entity
        );


    let currentSpeed =
        entity.speed;


    if (
        entity.speedBoostTimer >
        0
    ) {

        currentSpeed =
            entity.speed * 2;
    }


    if (
        distance >
        currentSpeed
    ) {

        entity.x +=
            (dx / distance) *
            currentSpeed;

        entity.y +=
            (dy / distance) *
            currentSpeed;
    }
}


// =========================
// MOVE AIS
// =========================

function moveAIs() {

    for (let ai of ais) {

        if (!ai.alive) {

            continue;
        }


        const nearbyPlayers =
            findNearbyPlayers(
                ai
            );


        const danger =
            findClosestTarget(
                nearbyPlayers
                    .dangerousPlayers
            );


        const edible =
            findClosestTarget(
                nearbyPlayers
                    .ediblePlayers
            );


        if (
            danger !== null
        ) {

            moveAway(
                ai,
                danger
            );

        } else if (
            edible !== null
        ) {

            moveToward(
                ai,
                edible
            );

        } else {

            const targetFood =
                findClosestFood(
                    ai
                );


            if (
                targetFood !== null
            ) {

                moveToward(
                    ai,
                    targetFood
                );
            }
        }


        keepInBounds(
            ai
        );
    }
}


// =========================
// CLAMP
// =========================

function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );
}


// =========================
// CAMERA
// =========================

function updateCamera() {

    cameraX =
        player.x -
        canvas.width / 2;

    cameraY =
        player.y -
        canvas.height / 2;


    cameraX =
        clamp(
            cameraX,
            0,
            mapWidth -
            canvas.width
        );


    cameraY =
        clamp(
            cameraY,
            0,
            mapHeight -
            canvas.height
        );
}


// =========================
// ABILITY TIMERS
// =========================

function updateSpecialAppleTimers() {

    // Player timers

    if (
        speedBoostTimer >
        0
    ) {

        speedBoostTimer--;
    }


    if (
        appleBoostTimer >
        0
    ) {

        appleBoostTimer--;
    }


    if (
        invisibilityTimer >
        0
    ) {

        invisibilityTimer--;
    }


    if (
        abilityMessageTimer >
        0
    ) {

        abilityMessageTimer--;
    }


    // AI timers

    for (let ai of ais) {

        if (
            ai.speedBoostTimer >
            0
        ) {

            ai.speedBoostTimer--;
        }


        if (
            ai.appleBoostTimer >
            0
        ) {

            ai.appleBoostTimer--;
        }


        if (
            ai.invisibilityTimer >
            0
        ) {

            ai.invisibilityTimer--;
        }
    }
}


// =========================
// END GAME
// =========================

function endGame(won) {

    if (
        gameState === "gameOver" ||
        gameState === "won"
    ) {

        return;
    }


    // Add this game's apples
    // to lifetime apples
    totalApples +=
        score;


    if (won) {

        trophies +=
            30;

        wins++;
    }


    // Check quests after
    // updating the stats
    checkQuests();


    saveStats();

    updateMenuStats();


    gameStats.style.display =
        "block";


    gameApples.textContent =
        score;


    gameTrophies.textContent =
        won
        ? "+30"
        : "0";


    // Kills from this game
    gameKillsElement.textContent =
        playersEaten -
        startingKills;


    menuStats.style.display =
        "none";


    if (won) {

        overlayTitle.textContent =
            "You Won!";

        gameState =
            "won";

    } else {

        overlayTitle.textContent =
            "Game Over";

        gameState =
            "gameOver";
    }


    playButton.textContent =
        "Play Again";


    menuButton.style.display =
        "block";


    mainMenu.style.display =
        "block";
}


// =========================
// CHECK FOR WIN
// =========================

function checkForWin() {

    // Only check while playing
    if (
        gameState !==
        "playing"
    ) {

        return;
    }


    // Player reaches 3000
    if (
        score >=
        3000
    ) {

        endGame(true);

        return;
    }


    // AI reaches 3000
    for (let ai of ais) {

        if (
            ai.alive &&
            ai.score >= 3000
        ) {

            endGame(false);

            return;
        }
    }


    // All AIs are dead
    let aisRemaining =
        0;


    for (let ai of ais) {

        if (ai.alive) {

            aisRemaining++;
        }
    }


    if (
        aisRemaining ===
        0
    ) {

        endGame(true);
    }
}


// =========================
// UPDATE
// =========================

function update() {

    if (
        gameState ===
        "playing"
    ) {

        movePlayer();

        checkFoodCollision();

        checkSpecialAppleCollision();

        checkPlayerAICollision();

        checkAISpecialAppleCollision();

        spawnSpecialApples();

        updateSpecialAppleTimers();
    }


    moveAIs();

    checkAIFoodCollision();

    checkAIAndAICollision();

    updateCamera();

    checkForWin();
}


// =========================
// WORLD TO SCREEN
// =========================

function worldToScreen(
    x,
    y
) {

    return {

        x:
            x - cameraX,

        y:
            y - cameraY
    };
}


// =========================
// DRAW MAP
// =========================

function drawMap() {

    ctx.fillStyle =
        "#163d24";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


// =========================
// DRAW CIRCLE
// =========================

function drawCircle(
    x,
    y,
    radius,
    color
) {

    ctx.fillStyle =
        color;


    ctx.beginPath();


    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );


    ctx.fill();
}


// =========================
// DRAW PLAYER
// =========================

function drawPlayer() {

    if (
        !player.alive ||
        gameState !==
        "playing"
    ) {

        return;
    }


    // Invisible player
    if (
        invisibilityTimer >
        0
    ) {

        return;
    }


    const screen =
        worldToScreen(
            player.x,
            player.y
        );


    drawCircle(
        screen.x,
        screen.y,
        player.radius,
        "blue"
    );


    // Shield visual
    if (shield) {

        ctx.strokeStyle =
            "cyan";

        ctx.lineWidth =
            5;


        ctx.beginPath();


        ctx.arc(
            screen.x,
            screen.y,
            player.radius + 8,
            0,
            Math.PI * 2
        );


        ctx.stroke();
    }
}


// =========================
// DRAW AIS
// =========================

function drawAIs() {

    for (let ai of ais) {

        if (!ai.alive) {

            continue;
        }


        // Invisible AI
        if (
            ai.invisibilityTimer >
            0
        ) {

            continue;
        }


        const screen =
            worldToScreen(
                ai.x,
                ai.y
            );


        drawCircle(
            screen.x,
            screen.y,
            ai.radius,
            ai.color
        );


        // AI shield visual
        if (ai.shield) {

            ctx.strokeStyle =
                "cyan";

            ctx.lineWidth =
                4;


            ctx.beginPath();


            ctx.arc(
                screen.x,
                screen.y,
                ai.radius + 7,
                0,
                Math.PI * 2
            );


            ctx.stroke();
        }
    }
}


// =========================
// DRAW FOOD
// =========================

function drawFood() {

    ctx.fillStyle =
        "red";


    for (
        let food of foods
    ) {

        const screenX =
            food.x -
            cameraX;

        const screenY =
            food.y -
            cameraY;


        if (
            screenX +
            food.radius <
            0 ||

            screenX -
            food.radius >
            canvas.width ||

            screenY +
            food.radius <
            0 ||

            screenY -
            food.radius >
            canvas.height
        ) {

            continue;
        }


        drawCircle(
            screenX,
            screenY,
            food.radius,
            "red"
        );
    }
}


// =========================
// DRAW SPECIAL APPLES
// =========================

function drawSpecialApples() {

    for (
        let apple of
        specialApples
    ) {

        if (!apple.active) {

            continue;
        }


        const screen =
            worldToScreen(
                apple.x,
                apple.y
            );


        let color =
            "gold";


        if (
            apple.type ===
            "silver"
        ) {

            color =
                "silver";
        }


        if (
            apple.type ===
            "blue"
        ) {

            color =
                "deepskyblue";
        }


        if (
            apple.type ===
            "invisibility"
        ) {

            color =
                "violet";
        }


        // Glow
        ctx.beginPath();


        ctx.arc(
            screen.x,
            screen.y,
            apple.radius + 5,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            color;

        ctx.globalAlpha =
            0.25;


        ctx.fill();


        ctx.globalAlpha =
            1;


        // Apple
        drawCircle(
            screen.x,
            screen.y,
            apple.radius,
            color
        );


        // Stem
        ctx.fillStyle =
            "brown";


        ctx.fillRect(
            screen.x - 2,
            screen.y -
                apple.radius -
                4,
            4,
            6
        );
    }
}


// =========================
// LEADERBOARD
// =========================

function drawLeaderboard() {

    const players =
        [];


    if (player.alive) {

        players.push({

            name:
                "Player",

            score:
                score,

            color:
                "blue"
        });
    }


    for (
        let ai of ais
    ) {

        if (ai.alive) {

            players.push({

                name:
                    ai.name,

                score:
                    ai.score,

                color:
                    ai.color
            });
        }
    }


    players.sort(
        function(a, b) {

            return b.score -
                a.score;
        }
    );


    ctx.font =
        "20px Arial";


    for (
        let i = 0;
        i < players.length;
        i++
    ) {

        ctx.fillStyle =
            players[i].color;


        ctx.fillText(

            (i + 1) +
            ". " +
            players[i].name +
            ": " +
            players[i].score,

            canvas.width -
                220,

            90 +
                i * 25
        );
    }
}


// =========================
// ABILITY INFO
// =========================

function drawAbilityInfo() {

    if (
        gameState !==
        "playing"
    ) {

        return;
    }


    // Ability message
    if (
        abilityMessageTimer >
        0
    ) {

        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 28px Arial";

        ctx.textAlign =
            "center";


        ctx.fillText(

            abilityMessage,

            canvas.width / 2,

            60
        );


        ctx.textAlign =
            "left";
    }


    let timerText =
        "";


    if (
        speedBoostTimer >
        0
    ) {

        timerText +=
            "Speed: " +
            Math.ceil(
                speedBoostTimer / 60
            ) +
            "s";
    }


    if (
        appleBoostTimer >
        0
    ) {

        if (
            timerText !== ""
        ) {

            timerText +=
                "   ";
        }


        timerText +=
            "2X Apples: " +
            Math.ceil(
                appleBoostTimer / 60
            ) +
            "s";
    }


    if (
        invisibilityTimer >
        0
    ) {

        if (
            timerText !== ""
        ) {

            timerText +=
                "   ";
        }


        timerText +=
            "Invisible: " +
            Math.ceil(
                invisibilityTimer / 60
            ) +
            "s";
    }


    if (shield) {

        if (
            timerText !== ""
        ) {

            timerText +=
                "   ";
        }


        timerText +=
            "Shield: READY";
    }


    if (
        timerText !== ""
    ) {

        ctx.fillStyle =
            "white";

        ctx.font =
            "bold 20px Arial";


        ctx.fillText(

            timerText,

            20,

            canvas.height -
                25
        );
    }
}


// =========================
// DRAW
// =========================

function draw() {

    drawMap();

    drawFood();

    drawSpecialApples();

    drawAIs();

    drawPlayer();


    if (
        gameState ===
        "playing"
    ) {

        drawLeaderboard();

        drawAbilityInfo();
    }
}


// =========================
// RESET GAME
// =========================

function resetGame() {

    player.x =
        mapWidth / 2;

    player.y =
        mapHeight / 2;

    player.radius =
        20;

    player.alive =
        true;


    score =
        0;


    // Remember lifetime kills
    // when this game starts
    startingKills =
        playersEaten;


    // Reset player abilities
    speedBoostTimer =
        0;

    appleBoostTimer =
        0;

    invisibilityTimer =
        0;

    shield =
        false;

    abilityMessage =
        "";

    abilityMessageTimer =
        0;


    // Reset special apples
    for (
        let apple of
        specialApples
    ) {

        apple.active =
            false;

        apple.spawned =
            false;
    }


    // Reset AIs
    for (
        let ai of ais
    ) {

        ai.x =
            Math.random() *
            mapWidth;

        ai.y =
            Math.random() *
            mapHeight;

        ai.radius =
            20;

        ai.score =
            0;

        ai.speedBoostTimer =
            0;

        ai.appleBoostTimer =
            0;

        ai.invisibilityTimer =
            0;

        ai.shield =
            false;

        ai.alive =
            true;
    }


    // Reset normal apples
    for (
        let food of foods
    ) {

        respawnFood(
            food
        );
    }


    updateCamera();
}


// =========================
// MENU SETUP
// =========================

menuButton.style.display =
    "none";

gameStats.style.display =
    "none";

menuStats.style.display =
    "block";

mainMenu.style.display =
    "block";

questMenu.style.display =
    "none";


updateMenuStats();

updateQuestCoins();

checkQuests();


// =========================
// QUEST BUTTON
// =========================

questsButton.addEventListener(
    "click",
    function() {

        mainMenu.style.display =
            "none";

        questMenu.style.display =
            "block";

        renderQuests();

        updateQuestCoins();
    }
);


// =========================
// BACK FROM QUESTS
// =========================

backFromQuestsButton.addEventListener(
    "click",
    function() {

        questMenu.style.display =
            "none";

        mainMenu.style.display =
            "block";

        overlayTitle.textContent =
            "Fruits";

        menuStats.style.display =
            "block";

        gameStats.style.display =
            "none";

        updateMenuStats();

        updateQuestCoins();
    }
);


// =========================
// PLAY BUTTON
// =========================

playButton.addEventListener(
    "click",
    function() {

        questMenu.style.display =
            "none";


        resetGame();


        gameState =
            "playing";


        overlayTitle.textContent =
            "Fruits";


        playButton.textContent =
            "Play";


        menuButton.style.display =
            "none";


        gameStats.style.display =
            "none";


        menuStats.style.display =
            "block";


        mainMenu.style.display =
            "none";
    }
);


// =========================
// MAIN MENU BUTTON
// =========================

menuButton.addEventListener(
    "click",
    function() {

        player.alive =
            false;


        gameState =
            "menu";


        overlayTitle.textContent =
            "Fruits";


        playButton.textContent =
            "Play";


        menuButton.style.display =
            "none";


        gameStats.style.display =
            "none";


        menuStats.style.display =
            "block";


        questMenu.style.display =
            "none";


        mainMenu.style.display =
            "block";


        updateMenuStats();

        updateQuestCoins();
    }
);


// =========================
// GAME LOOP
// =========================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );
}


gameLoop();