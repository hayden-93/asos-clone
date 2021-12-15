const isDev = process.env.NODE_ENV === "development";

module.exports = function (config) {
  config.setQuietMode(!isDev);

  return {
    dir: {
      input: "pages",
      output: "public",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
    dataTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "liquid", "md"],
  };
};
