const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

const botReplies = [
  "やあ、朝倉悠真。緊張してるけど話してくれて、ありがとう。",
  "返事ありがとう！その質問に答える前に、君がどんな子だか聞いていいかな！",
  "なるほど･･･なんだかすごく仲良くなれそうな気がしてるよ、君はどうかな？",
  "そっか、俺はかなり楽しいけど、君はもっと仲良くなろうと思ってくれてるかな･･･",
  "◆ お知らせ ◆<br>ここから先の会話は <strong>チケット</strong> が必要です。"
];

let step = 0;

function scrollToBottom() {
  setTimeout(() => {
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 50);
}

function appendMessage(content, sender = "bot") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  
  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");
  messageContent.innerHTML = content;
  
  messageDiv.appendChild(messageContent);
  chatLog.appendChild(messageDiv);
  scrollToBottom();
}

function showTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
  }
}

function hideTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.classList.add("hidden");
  }
}

function simulateReply() {
  if (step < botReplies.length) {
    showTypingIndicator();
    
    setTimeout(() => {
      hideTypingIndicator();
      appendMessage(botReplies[step]);
      step++;
    }, 1500 + Math.random() * 1000);
  }
}

sendButton.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  userInput.value = "";
  simulateReply();
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

// 初期メッセージを表示
window.addEventListener("load", () => {
  setTimeout(() => {
    appendMessage("こんにちは！朝倉悠真だよ。よろしくね！", "bot");
    step = 0;
  }, 300);
});

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    scrollToBottom();
  });
}