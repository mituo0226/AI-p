
// JS for setting --vh to fix iOS Chrome 100vh bugs
function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', updateViewportHeight);
window.addEventListener('load', updateViewportHeight);
