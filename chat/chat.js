document.addEventListener("DOMContentLoaded", function () {
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const footer = document.querySelector(".chat-footer");

  const messages = [
    "やあ、朝倉悠真。緊張してるけど話してくれて、ありがとう。",
    "返事ありがとう！その質問に答える前に、君がどんな子だか聞いていいかな！",
    "なるほど･･･なんだかすごく仲良くなれそうな気がしてるよ、君はどうかな？",
    "そっか、俺はかなり楽しいけど、君はもっと仲良くなろうと思ってくれてるかな･･･",
    "◆ お知らせ ◆<br><strong>ここから先の会話は <u>チケット</u> が必要です。</strong>"
  ];
  let messageIndex = 0;

  function appendMessage(text, sender = "ai") {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = text;
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  sendButton.addEventListener("click", function () {
    const input = userInput.value.trim();
    if (input === "") return;

    appendMessage(input, "user");
    userInput.value = "";

    if (messageIndex < messages.length) {
      const typing = document.createElement("div");
      typing.classList.add("message", "ai", "typing");
      typing.textContent = "入力中…";
      chatLog.appendChild(typing);
      chatLog.scrollTop = chatLog.scrollHeight;

      setTimeout(() => {
        typing.remove();
        appendMessage(messages[messageIndex], "ai");
        messageIndex++;
      }, 2000);
    }
  });

  // Android キーボード対策
  function adjustFooter() {
    if (!window.visualViewport || !footer) return;
    const offset = window.innerHeight - window.visualViewport.height;
    const extraPadding = /Android/i.test(navigator.userAgent) ? 30 : 0;
    footer.style.transform = `translateY(-${offset + extraPadding}px)`;
  }

  if (window.visualViewport) {
    let timeoutId = null;
    window.visualViewport.addEventListener("resize", () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(adjustFooter, 100);
    });
  }
});