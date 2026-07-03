document.addEventListener("DOMContentLoaded", function() {
    // 1. Création de la toile de dessin invisible
    const canvas = document.createElement('canvas');
    canvas.id = 'globalWaterCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none'; // IMPORTANT : Laisse passer les clics de la souris !
    canvas.style.zIndex = '90'; // Place l'animation sous le bandeau du haut (qui est à 122)
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    
    // 2. Ajustement de la taille
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    let hue = 0;

    // 3. Suivi de la souris
    document.addEventListener('mousemove', function(e) {
        // Ne crée pas de particules si la souris est sur le bandeau du haut (les 60 premiers pixels)
        if (e.clientY < 60) return;

        for (let i = 0; i < 3; i++) {
            particles.push({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 12 + 5,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: 'hsl(' + hue + ', 100%, 50%)'
            });
        }
        hue += 2;
    });

    // 4. Animation fluide
    function animate() {
        // Efface l'écran à chaque image pour ne pas cacher le texte du site
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].x += particles[i].speedX;
            particles[i].y += particles[i].speedY;
            particles[i].size -= 0.15; // La particule rétrécit
            
            ctx.fillStyle = particles[i].color;
            ctx.beginPath();
            ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
            ctx.fill();
            
            if (particles[i].size <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
});