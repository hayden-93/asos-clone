const path = require("path");
const Image = require("@11ty/eleventy-img");

const isDev = process.env.NODE_ENV === "development";

async function imageShortcode(src, alt, className, sizes = "100vw") {
  const imagePath = path.join("src", "img");

  const imageSrc = path.join(imagePath, src);

  const outputDir = path.join("public", "img");

  const meta = await Image(imageSrc, {
    widths: [576, 768, 1024, 1280],
    formats: ["avif", "jpeg", "webp", "svg"],
    outputDir,
    urlPath: "/img/",
    filenameFormat: function (_, src, width, format, __) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    },
  });

  const attributes = {
    alt,
    class: className,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(meta, attributes, {
    whitespaceMode: "inline",
  });
}

module.exports = function (config) {
  config.setQuietMode(!isDev);
  config.addPassthroughCopy({ "src/img": "img" });
  config.addShortcode("image", imageShortcode);
  config.addShortcode("currentYear", function () {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "pages",
      output: "public",
      includes: "fragments",
      layouts: "layouts",
      data: "data",
    },
    dataTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "liquid", "md"],
  };
};
