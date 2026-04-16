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
    await loadExternalResource(live2d_path + 'waifu.css', 'css');
    console.log('✅ CSS loaded');
    
    // 动态导入模块
    const module = await import(live2d_path + 'waifu-tips.js');
    console.log('✅ waifu-tips.js loaded as module');
    
    // 检查模块导出的内容
    console.log('Module exports:', Object.keys(module));
    
    // 模块导出的是 'l' 或 'a'，但我们已经添加了 window.initWidget
    // 所以直接使用 window.initWidget
    if (typeof window.initWidget === 'function') {
      window.initWidget({
        waifuPath: live2d_path + "waifu-tips.json",
        cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
        cubism2Path: live2d_path + "live2d.min.js",
        tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
        drag: true,
        debug: false
      });
      console.log('✅ Live2D Widget initialized via window.initWidget');
    } else {
      console.error('window.initWidget is not available');
    }
  } catch (error) {
    console.error('Live2D Widget loading error:', error);
  }
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');