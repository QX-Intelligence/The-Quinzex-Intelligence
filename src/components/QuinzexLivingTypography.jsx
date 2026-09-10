import React, { useEffect, useRef } from 'react';

const QuinzexLivingTypography = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let isDestroyed = false;

        // Load the mountain image
        const mountainImg = new Image();
        let imgLoaded = false;
        mountainImg.onload = () => {
            imgLoaded = true;
        };
        mountainImg.src = '/assets/mountain_smoke.jpg';
        if (mountainImg.complete && mountainImg.naturalWidth > 0) {
            imgLoaded = true;
        }

        const text = 'QUINZEX';
        let width = 0;
        let height = 0;
        let fontSize = 220;
        let letterSpacing = 12;
        let letters = [];
        let totalWidth = 0;

        // Mouse state with smooth dampening for 3D parallax & fluid smoke vortex
        const mouse = {
            x: -9999,
            y: -9999,
            targetX: -9999,
            targetY: -9999,
            prevX: -9999,
            prevY: -9999,
            vx: 0,
            vy: 0,
            isHovered: false
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
            mouse.isHovered = true;
        };

        const handleMouseLeave = () => {
            mouse.isHovered = false;
            mouse.targetX = width / 2;
            mouse.targetY = height / 2;
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Fluid smoke simulation particles
        const PARTICLE_COUNT = 65;
        const particles = [];

        const initParticles = (w, h, fSize) => {
            particles.length = 0;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: h * 0.15 + Math.random() * (h * 0.85),
                    vx: (Math.random() - 0.3) * 0.8,
                    vy: -0.2 - Math.random() * 0.45, // buoyant rise
                    baseRadius: fSize * (0.18 + Math.random() * 0.35),
                    radius: fSize * (0.18 + Math.random() * 0.35),
                    angle: Math.random() * Math.PI * 2,
                    angularSpeed: (Math.random() - 0.5) * 0.02,
                    alpha: 0.12 + Math.random() * 0.32,
                    baseAlpha: 0.12 + Math.random() * 0.32,
                    seed: Math.random() * 1000
                });
            }
        };

        // Layout & sizing
        const handleResize = () => {
            if (!container || !canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = container.getBoundingClientRect();

            width = rect.width || window.innerWidth;
            height = Math.max(170, Math.min(360, width * 0.22));

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);

            // Calculate font size to stretch across ~95% of container width
            const targetWidth = width * 0.95;
            const refFontSize = 100;
            ctx.font = `800 ${refFontSize}px Outfit, 'Plus Jakarta Sans', sans-serif`;

            const refSpacing = refFontSize * 0.05;
            let refW = 0;
            for (let i = 0; i < text.length; i++) {
                refW += ctx.measureText(text[i]).width + (i < text.length - 1 ? refSpacing : 0);
            }

            fontSize = Math.floor(refFontSize * (targetWidth / refW));
            fontSize = Math.max(72, Math.min(360, fontSize));
            letterSpacing = fontSize * 0.05;

            ctx.font = `800 ${fontSize}px Outfit, 'Plus Jakarta Sans', sans-serif`;

            // Measure each letter position
            letters = [];
            totalWidth = 0;
            for (let i = 0; i < text.length; i++) {
                const charW = ctx.measureText(text[i]).width;
                letters.push({
                    char: text[i],
                    width: charW,
                    x: 0,
                    centerX: 0
                });
                totalWidth += charW + (i < text.length - 1 ? letterSpacing : 0);
            }

            let startX = (width - totalWidth) / 2;
            let curX = startX;
            for (let i = 0; i < letters.length; i++) {
                letters[i].x = curX;
                letters[i].centerX = curX + letters[i].width / 2;
                curX += letters[i].width + letterSpacing;
            }

            initParticles(width, height, fontSize);
        };

        handleResize();
        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(container);

        // Draw 3D Architectural Blueprint Facets inside the letters
        const drawArchitecturalFacets = (elapsed, mouseParallaxX, mouseParallaxY) => {
            const baselineY = height * 0.82;
            const topY = baselineY - fontSize * 0.72;
            const midY = (topY + baselineY) / 2;

            ctx.save();
            ctx.lineWidth = 1.2;

            for (let i = 0; i < letters.length; i++) {
                const item = letters[i];
                const char = item.char;
                const lx = item.x;
                const lw = item.width;
                const rx = lx + lw;

                // Subtle glowing pulse traveling through wireframes
                const pulsePhase = (elapsed * 0.002 + i * 0.7) % (Math.PI * 2);
                const pulseAlpha = 0.15 + Math.sin(pulsePhase) * 0.12;

                ctx.strokeStyle = `rgba(180, 215, 245, ${pulseAlpha})`;

                if (char === 'Z') {
                    // Isometric 3D faceted block wireframe inside Z
                    const offX = mouseParallaxX * 8;
                    const offY = mouseParallaxY * 5;

                    ctx.beginPath();
                    // Top plate wireframe
                    ctx.moveTo(lx + lw * 0.15, topY + fontSize * 0.08);
                    ctx.lineTo(rx - lw * 0.1, topY + fontSize * 0.08);
                    ctx.lineTo(rx - lw * 0.25 + offX, topY + fontSize * 0.18 + offY);
                    ctx.lineTo(lx + lw * 0.15, topY + fontSize * 0.18 + offY);
                    ctx.closePath();

                    // Diagonal 3D facet bevel
                    ctx.moveTo(rx - lw * 0.1, topY + fontSize * 0.08);
                    ctx.lineTo(lx + lw * 0.2 + offX, baselineY - fontSize * 0.08 + offY);

                    // Bottom 3D ledge
                    ctx.moveTo(lx + lw * 0.1, baselineY - fontSize * 0.15);
                    ctx.lineTo(rx - lw * 0.15, baselineY - fontSize * 0.15);
                    ctx.lineTo(rx - lw * 0.15 + offX, baselineY - fontSize * 0.05 + offY);
                    ctx.lineTo(lx + lw * 0.1, baselineY - fontSize * 0.05 + offY);
                    ctx.closePath();

                    ctx.stroke();

                } else if (char === 'E') {
                    // Architectural tier levels wireframe inside E
                    const offX = mouseParallaxX * 6;

                    ctx.beginPath();
                    // Horizontal interior architectural shelf lines
                    ctx.moveTo(lx + lw * 0.28, midY - fontSize * 0.14);
                    ctx.lineTo(lx + lw * 0.75 + offX, midY - fontSize * 0.14);

                    ctx.moveTo(lx + lw * 0.28, midY + fontSize * 0.14);
                    ctx.lineTo(lx + lw * 0.75 + offX, midY + fontSize * 0.14);

                    // Vertical spine depth line
                    ctx.moveTo(lx + lw * 0.32 + offX, topY + fontSize * 0.06);
                    ctx.lineTo(lx + lw * 0.32 + offX, baselineY - fontSize * 0.06);

                    ctx.stroke();

                } else if (char === 'N') {
                    // Angular structural tension wireframe inside N
                    const offX = mouseParallaxX * 7;
                    const offY = mouseParallaxY * 4;

                    ctx.beginPath();
                    ctx.moveTo(lx + lw * 0.28, topY + fontSize * 0.1);
                    ctx.lineTo(rx - lw * 0.28 + offX, baselineY - fontSize * 0.1 + offY);

                    ctx.moveTo(lx + lw * 0.28 + offX, topY + fontSize * 0.18);
                    ctx.lineTo(rx - lw * 0.28, baselineY - fontSize * 0.18);

                    ctx.stroke();

                } else if (char === 'X') {
                    // Central tetrahedral facet diamond inside X
                    const offX = mouseParallaxX * 8;
                    const offY = mouseParallaxY * 6;
                    const cx = (lx + rx) / 2 + offX;
                    const cy = midY + offY;

                    ctx.beginPath();
                    ctx.moveTo(cx, cy - fontSize * 0.12);
                    ctx.lineTo(cx + lw * 0.18, cy);
                    ctx.lineTo(cx, cy + fontSize * 0.12);
                    ctx.lineTo(cx - lw * 0.18, cy);
                    ctx.closePath();

                    // Rays connecting diamond to corners
                    ctx.moveTo(cx, cy - fontSize * 0.12);
                    ctx.lineTo(lx + lw * 0.2, topY + fontSize * 0.1);
                    ctx.moveTo(cx, cy - fontSize * 0.12);
                    ctx.lineTo(rx - lw * 0.2, topY + fontSize * 0.1);

                    ctx.moveTo(cx, cy + fontSize * 0.12);
                    ctx.lineTo(lx + lw * 0.2, baselineY - fontSize * 0.1);
                    ctx.moveTo(cx, cy + fontSize * 0.12);
                    ctx.lineTo(rx - lw * 0.2, baselineY - fontSize * 0.1);

                    ctx.stroke();

                } else if (char === 'Q') {
                    // Circular compass crosshair inside Q
                    const qCenterX = lx + lw * 0.5;
                    const qCenterY = midY - fontSize * 0.06;
                    const qRadius = lw * 0.28;

                    ctx.beginPath();
                    ctx.arc(qCenterX + mouseParallaxX * 5, qCenterY + mouseParallaxY * 5, qRadius, 0, Math.PI * 2);
                    ctx.moveTo(qCenterX - qRadius * 1.3, qCenterY);
                    ctx.lineTo(qCenterX + qRadius * 1.3, qCenterY);
                    ctx.moveTo(qCenterX, qCenterY - qRadius * 1.3);
                    ctx.lineTo(qCenterX, qCenterY + qRadius * 1.3);
                    ctx.stroke();
                }
            }

            ctx.restore();
        };

        // Render loop
        let startTime = performance.now();
        let prevTime = startTime;

        const render = (now) => {
            if (isDestroyed) return;
            const elapsed = now - startTime;
            const dt = Math.min((now - prevTime) / 1000, 0.1);
            prevTime = now;

            // Smooth mouse interpolation (spring feel)
            if (mouse.targetX !== -9999) {
                if (mouse.x === -9999) {
                    mouse.x = mouse.targetX;
                    mouse.y = mouse.targetY;
                } else {
                    const prevX = mouse.x;
                    const prevY = mouse.y;
                    mouse.x += (mouse.targetX - mouse.x) * 0.08;
                    mouse.y += (mouse.targetY - mouse.y) * 0.08;
                    mouse.vx = (mouse.x - prevX) / (dt * 1000 || 1);
                    mouse.vy = (mouse.y - prevY) / (dt * 1000 || 1);
                }
            }

            const mouseNormX = (mouse.x - width / 2) / (width / 2 || 1);
            const mouseNormY = (mouse.y - height / 2) / (height / 2 || 1);

            ctx.clearRect(0, 0, width, height);

            const baselineY = height * 0.82;

            // ─────────────────────────────────────────────────────────────
            // STEP 1: RENDER BASE TEXT GLYPHS AS THE CLIPPING MASK
            // ─────────────────────────────────────────────────────────────
            ctx.save();
            ctx.font = `800 ${fontSize}px Outfit, 'Plus Jakarta Sans', sans-serif`;
            ctx.fillStyle = '#ffffff';

            for (let i = 0; i < letters.length; i++) {
                ctx.fillText(letters[i].char, letters[i].x, baselineY);
            }

            // ─────────────────────────────────────────────────────────────
            // STEP 2: CLIP ALL INTERNAL EFFECTS TO THE LETTERS
            // ─────────────────────────────────────────────────────────────
            ctx.globalCompositeOperation = 'source-in';

            // 2A: 3D Parallax Mountain Backdrop (Accurately Aspect-Scaled to Frame Peaks & Clouds)
            const isImgReady = imgLoaded || (mountainImg.complete && mountainImg.naturalWidth > 0);
            if (Math.random() < 0.02) {
                console.log('DEBUG_WATERMARK: isImgReady=', isImgReady, 'complete=', mountainImg.complete, 'naturalWidth=', mountainImg.naturalWidth);
            }
            if (isImgReady) {
                const imgW = mountainImg.naturalWidth || 1920;
                const imgH = mountainImg.naturalHeight || 1080;
                const imgAspect = imgW / imgH;

                // Scale to fully cover canvas with room for 3D parallax motion
                let drawW = width * 1.28;
                let drawH = drawW / imgAspect;

                if (drawH < height * 1.3) {
                    drawH = height * 1.3;
                    drawW = drawH * imgAspect;
                }

                // 3D Parallax: Mouse tilts and pans the mountain range
                const parallaxRangeX = (drawW - width) * 0.35;
                const parallaxRangeY = (drawH - height) * 0.25;

                const panX = -mouseNormX * parallaxRangeX + Math.sin(elapsed * 0.00035) * (width * 0.04);
                const panY = -mouseNormY * parallaxRangeY + Math.cos(elapsed * 0.00028) * (height * 0.03);

                // Frame the dramatic mountain peaks (located around 42% - 52% of image height)
                const baseDrawX = (width - drawW) / 2 + panX;
                const baseDrawY = (height - drawH) * 0.44 + panY;

                ctx.drawImage(mountainImg, baseDrawX, baseDrawY, drawW, drawH);
            } else {
                // Fallback deep alpine granite gradient
                const baseGrad = ctx.createLinearGradient(0, 0, width, height);
                baseGrad.addColorStop(0, '#0e263d');
                baseGrad.addColorStop(0.5, '#1e3c5a');
                baseGrad.addColorStop(1, '#091a2b');
                ctx.fillStyle = baseGrad;
                ctx.fillRect(0, 0, width, height);
            }

            // 2B: Atmospheric Glacial Depth Tint (Very subtle so dark rock details shine through)
            const alpineWash = ctx.createLinearGradient(0, 0, 0, height);
            alpineWash.addColorStop(0, 'rgba(244, 246, 249, 0.15)');
            alpineWash.addColorStop(0.42, 'rgba(15, 53, 84, 0.08)');
            alpineWash.addColorStop(1, 'rgba(15, 53, 84, 0.28)');
            ctx.fillStyle = alpineWash;
            ctx.fillRect(0, 0, width, height);

            // 2C: Billowing Fluid Smoke & Interactive Swirling Vortices
            ctx.globalCompositeOperation = 'source-atop';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Natural curl & buoyant drift
                const curlNoise = Math.sin(elapsed * 0.0015 + p.seed) * 0.45;
                p.x += p.vx + curlNoise;
                p.y += p.vy;
                p.angle += p.angularSpeed;

                // Dynamic mouse interaction: Mouse movement stirs the smoke into swirling vortex eddies!
                if (mouse.x > 0 && mouse.y > 0) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const influenceRadius = 240;

                    if (distSq < influenceRadius * influenceRadius && distSq > 4) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / influenceRadius);

                        // Tangential vortex velocity (swirl around cursor)
                        const tangentX = -dy / dist;
                        const tangentY = dx / dist;

                        p.vx += tangentX * force * 1.8 + mouse.vx * 0.015;
                        p.vy += tangentY * force * 1.8 + mouse.vy * 0.015;

                        // Slight expansion near cursor
                        p.radius = p.baseRadius * (1 + force * 0.35);
                    } else {
                        // Return to base speed
                        p.vx += ((Math.sin(p.seed) * 0.5) - p.vx) * 0.03;
                        p.radius += (p.baseRadius - p.radius) * 0.05;
                    }
                }

                // Breathing pulse of the smoke cloud
                const breathing = Math.sin(elapsed * 0.002 + p.seed * 0.1) * 0.06;
                const curAlpha = Math.max(0.04, Math.min(0.48, p.baseAlpha + breathing));

                // Screen boundary wrap-around
                if (p.x - p.radius > width) {
                    p.x = -p.radius;
                    p.y = height * 0.2 + Math.random() * (height * 0.7);
                }
                if (p.x + p.radius < -50) {
                    p.x = width + p.radius;
                }
                if (p.y + p.radius < 0) {
                    p.y = height + p.radius;
                    p.x = Math.random() * width;
                }

                // Draw organic billowing smoke gradient puff
                const smokeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                smokeGrad.addColorStop(0, `rgba(255, 255, 255, ${curAlpha * 1.1})`);
                smokeGrad.addColorStop(0.35, `rgba(225, 240, 255, ${curAlpha * 0.75})`);
                smokeGrad.addColorStop(0.7, `rgba(185, 215, 245, ${curAlpha * 0.25})`);
                smokeGrad.addColorStop(1, 'rgba(185, 215, 245, 0)');

                ctx.fillStyle = smokeGrad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 2D: Interactive 3D Architectural Blueprint Facets (illuminating inside the letters)
            drawArchitecturalFacets(elapsed, mouseNormX, mouseNormY);

            // 2E: Interactive Volumetric Light Beam Sweeping Across the Mountain Crags
            const lightPeriod = 7500;
            const lightProgress = (elapsed % lightPeriod) / lightPeriod;
            const lightBeamX = -width * 0.4 + lightProgress * (width * 1.8) + mouseNormX * 60;

            const lightGrad = ctx.createLinearGradient(lightBeamX - 180, 0, lightBeamX + 180, height);
            lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            lightGrad.addColorStop(0.42, 'rgba(255, 255, 255, 0.12)');
            lightGrad.addColorStop(0.5, 'rgba(235, 248, 255, 0.38)');
            lightGrad.addColorStop(0.58, 'rgba(255, 255, 255, 0.12)');
            lightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = lightGrad;
            ctx.fillRect(0, 0, width, height);

            // ─────────────────────────────────────────────────────────────
            // STEP 3: CRISP OUTLINE & LETTER HOVER HIGHLIGHT
            // ─────────────────────────────────────────────────────────────
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = Math.max(1.2, Math.min(2.8, fontSize * 0.009));

            for (let i = 0; i < letters.length; i++) {
                const item = letters[i];
                // Check if mouse is hovering near this specific letter
                const distToLetter = Math.abs(mouse.x - item.centerX);
                const isLetterActive = mouse.isHovered && distToLetter < item.width * 0.75;

                if (isLetterActive) {
                    // Letter illuminates with high-tech glacial gleam
                    ctx.strokeStyle = 'rgba(40, 140, 220, 0.65)';
                    ctx.shadowColor = 'rgba(40, 140, 220, 0.35)';
                    ctx.shadowBlur = 14;
                } else {
                    // Crisp elegant standard outline
                    ctx.strokeStyle = 'rgba(15, 53, 84, 0.28)';
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                }

                ctx.strokeText(item.char, item.x, baselineY);
            }

            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            isDestroyed = true;
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="ic-footer-watermark" aria-label="QUINZEX Living Typography">
            <canvas 
                ref={canvasRef} 
                className="ic-footer-watermark-canvas"
                style={{ 
                    display: 'block', 
                    width: '100%', 
                    cursor: 'crosshair',
                    userSelect: 'none'
                }} 
            />
        </div>
    );
};

export default QuinzexLivingTypography;
