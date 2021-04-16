#JS
minify ./scripts/common.js ./scripts/404.js > ./static/js/404.min.js
minify ./scripts/common.js ./scripts/index.js > ./static/js/index.min.js
minify ./scripts/common.js ./scripts/post.js > ./static/js/post.min.js
#CSS
minify ./scripts/common.css > ./static/css/404.min.css
minify ./scripts/common.css ./scripts/index.css > ./static/css/index.min.css
minify ./scripts/common.css ./scripts/post.css > ./static/css/post.min.css

