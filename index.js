import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//https://feedback-app-d5436-default-rtdb.firebaseio.com/

const appSettings = {
    databaseURL: "https://feedback-app-d5436-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsInDB = ref(database,"comments")
const textareaInput = document.querySelector("textarea")
const nameInput = document.querySelector("input")
const commentsListEl = document.querySelector(".endorsements ul")
let commentsArrEl = []
document.querySelector(".publish-btn").addEventListener("click",() => {

    if(textareaInput.value !== "" && nameInput.value !== "" ) {
    let commentObj = {
        comment: textareaInput.value,
        name:nameInput.value  
    }

    push(commentsInDB,commentObj)
}

})
let atualComment = 0
let commentsArray = []
onValue(commentsInDB,(snapshot) => {
    commentsListEl.innerHTML = ""
    commentsArray = Object.entries(snapshot.val())
    commentsArray = commentsArray.reverse()
    appendNewComment(commentsArray[0])
           

})

function appendNewComment(obj) {
    const {comment,name} = obj[1]
    let newEl = document.createElement("li")
    newEl.innerHTML = `<p>${comment}</p> <h3>${name}</h3>`
    commentsArrEl.unshift({newEl})
    commentsListEl.innerHTML = `<li><p>${comment}</p> <h3>${name}</h3></li>`
  
    
 
   // nextComment()
  
    console.log(atualComment)
}

let interval;

document.querySelector("#arrow-rigth").addEventListener("click",() => {
    nextComment()
    clearInterval(myInterval)

 //   clearTimeout(timeOut)
    
})
document.querySelector("#arrow-left").addEventListener("click",() => {
    previousComment()
    clearInterval(myInterval)
})

function next() {
     nextComment()

}
//next()
const myInterval = setInterval(next, 7000);
function nextComment() {
    if(atualComment < commentsArray.length ) {
       
       
    if (atualComment == commentsArray.length - 1) {
        atualComment = -1
    }
}
    atualComment++
    appendNewComment(commentsArray[atualComment])

}

function previousComment() {
    if(atualComment >= 0 ) {
       

  if(atualComment == 0) {
        atualComment = commentsArray.length 
        console.log(atualComment)
      
    }
    atualComment--
    appendNewComment(commentsArray[atualComment])
}
   console.log(atualComment)
    
}