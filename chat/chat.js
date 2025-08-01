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
  chatLog.scrollTop = chatLog.scrollHeight;
}

function appendMessage(content, sender = "bot") {
  const msg = document.createElement("div");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.innerHTML = content;
  chatLog.appendChild(msg);
  scrollToBottom();
}

function simulateReply() {
  if (step < botReplies.length) {
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
    setTimeout(() => {
      typingIndicator.classList.add("hidden");
      appendMessage(botReplies[step]);
      step++;
    }, 2500 + Math.random() * 1000);
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

// 初回メッセージ表示とスクロール
window.addEventListener("load", () => {
  setTimeout(() => {
    appendMessage(botReplies[step]);
    step++;
  }, 800);
});