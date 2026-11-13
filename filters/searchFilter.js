const elasticlunr = require("elasticlunr");

function plainText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

module.exports = function (collection) {
  const index = elasticlunr(function () {
    this.addField("title");
    this.addField("description");
    this.addField("content");
    this.setRef("id");
    this.saveDocument(true);
  });

  collection.forEach(function (page) {
    const data = page.data || {};
    const title = data.title || page.fileSlug || page.url;
    const content = plainText(page.templateContent || page.content);
    const description = plainText(data.description || content).slice(0, 220);

    index.addDoc({
      id: page.url,
      title: title,
      description: description,
      content: content.toLowerCase(),
    });
  });

  return index.toJSON();
};
