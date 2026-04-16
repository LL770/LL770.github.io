/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

const live2d_path = "/live2d-widget/dist/";

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
    else if (type === 'module') {
      tag = document.createElement('script');
      tag.type = 'module';
      tag.src = url;
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
    console.log('✅ CSS loaded');
    
    // 以模块方式加载 waifu-tips.js
    await loadExternalResource(live2d_path + 'waifu-tips.js', 'module');
    console.log('✅ waifu-tips.js loaded as module');
    
    // 动态导入并调用
    const module = await import(live2d_path + 'waifu-tips.js');
    // 模块导出的 initWidget 函数
    if (module.initWidget) {
      module.initWidget({
        waifuPath: live2d_path + "waifu-tips.json",
        cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
        cubism2Path: live2d_path + "live2d.min.js",
        tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
        drag: true,
        debug: true
      });
      console.log('✅ initWidget called from module');
    } else {
      console.error('initWidget not found in module');
    }
  } catch (error) {
    console.error('Live2D Widget loading error:', error);
  }
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');