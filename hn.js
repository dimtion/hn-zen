const STORAGE_KEY = "HN_BACK_NEXT";
const LOCAL_LINKS = "https://news.ycombinator.com/";
const ITEM_PREFIX = "https://news.ycombinator.com/item?id=";

// TODO: Hide comment button
// TODO: Hide comments while loading?

(() => {
  let next_value = localStorage.getItem(STORAGE_KEY);
  if (next_value) {
    localStorage.removeItem(STORAGE_KEY);

    // Avoid creating a new micro task so that the browser does not
    // deduplicate Events
    const channel = new MessageChannel();
    channel.port1.onmessage = () => {
      window.location.href = next_value;
    };
    channel.port2.postMessage("");

    return;
  }

  let outLinks = new Map();
  for (let link of document.querySelectorAll(".titleline > a")) {
    outLinks.set(link.href, link.parentElement.parentElement.parentElement.id);
  }

  document.addEventListener("click", e => {
    let target = e.target || e.srcElement;
    if (target.tagName !== "A") {
      return;
    }

    let id = outLinks.get(target.href);
    if (!id) {
      return;
    }


    localStorage.setItem(STORAGE_KEY, target.href);
    window.location.href = `${ITEM_PREFIX}${id}`;

    e.preventDefault();
    return false;
  });
})();
