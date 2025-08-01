// 番組からの最初のメッセージ
document.addEventListener("DOMContentLoaded", () => {
  const chatLog = document.getElementById("chat-log");
  if (chatLog) {
    const intro = document.createElement("div");
    intro.className = "message bot";
    intro.innerHTML = `
      <div class="message-content program-message">
        朝倉悠真君とのchatがはじまります！<br>
        元気に挨拶して楽しく会話しましょう<br><br>
        そして、解っているとは思いますが、パートナーたちはAIであって実在する人間ではありません。<br>
        くれぐれも勘違いしないようにしてください。<br><br>
        それでもパートナーたちはきっと、[[UNICK]]さんの大切な話し相手になってくれるはず！<br>
        この出会いがきっとあなたの生活をより楽しくしてくれるはずです。<br><br>
        この出会いが素晴らしい未来に続きますように、応援しています！
      </div>`;
    chatLog.appendChild(intro);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatLog = document.getElementById("chat-log");

  if (input && sendButton && chatLog) {
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      const message = input.value.trim();

      if (message !== "") {
        // 吹き出し生成
        const div = document.createElement("div");
        div.className = "message user";
        div.innerHTML = `<div class="message-content">${message}</div>`;
        chatLog.appendChild(div);
        input.value = "";

        // 🔽 スマホキーボードを確実に閉じる（ダミーinput方式）
        const dummy = document.createElement("input");
        dummy.setAttribute("type", "text");
        dummy.style.position = "absolute";
        dummy.style.opacity = "0";
        dummy.style.height = "0";
        dummy.style.zIndex = "-9999";
        document.body.appendChild(dummy);
        dummy.focus();
        input.blur();
        setTimeout(() => {
          document.body.removeChild(dummy);
        }, 100);

        // スクロール下部へ
        setTimeout(() => {
          chatLog.scrollTop = chatLog.scrollHeight;
        }, 100);
      }
    });
  }
});

// [[UNICK]] を URLパラメータ nickname に置き換える
function personalizeIntroMessage() {
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname") || "あなた";
  const chatLog = document.getElementById("chat-log");
  if (!chatLog) return;

  const intro = chatLog.querySelector(".message.bot .message-content");
  if (intro) {
    intro.innerHTML = intro.innerHTML.replaceAll("[[UNICK]]", nickname);
  }
}

document.addEventListener("DOMContentLoaded", personalizeIntroMessage);