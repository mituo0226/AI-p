
let responseIndex = 0;
let responses = [];

fetch('asakura_chat.json')
  .then(res => res.json())
  .then(data => {
    responses = data.responses;
  });

document.getElementById('send-button').addEventListener('click', () => {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    if (responseIndex < responses.length) {
      appendMessage('asakura', responses[responseIndex]);
      responseIndex++;
    } else {
      appendMessage('asakura', 'この先の会話は有料プランで続けられるよ。またね。');
    }
  }, 800); // Delay
});

function appendMessage(sender, text) {
  const log = document.getElementById('chat-log');
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.innerText = text;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

function showTypingIndicator() {
  const log = document.getElementById('chat-log');
  const typing = document.createElement('div');
  typing.className = 'message asakura typing';
  typing.id = 'typing-indicator';
  typing.innerText = '入力中...';
  log.appendChild(typing);
  log.scrollTop = log.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}
