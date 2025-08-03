
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

function showMessage(text, sender = 'user') {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + sender;
  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;
  messageDiv.appendChild(content);
  chatMessages.appendChild(messageDiv);
  content.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// タイピング演出（省略可能）
function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'message character';
  typing.id = 'typing';
  const dots = document.createElement('div');
  dots.className = 'message-content';
  dots.textContent = '...';
  typing.appendChild(dots);
  chatMessages.appendChild(typing);
  dots.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideTypingIndicator() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

// 初期ロードでキャラが話しかける
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      showMessage("はじめまして、朝倉悠真です！✨ 僕を選んでくれてありがとう😊", 'character');
    }, 1600);
  }, 1000);
});

sendButton.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  showMessage(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      showMessage("ありがとう！いろいろ話して仲良くなれれば僕もかなり嬉しいよ😊", 'character');
    }, 1600);
  }, 1000);
});
