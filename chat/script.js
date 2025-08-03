
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

sendButton.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  showMessage(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    showMessage('はじめまして、朝倉悠真です！✨ 僕を選んでくれてありがとう😊', 'character');
  }, 1200);
});
