// 鼠标点击烟花效果
(function() {
    // ========== 可调节参数 ==========
    var FIREWORK_COUNT = 18;     // 火花数量（原来是20，改小）
    var PARTICLE_SIZE = 2;       // 新增：粒子基础大小
    var GRAVITY = 0.08;           // 新增：重力（数值越大下落越快）
    // ================================
    
    function createFirework(x, y) {
        var particles = [];
        var hue = Math.random() * 360;
        
        for (var i = 0; i < FIREWORK_COUNT; i++) {
            var angle = Math.random() * Math.PI * 2;
            var speed = 1.5 + Math.random() * 4;  // 速度降低
            var vx = Math.cos(angle) * speed;
            var vy = Math.sin(angle) * speed;
            var size = PARTICLE_SIZE + Math.random() * 3;  // 粒子更小
            var life = 0.8;      // 寿命缩短
            var decay = 0.02 + Math.random() * 0.03;
            var color = `hsl(${hue + Math.random() * 60}, 100%, 65%)`;
            
            particles.push({
                x: x, y: y, vx: vx, vy: vy,
                size: size, life: life, decay: decay,
                color: color
            });
        }
        
        function animateParticles() {
            var allDead = true;
            
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                if (p.life <= 0) continue;
                
                allDead = false;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += GRAVITY;
                p.life -= p.decay;
                
                // 绘制粒子（更小的效果）
                var div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.left = p.x + 'px';
                div.style.top = p.y + 'px';
                div.style.width = Math.max(1, p.size) + 'px';
                div.style.height = Math.max(1, p.size) + 'px';
                div.style.borderRadius = '50%';
                div.style.backgroundColor = p.color;
                div.style.opacity = Math.max(0, p.life * 0.7);
                div.style.pointerEvents = 'none';
                div.style.zIndex = '99999';
                div.style.boxShadow = `0 0 ${p.size}px ${p.color}`;  // 光晕也调小
                document.body.appendChild(div);
                
                setTimeout(function(el) {
                    if (el && el.remove) el.remove();
                }, p.life * 800, div);
            }
            
            if (!allDead) {
                requestAnimationFrame(animateParticles);
            }
        }
        
        animateParticles();
    }
    
    document.addEventListener('click', function(e) {
        createFirework(e.clientX, e.clientY);
    });
})();