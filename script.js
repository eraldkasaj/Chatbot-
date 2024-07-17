const sendChatBtn = document.querySelector('.send-btn')
const chatInput = document.querySelector('.chat-input textarea')
const chatbox = document.querySelector('.chatbox')
const sendBtn = document.querySelector('.send-btn')
const chatBody = document.querySelector('.chat-body')
const hideBtn = document.querySelector('.hide-btn')
const chat = document.querySelector('.chat')
console.log(chat)

let userMessage;
const apiKey = '121f6fc10emsh346be347fde7b8cp1fa308jsn1eb5b1fafa4a'

const createUserLi = (message) => {

    const chatLi = document.createElement('li')
    chatLi.classList.add('chat-user')
    chatLi.innerHTML = `
    <div class="text-user">${message}</div>
                         `      
    return chatLi
    
}

const createBotLI = (dataBot) => {
    const chatBot = document.createElement('li')
    chatBot.classList.add('chat-bot')
    chatBot.innerHTML = ` <span class="bot-icon"><i class="bi bi-robot"></i></span>
    <div class="text-bot">${dataBot}</div>`
    return chatBot
}



async function generateResponse() {
    const url = 'https://ai-api-textgen.p.rapidapi.com/completions';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ai-api-textgen.p.rapidapi.com'
        },
        body: JSON.stringify({
            text: userMessage
        })
    };
    
    const response = await fetch(url, options)
    dataBot = await response.json()
    console.log(dataBot)
        
     
}


const handleChat = async () => {
    userMessage = chatInput.value.trim()
    if(!userMessage) return

    chatbox.appendChild(createUserLi(userMessage)) 
    chatInput.value='';
    sendBtn.style.color = chatInput.value ? '#0156f9' : 'grey';
   
    const thinkingBotLi = createBotLI('...');
    chatbox.appendChild(thinkingBotLi);
    chatBody.scrollTo(0,chatBody.scrollHeight)

    setTimeout(async () => {

        await generateResponse()
        chatbox.removeChild(thinkingBotLi)
        chatbox.appendChild(createBotLI(dataBot)) 
        chatBody.scrollTo(0,chatBody.scrollHeight)
        console.log(dataBot)
    },600)
}
chatInput.addEventListener('input', () => {
    sendBtn.style.color = chatInput.value ? '#0156f9' : 'grey';
});

sendChatBtn.addEventListener('click',handleChat)


hideBtn.addEventListener('click', () => {
    if (chat.style.display === "none") {
        chat.style.display = "block";
        hideBtn.innerHTML = `<i class="bi bi-x-lg"></i>`
      } else {
        chat.style.display = "none";
        hideBtn.innerHTML = `<i class="bi bi-robot"></i>`
      }
});
