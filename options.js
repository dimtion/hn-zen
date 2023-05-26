if (typeof browser === "undefined") {
    browser = chrome;
}

const saveOptions = (e) => {
  browser.storage.sync.set({
    hideComments: document.querySelector("#hide-comments").checked,
    hidePoints: document.querySelector("#hide-points").checked,
  });

  e.preventDefault();
}

const restoreOptions = () => {
  let storageItem = browser.storage.sync.get();
  storageItem.then((res) => {
    document.querySelector("#hide-comments").checked = res.hideComments;
    document.querySelector("#hide-points").checked = res.hidePoints;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#options-form").addEventListener("change", saveOptions);
