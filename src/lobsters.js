const lobstersPrimitives = {
  localLinks: "https://lobste.rs/",
  hidePointsCss: "\n.score { display: none }",
  hideCommentsCss: "\n.comments_label { display: none }",
  getLinks: () => {
    const outLinks = new Map();
    for (const linkContainer of document.querySelectorAll("#inside .details")) {
      console.log(linkContainer);
      const href = linkContainer.querySelector("a.u-url").href;
      const item = linkContainer.querySelector(".byline .comments_label a").href;
      outLinks.set(href, item);
    }
    console.log(outLinks);
    return outLinks;
  },
};

init(lobstersPrimitives);
