// TODO: avoid blinking comments
// TODO: Hide comments while loading

const STORAGE_KEY = "__BACK_NEXT";

const hideElements = (primitives) => {
  let storageItem = browser.storage.sync.get();
  storageItem.then((res) => {
    let innerText = "";
    if (res.hidePoints) {
      innerText += primitives.hidePointsCss;
    }

    if (res.hideComments) {
      innerText += primitives.hideCommentsCss;
    }

    if (innerText.length == 0) {
      return;
    }

    let stylesheet = document.createElement("style")
    stylesheet.innerText = innerText;
    document.head.appendChild(stylesheet);
  });
}

const redirect = () => {
  let next_value = localStorage.getItem(STORAGE_KEY);
  if (!next_value) {
    return false;
  }

  localStorage.removeItem(STORAGE_KEY);

  // Avoid creating a new micro task so that the browser does not
  // deduplicate Events
  const channel = new MessageChannel();
  channel.port1.onmessage = () => {
    window.location.href = next_value;
  };
  channel.port2.postMessage("");

  return true
}

const hookLinks = (primitives) => {
  const outLinks = primitives.getLinks();

  document.addEventListener("click", e => {
    let target = e.target || e.srcElement;
    if (target.tagName !== "A") {
      return;
    }

    if (target.href.startsWith(primitives.localLinks)) {
      return;
    }

    let item = outLinks.get(target.href);
    if (!item) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, target.href);
    window.location.href = item;

    e.preventDefault();
    return false;
  });
};

const init = (primitives) => {
  hideElements(primitives);

  if (redirect()) {
    return;
  }

  hookLinks(primitives);
}
