// 飘落星星效果 - 带闪烁
(function() {
    // ========== 可调节参数 ==========
    var STAR_COUNT = 60;        // 星星数量（30-120 之间调整）
    var FALL_SPEED = 0.8;       // 下落速度（0.5-2.0，数值越大越快）
    var TWINKLE_SPEED = 0.03;    // 闪烁速度（0.01-0.1）
    // ================================
    
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    
    var stars = [];
    
    function Star() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height;
        this.size = 3 + Math.random() * 6;
        this.speedY = FALL_SPEED + Math.random() * 1.5;
        this.speedX = -0.3 + Math.random() * 0.6;
        this.twinkle = Math.random() * Math.PI * 2;
        this.color = `hsl(${40 + Math.random() * 20}, 100%, 65%)`; // 暖黄色调
    }
    
    Star.prototype.draw = function() {
        // 闪烁效果：亮度在 0.3 到 1 之间变化
        var brightness = 0.5 + Math.sin(this.twinkle) * 0.5;
        ctx.save();
        ctx.shadowBlur = this.size * 1.5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * brightness, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // 绘制星芒（大星星才有）
        if (this.size > 5) {
            ctx.beginPath();
            for (var i = 0; i < 4; i++) {
                var angle = this.twinkle + i * Math.PI / 2;
                var x2 = this.x + Math.cos(angle) * this.size * 1.2;
                var y2 = this.y + Math.sin(angle) * this.size * 1.2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        }
        ctx.restore();
    };
    
    Star.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.twinkle += TWINKLE_SPEED;
        
        // 超出底部则重置到顶部
        if (this.y > height + 50) {
            this.y = -50;
            this.x = Math.random() * width;
        }
        // 超出左右边界则从另一边出现
        if (this.x > width + 30) this.x = -30;
        if (this.x < -30) this.x = width + 30;
    };
    
    // 初始化星星
    for (var i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小改变时重新调整画布尺寸
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
})();