const ITEM_PREFIX = "https://news.ycombinator.com/item?id=";

const hnPrimitives = {
  localLinks: "https://news.ycombinator.com/",
  hidePointsCss: "\n#hnmain .subtext .subline > span:first-child { display: none }",
  hideCommentsCss: "\n#hnmain .subtext .subline > .clicky + a { display: none }",
  getLinks: () => {
    let outLinks = new Map();
    for (let link of document.querySelectorAll(".titleline > a")) {
      const item = `${ITEM_PREFIX}${link.parentElement.parentElement.parentElement.id}`;
      outLinks.set(link.href, item);
    }
    return outLinks;
  },
};

init(hnPrimitives);
