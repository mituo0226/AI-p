
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

function appendMessage(content, sender = "bot") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  
  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");
  messageContent.innerHTML = content;
  
  messageDiv.appendChild(messageContent);
  chatLog.appendChild(messageDiv);
  
  // スムーズスクロール
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "bot", "typing");
  typingDiv.id = "typing-indicator";
  
  const typingContent = document.createElement("div");
  typingContent.classList.add("message-content");
  
  const typingDots = document.createElement("div");
  typingDots.classList.add("typing-dots");
  typingDots.innerHTML = '<span></span><span></span><span></span>';
  
  typingContent.appendChild(typingDots);
  typingDiv.appendChild(typingContent);
  chatLog.appendChild(typingDiv);
  
  chatLog.scrollTop = chatLog.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
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

// 初期メッセージを表示
setTimeout(() => {
  appendMessage("こんにちは！朝倉悠真だよ。よろしくね！", "bot");
  step = 0;
}, 500);

sendButton.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;
  
  appendMessage(text, "user");
  userInput.value = "";
  
  // 少し遅延させてから返信
  setTimeout(() => {
    simulateReply();
  }, 500);
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

// 入力フィールドにフォーカス
userInput.focus();

// タッチデバイス対応
sendButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  sendButton.click();
});

// メッセージの長さに応じてアニメーション時間を調整
function getTypingDuration(text) {
  const baseTime = 1000;
  const charTime = 50;
  return Math.min(baseTime + (text.length * charTime), 3000);
}
