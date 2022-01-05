const startBtn = document.getElementById("start")
const newCardBtn = document.getElementById("new-card-btn")
const cardContainer = document.getElementById("card")
const sumEl = document.getElementById("sum-el")
const resetBtn = document.getElementById("reset-btn")
const overlay = document.getElementById("over-lay")
const startOver = document.getElementById("start-over-btn")
let isAlive = true
let hasBlackJack = false
let dataId
const phraseEl = document.getElementById("phrase-el")
let allCards =[]
const cardValues= {
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    JACK: 10,
    QUEEN:10,
    KING:10,
    ACE:11

}

newCardBtn.addEventListener("click", newCard)
startOver.addEventListener("click",reset)


startBtn.addEventListener("click", function(){
    startBtn.style.display = "none"
    start()
})

resetBtn.addEventListener("click", reset)


function start(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json())
    .then(data => {
       console.log(data)
       dataId = data.deck_id
       console.log(dataId)
      
       

    })
    
    overlay.style.display = "none"
    

}

function newCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${dataId}/draw/?count=1`)
        .then(res => res.json())
        .then( data => {
            cardContainer.innerHTML = `<img src="${data.cards[0].image}"/>`
            let drawCard = cardValues[data.cards[0].value]
            allCards.push(drawCard)
            let sum = 0
    
            for(var i = 0; i < allCards.length; i++){
        
                
            sum += allCards[i];
            sumEl.textContent = "Sum: " + sum
            
            }

            if(sum < 21){
                phraseEl.textContent = "Would you like another card?"
                startOver.style.display ="inline-block"
        
        
            } else if (sum === 21){
                phraseEl.textContent = "Congratulations!! You have Black jack"
                hasBlackJack = true
                
            } else{
                phraseEl.textContent ="You lost!! Try again?"
                isAlive = false
            }

            if(isAlive=== false || hasBlackJack===true){
                newCardBtn.style.display = "none"
                startOver.style.display ="none"
                resetBtn.style.display = "inline-block"
                

            }
            
           
        })
       
        
}




function reset(){
    
    sumEl.textContent = ""
    resetBtn.style.display = "none"
    newCardBtn.style.display = "inline-block"
    startOver.style.display ="none"
    allCards = []
    sum = 0
    isAlive = true
    cardContainer.innerHTML = ""
    phraseEl.textContent = "May lady luck be on your side"

    start()

}


