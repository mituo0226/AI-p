
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const chatInputContainer = document.getElementById('chatInputContainer');

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

// Android用：キーボード表示時に入力欄を密着
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const height = window.visualViewport.height;
    const offset = window.innerHeight - height;
    chatInputContainer.style.bottom = offset > 0 ? offset + 'px' : '0px';
  });
}
