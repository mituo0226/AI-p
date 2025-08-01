
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
      if (responseIndex === 5) {
        showSystemMessage();
      }
    }
  }, 2200);
});

function appendMessage(sender, text) {
  const log = document.getElementById('chat-log');
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.innerHTML = text;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}

function showTypingIndicator() {
  const log = document.getElementById('chat-log');
  const typing = document.createElement('div');
  typing.className = 'message asakura typing';
  typing.id = 'typing-indicator';
  typing.innerHTML = '<span class="typing-dots">入力中<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
  log.appendChild(typing);
  log.scrollTop = log.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

function showSystemMessage() {
  const log = document.getElementById('chat-log');
  const msg = document.createElement('div');
  msg.className = 'message system';
  msg.innerHTML = `
    <strong>◆ お知らせ ◆</strong><br>
    ここから先の会話は <strong>チケット</strong> が必要です。<br>
    <a href="paid.html" class="ticket-link">▶ チケットの案内はこちら</a>
  `;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}
