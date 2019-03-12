const { src, dest, parallel } = require('gulp');
const markdownDocs = require('gulp-markdown-docs');

function format_markdown() {
  return src("./decision-logs/**/*.md")
    .pipe(markdownDocs('index.html', {
      markdown: {
        gfm: true
      }
    }))
    .pipe(dest("./decision-logs"))
}

exports.format_markdown = format_markdown;
exports.default = parallel(format_markdown);
