
// Android Chrome対応: ビューポート高さの動的調整
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // 入力エリアが確実に表示されるように調整
  const chatContainer = document.querySelector('.chat-container');
  const chatLog = document.getElementById('chat-log');
  const footer = document.querySelector('footer');
  
  if (chatContainer && chatLog && footer) {
    const containerHeight = window.innerHeight;
    const headerHeight = document.querySelector('header').offsetHeight;
    const footerHeight = footer.offsetHeight;
    const availableHeight = containerHeight - headerHeight - footerHeight;
    
    // チャットログの最小高さを確保
    chatLog.style.minHeight = `${Math.max(200, availableHeight * 0.6)}px`;
  }
}

// 初期化時にビューポート高さを設定
setViewportHeight();

// リサイズ時にビューポート高さを再設定
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100);
});

// Android Chrome対応: タッチイベントの最適化
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('touchmove', function() {}, {passive: true});

// 入力エリアが確実に表示されるようにスクロール調整
function ensureInputVisible() {
  const footer = document.querySelector('footer');
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}

// チャットの最新会話画面に推移する動き
function scrollToLatestMessage() {
  const chatLog = document.getElementById('chat-log');
  if (chatLog) {
    // スムーズに最新メッセージまでスクロール
    chatLog.scrollTo({
      top: chatLog.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// メッセージ入力開始時の動作
function adjustViewForInput() {
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');
  
  if (userInput && chatLog) {
    // 入力フィールドにフォーカスが当たった時の処理
    userInput.addEventListener('focus', () => {
      // チャットの最新会話画面に推移
      setTimeout(() => {
        scrollToLatestMessage();
      }, 100);
    });
    
    // 入力フィールドにタッチした時の処理
    userInput.addEventListener('touchstart', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 50);
    });
    
    // 入力フィールドをクリックした時の処理
    userInput.addEventListener('click', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 50);
    });
    
    // 入力中にリアルタイムで最新位置に推移
    userInput.addEventListener('input', () => {
      setTimeout(() => {
        scrollToLatestMessage();
      }, 10);
    });
  }
}

// キーボード表示時の処理
function handleKeyboardVisibility() {
  let initialViewportHeight = window.innerHeight;
  
  window.addEventListener('resize', () => {
    const currentViewportHeight = window.innerHeight;
    const userInput = document.getElementById('user-input');
    const chatLog = document.getElementById('chat-log');
    
    // キーボードが表示された場合
    if (currentViewportHeight < initialViewportHeight && userInput === document.activeElement) {
      setTimeout(() => {
        if (chatLog) {
          // チャットの最新会話画面に推移
          scrollToLatestMessage();
        }
      }, 100);
    }
    
    // キーボードが隠された場合
    if (currentViewportHeight > initialViewportHeight) {
      initialViewportHeight = currentViewportHeight;
    }
  });
}

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
  
  // メッセージ追加後に最新会話画面に推移
  setTimeout(() => {
    scrollToLatestMessage();
  }, 50);
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
  
  // タイピング表示時に最新会話画面に推移
  setTimeout(() => {
    scrollToLatestMessage();
  }, 50);
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
  
  // メッセージ送信後に最新会話画面に推移
  setTimeout(() => {
    scrollToLatestMessage();
  }, 100);
  
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

// 初期化時にメッセージ入力時の表示調整を設定
setTimeout(() => {
  adjustViewForInput();
  handleKeyboardVisibility();
}, 500);

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
