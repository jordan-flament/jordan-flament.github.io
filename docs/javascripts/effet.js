(function() {
    // 1. CORRECTION DU BUG : On empêche le script de se recréer à chaque changement de page
    if (window.effetReseauActif) return;
    window.effetReseauActif = true;

    // 2. Création de la toile de dessin
    const canvas = document.createElement('canvas');
    canvas.id = 'techNetworkCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none'; // Laisse passer les clics
    canvas.style.zIndex = '90'; // Par dessus le fond, sous les menus
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particules = [];

    // 3. Ajustement de la taille
    function redimensionner() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initialiser(); // Recalcule le nombre de particules selon la taille de l'écran
    }
    window.addEventListener('resize', redimensionner);

    // 4. Suivi de la souris
    let souris = { x: null, y: null, rayon: 150 };
    window.addEventListener('mousemove', function(event) {
        // Désactive l'effet si on est sur la barre de menu tout en haut
        if (event.y < 60) {
            souris.x = null;
            souris.y = null;
        } else {
            souris.x = event.x;
            souris.y = event.y;
        }
    });
    window.addEventListener('mouseout', function() {
        souris.x = null;
        souris.y = null;
    });

    // 5. Création des objets "Particules"
    class Particule {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.taille = Math.random() * 2 + 1;
            this.vitesseX = (Math.random() * 1) - 0.5; // Vitesse très lente
            this.vitesseY = (Math.random() * 1) - 0.5;
        }
        maj() {
            this.x += this.vitesseX;
            this.y += this.vitesseY;

            // Rebondit sur les bords de l'écran
            if (this.x < 0 || this.x > canvas.width) this.vitesseX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vitesseY *= -1;
        }
        dessiner() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(64, 153, 255, 0.8)'; // Bleu "Tech"
            ctx.fill();
        }
    }

    // 6. Remplissage de l'écran
    function initialiser() {
        particules = [];
        // Calcule un nombre de particules adapté à la taille de l'écran
        let nbParticules = (canvas.height * canvas.width) / 12000;
        for (let i = 0; i < nbParticules; i++) {
            particules.push(new Particule());
        }
    }

    // 7. Moteur d'animation global
    function animer() {
        requestAnimationFrame(animer);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particules.length; i++) {
            particules[i].maj();
            particules[i].dessiner();

            // Lignes entre les particules
            for (let j = i; j < particules.length; j++) {
                let dx = particules[i].x - particules[j].x;
                let dy = particules[i].y - particules[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    // Plus elles sont proches, plus la ligne est opaque
                    ctx.strokeStyle = `rgba(64, 153, 255, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particules[i].x, particules[i].y);
                    ctx.lineTo(particules[j].x, particules[j].y);
                    ctx.stroke();
                }
            }

            // Lignes avec la souris
            if (souris.x != null) {
                let dx = particules[i].x - souris.x;
                let dy = particules[i].y - souris.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < souris.rayon) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(64, 153, 255, ${1 - distance/souris.rayon})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particules[i].x, particules[i].y);
                    ctx.lineTo(souris.x, souris.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Lancement
    redimensionner();
    animer();
})();