const deck = ["+1", "+1", "+1", "+1", "+1", "+1", "+1", "+1", "+2", "+2", "+2", "+2", "+2", "+2", "+2", "+2", "+3", "+3", "+3", "+3", "+3", "+3", "+3", "+3", "-1", "-1", "-2", "-2", "-2", "-3", "-3", "-3", "2x", "2x", "trashPanda", "trashPanda", "trashPanda", "trashPanda", "craftyCrow", "craftyCrow", "craftyCrow", "craftyCrow", "orderEnvy", "orderEnvy", "foodFight", "foodFight", "foodFight", "foodFight", "noBueno", "noBueno", "noBueno", "noBueno", "noBueno", "noBueno", "healthInspector"];
let p1Cards = []
let p2Cards = []
let p3Cards = []
let p4Cards = []
const players = [p1Cards, p2Cards, p3Cards, p4Cards];
let turn = 1
const discard = []
const cards1 = document.getElementById("cards1")
const cards2 = document.getElementById("cards2")
const cards3 = document.getElementById("cards3")
const cards4 = document.getElementById("cards4")
const burrito1 = document.getElementById("burrito1")
const burrito2 = document.getElementById("burrito2")
const burrito3 = document.getElementById("burrito3")
const burrito4 = document.getElementById("burrito4")
const item1 = document.getElementById("item1")
const item2 = document.getElementById("item2")
const item3 = document.getElementById("item3")
const item4 = document.getElementById("item4")
const plus1Button = document.getElementById("plus1Button")
const plus2Button = document.getElementById("plus2Button")
const p1ScoreText = document.getElementById("p1ScoreText")
const p2ScoreText = document.getElementById("p2ScoreText")
const p3ScoreText = document.getElementById("p3ScoreText")
const p4ScoreText = document.getElementById("p4ScoreText")
let p1Score = 0
let p2Score = 0
let p3Score = 0
let p4Score = 0

function updateScore() {
    p1ScoreText.textContent = "Player One's Score: " + p1Score
    p2ScoreText.textContent = "Player Two's Score: " + p2Score
    p3ScoreText.textContent = "Player Three's Score: " + p3Score
    p4ScoreText.textContent = "Player Four's Score: " + p4Score
}

function givePoints(numberOfPoints, playerCards) {
    if (turn == 1) {
        p1Score = p1Score + numberOfPoints
        cards1.textContent = playerCards
    } else if (turn == 2) {
        p2Score = p2Score + numberOfPoints
        cards2.textContent = playerCards
    } else if (turn == 3) {
        p3Score = p3Score + numberOfPoints
        cards3.textContent = playerCards
    } else if (turn == 4) {
        p4Score = p4Score + numberOfPoints
        cards4.textContent = playerCards
    }


}

function giveCard() {
    //Generate a random number to get a random card from array
    let number = Math.floor(Math.random() * deck.length);
    //Remove that card from the array    
    let card = deck.splice(number, 1);
    card = card.toString()

    //Checks who's turn it is
    if (turn === 1) {
        p1Cards.push(card)
        cards1.textContent = p1Cards
        turn++ //Increase the turn
        item1.style.display = "none"
        item2.style.display = "block"
        item3.style.display = "none"
        item4.style.display = "none"

    } else if (turn === 2) {
        p2Cards.push(card)
        cards2.textContent = p2Cards
        turn++ //Increase the turn
        item2.style.display = "none"
        item1.style.display = "none"
        item3.style.display = "block"
        item4.style.display = "none"

    } else if (turn === 3) {
        p3Cards.push(card)
        cards3.textContent = p3Cards
        turn++ //Increase the turn
        item3.style.backgroundColor = "aqua"
        item3.style.display = "none"
        item1.style.display = "none"
        item2.style.display = "none"
        item4.style.display = "block"

    } else if (turn === 4) {
        p4Cards.push(card)
        cards4.textContent = p4Cards
        turn = 1 //Set the turn
        item4.style.display = "none"
        item1.style.display = "block"
        item2.style.display = "none"
        item3.style.display = "none"
    }

}
// 5 cards to each player at the start of the game
for (let i = 1; i <= 20; i++) {
    giveCard();

}
updateScore()

//Give the turn to Player One without giving them another card
item1.style.display = "block"
item4.style.display = "none"
turn = 1



// Add event listeners for the player buttons
document.getElementById("player1Button").addEventListener("click", function() { selectPlayer(1) });
document.getElementById("player2Button").addEventListener("click", function() { selectPlayer(2) });
document.getElementById("player3Button").addEventListener("click", function() { selectPlayer(3) });
document.getElementById("player4Button").addEventListener("click", function() { selectPlayer(4) });

let selectedCardType = ""
let selectedPoints = ""

