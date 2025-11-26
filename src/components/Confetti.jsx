import { useEffect } from 'react';

const Confetti = ({ duration = 3000 }) => {
  useEffect(() => {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiPieces = 100;

    // Create confetti pieces
    for (let i = 0; i < confettiPieces; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        opacity: Math.random() * 0.5 + 0.5,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 8 + 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
      });
    }

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach(piece => {
        // Update position
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vy += 0.2; // gravity
        piece.rotation += piece.rotationSpeed;

        // Calculate opacity based on time
        const progress = elapsed / duration;
        let alpha = piece.opacity * (1 - progress);

        // Draw confetti
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        
        const color = piece.colors[Math.floor(Math.random() * piece.colors.length)];
        ctx.fillStyle = color;
        ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        
        ctx.restore();
      });

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [duration]);

  return (
    <canvas
      id="confetti-canvas"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default Confetti;
