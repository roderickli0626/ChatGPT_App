var chatbox = document.getElementById("chatbox");
var questionElement = document.getElementById("default-textarea");

function submitQuestion() {
    var question = questionElement.value.trim().replaceAll("\n", "<br/>");
    if (question == "") return false;
    var myMessage = '<div class="chat is-me"><div class="chat-content"><div class="chat-bubbles"><div class="chat-bubble"><div class="chat-msg">' +
        question +
        '</div></div></div><ul class="chat-meta"><li>Me</li><li>' +
        new Date().toLocaleString() +
        '</li></ul></div></div>';
    chatbox.innerHTML += myMessage;
    questionElement.value = "";
    questionElement.placeholder = "Reply on progress, please wait few moment...";
    questionElement.disabled = true;
    questionElement.setAttribute("title", "Please wait a bit");
    questionElement.style.cursor = "wait";

    var chatbotMessage = '';
    var answer = fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            "prompt": question,
            "max_tokens": 2048,
            "temperature": 0.5,
        })
    }).then((response) => {
        questionElement.disabled = false;
        questionElement.placeholder = "Type your message...";
        questionElement.setAttribute("title", "Please input prompt");
        questionElement.style.cursor = "text";
        response.json().then((data) => {
            chatbox.innerHTML += '<div class="chat is-you"><div class="chat-avatar"><img class="user-avatar bg-transparent" src="http://chat.diix.online/images/avatar/hca.png" /></div><div class="chat-content"><div class="chat-bubbles"><div class="chat-bubble"><div class="chat-msg">' +
                data.choices[0].text.trim().replaceAll("\n", "<br/>") +
                '</div></div></div><ul class="chat-meta"><li>Me</li><li>' +
                new Date().toLocaleString() +
                '</li></ul></div></div>';
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        })
    });
}

document.getElementById("current-time").innerHTML = new Date().toLocaleString();
var input = document.getElementById("default-textarea");
input.addEventListener("keypress", function (e) {
    // If the user presses the "Enter" key on the keyboard
    if (e.key == "Enter" && e.shiftKey) {
    }
    else if (e.key === "Enter") {
        // Cancel the default action, if needed
        e.preventDefault();
        // Trigger the button element with a click
        submitQuestion();
    }
});
