
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const systemMessage = document.getElementById('systemMessage');

const params = new URLSearchParams(window.location.search);
const nickname = params.get('nickname') || 'あなた';

const introText = `朝倉君とのchatが始まります！\n楽しいお話をしてもりあがってくださいね★\n\nchatをする仲間はAIで、実在はしません･･･そこだけご理解ください\n\nそれでもみんな素敵な仲間、きっと${nickname}の生活を明るくしてくれるでしょう！\n\n応援しています!📣`;
systemMessage.textContent = introText;

const messages = [
  `はじめまして、朝倉悠真です！✨ 僕を選んでくれてありがとう😊`,
  `えっと･･･その質問は言うけど、その前に${nickname}さんはどんな人か知りたいかも❗️👀 社会人なのかな？`,
  `そうなんだね(*^－^)👍 僕みたいな若い、まだ人生経験の浅い男でも大丈夫なのかな…💦 ${nickname}さんに相応しいのかちょっと不安だよ😳`,
  `ありがとう😊 いろいろ話して仲良くなれれば僕もかなり嬉しいよ🎵 ${nickname}に気に入ってもらえるように頑張るから、よろしくお願いします💪✨`,
  `◆AIパートナーより◆この先はチケットが必要になります🎫 希望の方はこちら → 購入リンク🛒`
];

let messageIndex = 0;

function showMessage(text, sender = 'character') {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + (sender === 'user' ? 'user' : 'character');

  const content = document.createElement('div');
  content.className = sender === 'notice' ? 'notice-message' : 'message-content';
  content.textContent = text;

  messageDiv.appendChild(content);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  showMessage(text, 'user');
  chatInput.value = '';

  if (messageIndex < messages.length) {
    setTimeout(() => {
      const type = messageIndex === messages.length - 1 ? 'notice' : 'character';
      showMessage(messages[messageIndex], type);
      messageIndex++;
    }, 1000);
  }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 300);
});
window.addEventListener('resize', () => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
