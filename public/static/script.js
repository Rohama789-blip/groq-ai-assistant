const API_URL = "";

const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendBtn");
const clearButton = document.getElementById("clearChat");

const modeButtons = document.querySelectorAll(".mode-btn");
const exampleButtons = document.querySelectorAll(".example-btn");
const modeDescription = document.getElementById("modeDescription");

let currentMode = "basic";


async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    messageInput.value = "";

    const typing = addTyping();

    try {

        const response = await fetch(`${API_URL}/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                mode: currentMode
            })

        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        typing.remove();

        addMessage(
            data.response ||
            data.message ||
            "No response received.",
            "assistant"
        );

    } catch (error) {

        console.error("Error:", error);

        typing.remove();

        addMessage(
            "Sorry, something went wrong. Please try again.",
            "assistant"
        );
    }
}


function addMessage(text, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.className = `message ${sender}`;

    const avatar = sender === "user" ? "👤" : "🤖";

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>

        <div class="message-content">
            ${formatMessage(text)}
        </div>
    `;

    chatContainer.appendChild(messageDiv);

    scrollToBottom();
}


function formatMessage(text) {

    let formatted = String(text);

    formatted = formatted
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    formatted = formatted.replace(
        /`([^`\r\n]*)`/g,
        "<code>$1</code>"
    );

    formatted = formatted.replace(
        /\n/g,
        "<br>"
    );

    return formatted;
}


function addTyping() {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message assistant";

    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>

        <div class="message-content">

            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    `;

    chatContainer.appendChild(messageDiv);

    scrollToBottom();

    return messageDiv;
}


function scrollToBottom() {

    chatContainer.scrollTop =
        chatContainer.scrollHeight;
}


async function clearChat() {

    try {

        await fetch(`${API_URL}/clear`, {
            method: "POST"
        });

    } catch (error) {

        console.error(error);

    }

    chatContainer.innerHTML = "";

    addMessage(
        "Hello! 👋 How can I help you today?",
        "assistant"
    );
}


/* =========================================================
   CHAT MODE BUTTONS
   ========================================================= */

modeButtons.forEach(button => {

    button.addEventListener("click", function() {

        modeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        currentMode = this.dataset.mode;

        if (currentMode === "rag") {

            modeDescription.textContent =
                "Ask questions directly from your knowledge document.";

        } else {

            modeDescription.textContent =
                "Ask anything and have a natural AI conversation.";

        }

    });

});


/* =========================================================
   EXAMPLE BUTTONS
   ========================================================= */

exampleButtons.forEach(button => {

    button.addEventListener("click", function() {

        messageInput.value =
            this.textContent.trim();

        messageInput.focus();

    });

});


/* =========================================================
   SEND BUTTON
   ========================================================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );

}


/* =========================================================
   CLEAR BUTTON
   ========================================================= */

if (clearButton) {

    clearButton.addEventListener(
        "click",
        clearChat
    );

}


/* =========================================================
   ENTER KEY
   ========================================================= */

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}