function playCard(playerCards, cardType, points) {
    let index = -1
    let cardFound = 'false'
    // Checks what index the specified card is
    for (let i = 0; i < playerCards.length; i++) {
        if (playerCards[i] === cardType) {
            index = i;
            cardFound = 'true'
        }
    }
    if (cardFound == 'true') {
        playerCards.splice(index, 1);

        // Show the player selection buttons
        document.getElementById("playerButtons").style.display = "block"
        selectedCardType = cardType
        selectedPoints = points
    } else {
        window.alert("Don't lie!")
    }
}

function selectPlayer(playerNumber) {
    // Hide the player selection buttons
    document.getElementById("playerButtons").style.display = "none";

    // Update the score of the chosen player
    if (playerNumber === 1) {
        p1Score += selectedPoints
    }
    else if (playerNumber === 2) {
        p2Score += selectedPoints
    }
    else if (playerNumber === 3) {
        p3Score += selectedPoints
    }
    else if (playerNumber === 4) {
        p4Score += selectedPoints
    }

    // Update the display for the chosen player
    if (playerNumber === 1) {
        cards1.textContent = players[playerNumber - 1]
    }
    else if (playerNumber === 2) {
        cards2.textContent = players[playerNumber - 1]
    }
    else if (playerNumber === 3) {
        cards3.textContent = players[playerNumber - 1]
    }
    else if (playerNumber === 4) {
        cards4.textContent = players[playerNumber - 1]
    }

    // Adds the card to the discard pile
    discard.push(selectedCardType)
    // Gives a card to the current player and gives the turn to the next player
    giveCard()

    // Reset the selected card type and points
    selectedCardType = ""
    selectedPoints = ""

    // Update the score display
    updateScore();
}

// Example usage with buttons
plus1Button.addEventListener("click", function() {
    playCard(players[turn - 1], "+1", 1)
});
plus2Button.addEventListener("click", function() {
    playCard(players[turn - 1], "+2", 2)
});
plus3Button.addEventListener("click", function() {
    playCard(players[turn - 1], "+3", 3)
});
minus1Button.addEventListener("click", function() {
    playCard(players[turn - 1], "-1", -1)
});
minus2Button.addEventListener("click", function() {
    playCard(players[turn - 1], "-2", -2)
});
minus3Button.addEventListener("click", function() {
    playCard(players[turn - 1], "-3", -3)
});















// LEGACY VERSION
// plus1Button.addEventListener("click", function() {
//     plus1(players[turn - 1]);
//     updateScore();
// })
// plus2Button.addEventListener("click", function() {
//     plus2(players[turn - 1]);
//     updateScore();
// })
// plus3Button.addEventListener("click", function() {
//     plus3(players[turn - 1]);
//     updateScore();
// })


// let index = 0

// function plus1(playerCards) {
//     index = 0
//     let boolean = "false"
//     //Checks what index "+1" is
//     for (let v = -1; v < playerCards.length; v++) {
//         if (playerCards[v] == "+1") {
//             index = v
//             boolean = "true"
//         }
//     }
//     if (boolean == "true") {
//         playerCards.splice(index, 1)
//         //Gives 1 point to player 1
//         givePoints(1, playerCards)
//         //Adds "+1" to the discard pile

//         discard.push("+1")
//         //Gives a card to player 1 and gives the turn to player 2
//         giveCard()
//     } else {
//         window.alert("Don't lie!")
//     }
// }

// function plus2(playerCards) {
//     index = 0
//     let boolean = "false"
//     //Checks what index "+2" is
//     for (let i = -1; i < playerCards.length; i++) {
//         if (playerCards[i] == "+2") {
//             index = i
//             boolean = "true"
//         }
//     }
//     if (boolean == "true") {
//         playerCards.splice(index, 1)
//         //Gives 1 point to player 1
//         givePoints(2, playerCards)
//         //Adds "+2" to the discard pile
//         discard.push("+2")
//         //Gives a card to player 1 and gives the turn to player 2
//         giveCard()
//     } 
//     else {
//         window.alert("Don't lie!")
//     }
// }

// function plus3(playerCards) {
//     index = 0
//     let boolean = "false"
//     //Checks what index "+3" is
//     for (let q = -1; q < playerCards.length; q++) {
//         if (playerCards[q] == "+3") {
//             index = q
//             boolean = "true"
//         }
//     }
//     if (boolean == "true") {
//         playerCards.splice(index, 1)
        
//         //Gives 1 point to player 1
//         givePoints(3, playerCards)
//         //Adds "+2" to the discard pile
//         discard.push("+3")
//         //Gives a card to player 1 and gives the turn to player 2
//         giveCard()
//     } 
//     else {
//         window.alert("Don't lie!")
//     }
// }