document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatLog = document.getElementById("chat-log");

  // [[UNICK]] パラメータ取得
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname") || "あなた";

  // 送信画面が確実に表示されるように初期化
  function initializeChatInterface() {
    const footer = document.querySelector('footer');
    if (footer) {
      // 送信画面を確実に表示
      footer.style.display = 'flex';
      footer.style.visibility = 'visible';
      footer.style.opacity = '1';
      footer.style.zIndex = '9999';
    }
  }

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
  }

  // チャット送信処理
  if (input && sendButton && chatLog) {
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      const message = input.value.trim();

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

        setTimeout(() => {
          chatLog.scrollTop = chatLog.scrollHeight;
        }, 100);
      }
    });

    // 入力フィールドのフォーカス時に送信画面を確実に表示
    input.addEventListener("focus", () => {
      initializeChatInterface();
    });

    // タッチ時に送信画面を確実に表示
    input.addEventListener("touchstart", () => {
      initializeChatInterface();
    });

    // クリック時に送信画面を確実に表示
    input.addEventListener("click", () => {
      initializeChatInterface();
    });
  }

  // 初期化時に送信画面を確実に表示
  setTimeout(() => {
    initializeChatInterface();
  }, 100);

  // ビューポート変更時に送信画面を確実に表示
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      initializeChatInterface();
    });
  }

  // リサイズ時に送信画面を確実に表示
  window.addEventListener("resize", () => {
    initializeChatInterface();
  });
});