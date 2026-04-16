/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// ========== 修改为本地路径 ==========
const live2d_path = "/live2d-widget/dist/";
// =================================

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;

    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    }
    else if (type === 'js') {
      tag = document.createElement('script');
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

(async () => {
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;

  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);

  initWidget({
    waifuPath: "/live2d-widget/waifu-tips.json",  // 指向本地 JSON
    cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
    cubism2Path: "/live2d-widget/lib/live2d.min.js",  // 指向本地核心库
    tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
    drag: true,
    debug: false
  });
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');