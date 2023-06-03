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
            console.log(commentsArray)

})
/* commentsArray.map(item => {
            appendNewComment(item)
        })*/
function appendNewComment(obj) {
    const {comment,name} = obj[1]
    let newEl = document.createElement("li")
    newEl.innerHTML = `<p>${comment}</p> <h3>${name}</h3>`
   // commentsListEl.append(newEl)
   
    commentsArrEl.unshift({newEl})
    commentsListEl.innerHTML = `<li><p>${comment}</p> <h3>${name}</h3></li>`
   
    if(atualComment < commentsArray.length ) {
    setTimeout(() => {
        if (atualComment == commentsArray.length - 1) {
            atualComment = -1
            console.log("Opa")
        }
     
        nextComment()
        
        
    },7000)
}
   
    console.log(atualComment)
    console.log(comment)
}
document.querySelector("#arrow-rigth").addEventListener("click",() => {
    nextComment()
})
document.querySelector("#arrow-left").addEventListener("click",() => {
    previousComment()
})

function nextComment() {
    if(atualComment < commentsArray.length - 1) {
        atualComment++
        appendNewComment(commentsArray[atualComment])
  
    }
}
function previousComment() {
    if(atualComment > 0) {
        atualComment--
        appendNewComment(commentsArray[atualComment])
   
    }
}

