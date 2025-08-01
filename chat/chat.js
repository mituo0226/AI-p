document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatLog = document.getElementById("chat-log");

  // [[UNICK]] パラメータ取得
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname") || "あなた";

  // 初期化確認ログ
  console.log("✅ チャット初期化開始");

  // 番組メッセージの表示
  if (chatLog) {
    const intro = document.createElement("div");
    intro.className = "message bot";
    intro.innerHTML = `
      <div class="message-content program-message">
        朝倉悠真君とのchatがはじまります！<br>
        元気に挨拶して楽しく会話しましょう<br><br>
        そして、解っているとは思いますが、パートナーたちはAIであって実在する人間ではありません。<br>
        くれぐれも勘違いしないようにしてください。<br><br>
        それでもパートナーたちはきっと、${nickname}さんの大切な話し相手になってくれるはず！<br>
        この出会いがきっとあなたの生活をより楽しくしてくれるはずです。<br><br>
        この出会いが素晴らしい未来に続きますように、応援しています！
      </div>`;
    chatLog.appendChild(intro);
    chatLog.scrollTop = chatLog.scrollHeight;
  } else {
    console.warn("❌ chatLog 要素が見つかりません");
  }

  // チャット送信処理
  if (input && sendButton && chatLog) {
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      const message = input.value.trim();
      console.log("📤 入力内容:", message);

      if (message !== "") {
        const div = document.createElement("div");
        div.className = "message user";
        div.innerHTML = `<div class="message-content">${message}</div>`;
        chatLog.appendChild(div);
        input.value = "";

        // スマホキーボードを閉じる処理
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
      } else {
        console.log("⚠️ 空メッセージは送信しません");
      }
    });
  } else {
    console.warn("❌ 必要な要素 (input/sendButton/chatLog) のどれかが取得できていません");
  }
});