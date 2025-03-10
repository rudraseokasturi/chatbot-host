// ChatGPT-powered chatbot for website

const chatWidget = document.createElement("div");
chatWidget.id = "chat-widget";
chatWidget.innerHTML = `
    <style>
        #chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            height: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #chat-header {
            background: #0078ff;
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
        }
        #chat-body {
            flex: 1;
            padding: 10px;
            overflow-y: auto;
        }
        #chat-input {
            display: flex;
            border-top: 1px solid #ddd;
        }
        #chat-input input {
            flex: 1;
            border: none;
            padding: 10px;
        }
        #chat-input button {
            background: #0078ff;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
        }
    </style>
    <div id="chat-header">Ask Jo</div>
    <div id="chat-body"></div>
    <div id="chat-input">
        <input type="text" id="chat-message" placeholder="Type a message..." />
        <button onclick="sendMessage()">Send</button>
    </div>
`;
document.body.appendChild(chatWidget);

async function sendMessage() {
    const inputField = document.getElementById("chat-message");
    const message = inputField.value.trim();
    if (!message) return;

    displayMessage("You", message);
    inputField.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "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"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{"role": "system", "content": "You are a friendly chatbot that provides emotional support to Gen Z users."},
                       {"role": "user", "content": message}]
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    displayMessage("Bot", botMessage);
}

function displayMessage(sender, text) {
    const chatBody = document.getElementById("chat-body");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}
