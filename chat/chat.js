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

  setTimeout(() => {
    if (responseIndex < responses.length) {
      appendMessage('asakura', responses[responseIndex]);
      responseIndex++;
    } else {
      appendMessage('asakura', 'この先の会話は有料プランで続けられるよ。またね。');
    }
  }, 500);
});

function appendMessage(sender, text) {
  const log = document.getElementById('chat-log');
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.innerText = text;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;
}
