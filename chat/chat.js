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

// スマートフォン対応: ビューポート高さの動的調整
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 初期化時にビューポート高さを設定
setViewportHeight();

// リサイズ時にビューポート高さを再設定
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100);
});

// 最新のチャットフキダシが見える位置にスクロール
function scrollToLatestMessage() {
  setTimeout(() => {
    const chatLog = document.getElementById('chat-log');
    if (chatLog) {
      // 最新メッセージが見える位置にスクロール
      chatLog.scrollTop = chatLog.scrollHeight;
      
      // 入力フォームの上部に最新のフキダシが見えるように調整
      const footer = document.querySelector('footer');
      if (footer) {
        const footerHeight = footer.offsetHeight;
        const chatLogHeight = chatLog.offsetHeight;
        const scrollPosition = chatLog.scrollHeight - chatLogHeight + footerHeight;
        
        // 最新メッセージが入力フォームの上部に見えるようにスクロール
        chatLog.scrollTop = Math.max(0, scrollPosition - 100);
      }
    }
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
  scrollToLatestMessage();
}

function showTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.classList.remove("hidden");
    scrollToLatestMessage();
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

// スマートフォン対応: キーボード表示時の処理
function handleKeyboardVisibility() {
  let initialViewportHeight = window.innerHeight;
  
  window.addEventListener('resize', () => {
    const currentViewportHeight = window.innerHeight;
    const userInput = document.getElementById('user-input');
    
    // キーボードが表示された場合
    if (currentViewportHeight < initialViewportHeight && userInput === document.activeElement) {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 100);
    }
    
    // キーボードが隠された場合
    if (currentViewportHeight > initialViewportHeight) {
      initialViewportHeight = currentViewportHeight;
    }
  });
}

// スマートフォン対応: 入力フィールドの最適化
function optimizeInputField() {
  const userInput = document.getElementById('user-input');
  
  if (userInput) {
    // フォーカス時の処理
    userInput.addEventListener('focus', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 100);
    });
    
    // タッチ時の処理
    userInput.addEventListener('touchstart', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 50);
    });
    
    // クリック時の処理
    userInput.addEventListener('click', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 50);
    });
    
    // 入力中の処理
    userInput.addEventListener('input', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 10);
    });
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

// スマートフォン対応: タッチイベントの最適化
sendButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  sendButton.click();
});

// 初期メッセージを表示
window.addEventListener("load", () => {
  setTimeout(() => {
    appendMessage("こんにちは！朝倉悠真だよ。よろしくね！", "bot");
    step = 0;
  }, 300);
});

// スマートフォン対応: 初期化処理
setTimeout(() => {
  handleKeyboardVisibility();
  optimizeInputField();
}, 500);

// スマートフォン対応: Visual Viewport API
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    scrollToLatestMessage();
  });
}