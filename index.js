import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//https://feedback-app-d5436-default-rtdb.firebaseio.com/

const appSettings = {
    databaseURL: "https://feedback-app-d5436-default-rtdb.firebaseio.com/"
}
console.log("OI")
const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsInDB = ref(database,"comments")
const textareaInput = document.querySelector("textarea")
const nameInput = document.querySelector("input")
const commentsListEl = document.querySelector(".endorsements ul")
console.log(textareaInput)

document.querySelector(".publish-btn").addEventListener("click",() => {

    if(textareaInput.value !== "" && nameInput.value !== "" ) {
    let commentObj = {
        comment: textareaInput.value,
        name:nameInput.value  
    }

    push(commentsInDB,commentObj)
}

})

onValue(commentsInDB,(snapshot) => {
    commentsListEl.innerHTML = ""
    let commentsArray = Object.entries(snapshot.val())
    commentsArray.map(item => {
        appendNewComment(item)
    })
   
    
})

function appendNewComment(obj) {
    const {comment,name} = obj[1]
    let newEl = document.createElement("li")
    newEl.innerHTML = `<p>${comment}</p> <h3>${name}</h3>`
    commentsListEl.append(newEl)
    
}