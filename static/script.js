document.addEventListener("DOMContentLoaded", function () {

    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatContainer = document.getElementById("chatContainer");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const clearChat = document.getElementById("clearChat");
    const modeDescription = document.getElementById("modeDescription");

    const modeButtons = document.querySelectorAll(".mode-btn");
    const exampleButtons = document.querySelectorAll(".example-btn");

    let currentMode = "basic";


    // =========================
    // MODE SWITCH
    // =========================

    modeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedMode = button.getAttribute("data-mode");

            if (!selectedMode) {
                return;
            }

            currentMode = selectedMode;

            modeButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            if (currentMode === "rag") {

                modeDescription.textContent =
                    "Ask questions using information from your knowledge document.";

                messageInput.placeholder =
                    "Ask a question from your knowledge document...";

            } else {

                modeDescription.textContent =
                    "Ask anything and have a natural AI conversation.";

                messageInput.placeholder =
                    "Ask me anything...";
            }

            console.log("Selected mode:", currentMode);
        });

    });


    // =========================
    // SEND MESSAGE
    // =========================

    async function sendMessage() {

        const message = messageInput.value.trim();

        if (!message) {
            return;
        }

        welcomeScreen.style.display = "none";
        chatContainer.classList.add("active");

        addMessage("user", message);

        messageInput.value = "";
        autoResize();

        sendBtn.disabled = true;

        const typingMessage = addTyping();

        try {

            const response = await fetch("/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message,
                    mode: currentMode
                })

            });

            const data = await response.json();

            typingMessage.remove();

            if (response.ok && data.reply) {

                addMessage(
                    "assistant",
                    data.reply
                );

            } else {

                addMessage(
                    "assistant",
                    "Error: " + (
                        data.error ||
                        "Something went wrong."
                    )
                );
            }

        } catch (error) {

            console.error("Chat error:", error);

            typingMessage.remove();

            addMessage(
                "assistant",
                "Unable to connect to the Flask server."
            );
        }

        sendBtn.disabled = false;

        messageInput.focus();
    }


    // =========================
    // ADD MESSAGE
    // =========================

    function addMessage(role, text) {

        const messageDiv = document.createElement("div");

        messageDiv.className = "message " + role;


        const avatar = document.createElement("div");

        avatar.className = "message-avatar";

        avatar.textContent =
            role === "user" ? "👤" : "🤖";


        const content = document.createElement("div");

        content.className = "message-content";

        content.innerHTML = formatMessage(text);


        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatContainer.appendChild(messageDiv);

        scrollToBottom();
    }


    // =========================
    // FORMAT MESSAGE
    // =========================

    function formatMessage(text) {

        let formatted = escapeHTML(text);

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


    // =========================
    // ESCAPE HTML
    // =========================

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    // =========================
    // TYPING
    // =========================

    function addTyping() {

        const messageDiv = document.createElement("div");

        messageDiv.className = "message assistant";

        messageDiv.innerHTML =
            '<div class="message-avatar">🤖</div>' +
            '<div class="message-content">' +
            '<div class="typing">' +
            '<span></span>' +
            '<span></span>' +
            '<span></span>' +
            '</div>' +
            '</div>';

        chatContainer.appendChild(messageDiv);

        scrollToBottom();

        return messageDiv;
    }


    // =========================
    // SCROLL
    // =========================

    function scrollToBottom() {

        chatContainer.scrollTop =
            chatContainer.scrollHeight;
    }


    // =========================
    // SEND BUTTON
    // =========================

    if (sendBtn) {

        sendBtn.addEventListener(
            "click",
            function () {
                sendMessage();
            }
        );
    }


    // =========================
    // ENTER KEY
    // =========================

    if (messageInput) {

        messageInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();
                }

            }
        );


        messageInput.addEventListener(
            "input",
            function () {
                autoResize();
            }
        );
    }


    // =========================
    // AUTO RESIZE
    // =========================

    function autoResize() {

        messageInput.style.height = "auto";

        messageInput.style.height =
            Math.min(
                messageInput.scrollHeight,
                130
            ) + "px";
    }


    // =========================
    // EXAMPLE QUESTIONS
    // =========================

    exampleButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                messageInput.value =
                    button.textContent.trim();

                autoResize();

                sendMessage();
            }
        );

    });


    // =========================
    // CLEAR CHAT
    // =========================

    if (clearChat) {

        clearChat.addEventListener(
            "click",
            async function () {

                try {

                    await fetch(
                        "/clear",
                        {
                            method: "POST"
                        }
                    );

                } catch (error) {

                    console.log(
                        "Clear error:",
                        error
                    );
                }


                chatContainer.innerHTML = "";

                chatContainer.classList.remove(
                    "active"
                );

                welcomeScreen.style.display =
                    "flex";

                messageInput.value = "";

                autoResize();

                if (currentMode === "rag") {

                    messageInput.placeholder =
                        "Ask a question from your knowledge document...";

                } else {

                    messageInput.placeholder =
                        "Ask me anything...";
                }

                messageInput.focus();
            }
        );
    }


    // =========================
    // INITIAL STATE
    // =========================

    messageInput.placeholder =
        "Ask me anything...";

    console.log(
        "JavaScript loaded successfully."
    );

    console.log(
        "Mode buttons found:",
        modeButtons.length
    );

});