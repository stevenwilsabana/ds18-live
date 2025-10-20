let selector = 'button.gm-control-active[aria-label="Zoom out"]';
let maxClicks = 4;

function clickZoomOutButton() {
  const button = document.querySelector(selector);
  if (!button) return;

  let clicks = 0;
  const interval = setInterval(() => {
    button.click();
    clicks++;
    if (clicks >= maxClicks) clearInterval(interval);
  }, 300);
}

const buttonNow = document.querySelector(selector);
if (buttonNow) {
  clickZoomOutButton();
} else {

  const observer = new MutationObserver(() => {
    const button = document.querySelector(selector);
    if (button) {
      observer.disconnect();
      clickZoomOutButton();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
