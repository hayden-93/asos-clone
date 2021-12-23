const path = require("path");
const format = require("date-fns/format");
const Image = require("@11ty/eleventy-img");
const parseISO = require("date-fns/parseISO");

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

  const baseAttributes = { alt, sizes, loading: "lazy", decoding: "async" };

  const attributes = className ? { ...baseAttributes, class: className } : baseAttributes;

  return Image.generateHTML(meta, attributes, {
    whitespaceMode: "inline",
  });
}

module.exports = function (config) {
  config.setQuietMode(!isDev);
  config.addPassthroughCopy({ "src/img": "img" });
  config.addShortcode("image", imageShortcode);
  config.addShortcode("currentYear", () => new Date().getFullYear());
  config.addShortcode("dateFormat", (date, dateFormat) => format(parseISO(date), dateFormat));
  config.addShortcode("logger", (...args) => console.log(args));
  config.addFilter("similarPosts", (collection, page, currentArticle) => {
    const currentCategory = currentArticle.category;
    const posts = collection.filter((post) => {
      console.log(post.data.collections.feed);
      return null;
    });
    // console.log({ page, currentArticle });
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
