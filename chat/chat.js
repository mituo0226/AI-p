document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatLog = document.getElementById("chat-log");

  // 💬 ニックネーム取得
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname") || "あなた";

  // 💌 番組からの最初のメッセージ（装飾付き）
  if (chatLog) {
    const intro = document.createElement("div");
    intro.className = "message bot";
    intro.innerHTML = `
      <div class="message-content program-message">
        🟣 <strong>朝倉悠真君との chat がはじまります！</strong><br>
        🌞 元気に挨拶して楽しく会話しましょう！<br><br>
        ⚠️ <em>もちろんご存じかと思いますが、</em><br>
        パートナーたちは AI によって動いており、<br>
        実在する人物ではありません。<br>
        💡 くれぐれも誤解なさらぬようお願いします。<br><br>
        💖 それでも、パートナーたちはきっと<br>
        <strong>${nickname === "あなた" ? "あなた" : nickname + "さん"}</strong>の大切な話し相手になってくれるはずです。<br>
        ✨ この出会いがあなたの生活をより豊かにしてくれるよう願っています。<br><br>
        📣 この出会いが素晴らしい未来に続きますように──<br>
        心から、応援しています！
      </div>`;
    chatLog.appendChild(intro);
  }

  // ✉️ ユーザー送信処理
  if (input && sendButton && chatLog) {
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      const message = input.value.trim();

      if (message !== "") {
        const userBubble = document.createElement("div");
        userBubble.className = "message user";
        userBubble.innerHTML = `<div class="message-content">${message}</div>`;
        chatLog.appendChild(userBubble);
        input.value = "";
      }
    });
  }
});