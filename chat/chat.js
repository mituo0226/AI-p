document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector('.chat-footer');

  function adjustFooter() {
    if (!window.visualViewport || !footer) return;
    const offset = window.innerHeight - window.visualViewport.height;
    const extraPadding = /Android/i.test(navigator.userAgent) ? 30 : 0;
    footer.style.transform = `translateY(-${offset + extraPadding}px)`;
  }

  if (window.visualViewport) {
    let timeoutId = null;
    window.visualViewport.addEventListener('resize', () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(adjustFooter, 100);
    });
  }
});