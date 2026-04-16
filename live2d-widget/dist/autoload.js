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

  try {
    // 加载 CSS
    await loadExternalResource(live2d_path + 'waifu.css', 'css');
    console.log('CSS loaded');
    
    // 加载 waifu-tips.js
    await loadExternalResource(live2d_path + 'waifu-tips.js', 'js');
    console.log('waifu-tips.js loaded');
    
    // 检查 window.initWidget
    let retries = 0;
    const maxRetries = 20;
    
    const checkInitWidget = setInterval(() => {
      if (typeof window.initWidget === 'function') {
        clearInterval(checkInitWidget);
        window.initWidget({
          waifuPath: live2d_path + "waifu-tips.json",
          cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
          cubism2Path: live2d_path + "live2d.min.js",
          tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
          drag: true,
          debug: true  // 开启调试模式
        });
        console.log('initWidget called');
      } else {
        retries++;
        if (retries >= maxRetries) {
          clearInterval(checkInitWidget);
          console.error('waifu-tips.js exports: ', Object.keys(window));
        }
      }
    }, 100);
  } catch (error) {
    console.error('Live2D Widget loading error:', error);
  }
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');