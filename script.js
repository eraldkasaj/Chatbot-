const sendChatBtn = document.querySelector('.send-btn')
const chatInput = document.querySelector('.chat-input textarea')

let userMessage;

const handleChat = () => {
    userMessage = chatInput.value.trim()
    if(!userMessage) return


    console.log(userMessage)
}


sendChatBtn.addEventListener('click',handleChat)