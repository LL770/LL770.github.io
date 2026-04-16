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

  // 加载 CSS
  await loadExternalResource(live2d_path + 'waifu.css', 'css');
  
  // 加载 waifu-tips.js 作为普通脚本（不是模块）
  await loadExternalResource(live2d_path + 'waifu-tips.js', 'js');
  
  // 等待 window.initWidget 可用
  if (typeof window.initWidget === 'function') {
    window.initWidget({
      waifuPath: "/live2d-widget/dist/waifu-tips.json",
      cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
      cubism2Path: "/live2d-widget/dist/live2d.min.js",
      tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
      drag: true,
      debug: false
    });
  } else {
    console.error('window.initWidget is not available after loading');
    // 等待一下再试
    setTimeout(() => {
      if (typeof window.initWidget === 'function') {
        window.initWidget({
          waifuPath: "/live2d-widget/dist/waifu-tips.json",
          cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
          cubism2Path: "/live2d-widget/dist/live2d.min.js",
          tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
          drag: true,
          debug: false
        });
      }
    }, 100);
  }
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');