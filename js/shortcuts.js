// 一键到底按钮功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建按钮元素
    const bottomBtn = document.createElement('a');
    bottomBtn.id = 'go-bottom';
    bottomBtn.className = 'not-on-mobile';
    bottomBtn.setAttribute('title', '到底');
    bottomBtn.setAttribute('href', 'javascript:void(0);');
    bottomBtn.innerHTML = '<i class="fas fa-arrow-down"></i>';
    
    // 插入到 rightside 按钮组中
    const rightside = document.querySelector('#rightside');
    if (rightside) {
        // 可以指定插入位置，比如插入到回到顶部按钮之后
        const goTopBtn = document.querySelector('#go-up');
        if (goTopBtn) {
            goTopBtn.insertAdjacentElement('afterend', bottomBtn);
        } else {
            rightside.appendChild(bottomBtn);
        }
    }
    
    // 绑定点击事件
    bottomBtn.addEventListener('click', function() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
});