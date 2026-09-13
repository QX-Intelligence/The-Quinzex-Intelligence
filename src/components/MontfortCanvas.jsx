import React, { useEffect } from 'react';
import * as THREE from 'three';

const MontfortCanvas = () => {
    useEffect(() => {
        let isMounted = true;
        let timer = null;

        async function initHomepageEnvironment(App) {
            const hp = App.webgl?.pages?.Homepage;
            const mainScene = App.webgl?.mainScene;
            if (!hp || !mainScene) return;

            try {
                if (!hp.isLoaded) {
                    await hp.load();
                }

                // Attach background peaks from homepage.glb
                if (hp.env) {
                    const logo = hp.env.getObjectByName('MONTFORT');
                    if (logo) {
                        logo.visible = false;
                    }

                    if (mainScene.mountains && !mainScene.mountains.children.includes(hp.env)) {
                        mainScene.mountains.add(hp.env);
                    }
                    if (mainScene.mountains?.mountainMaterial && hp.mountainsConfig) {
                        mainScene.mountains.mountainMaterial.applyConfig(hp.mountainsConfig);
                    }
                }

                // Add multiple mountain peaks across the landscape for a vast alpine mountain range
                if (mainScene.mountains && !mainScene.extraPeaksAdded) {
                    const baseMountain = mainScene.mountains.getObjectByName('Mountain');
                    if (baseMountain) {
                        // Multi-mountain configuration spanning the horizon and depth
                        const peaksConfig = [
                            // Left Far Backdrop Peak
                            { name: 'Peak_LeftFarBackdrop', pos: [-125, -16, -20], scale: [0.76, 0.74, 0.76], rot: [0, 1.35, 0] },
                            // Left Mid-Saddle Mountain
                            { name: 'Peak_LeftMidSaddle', pos: [-62, -11, -46], scale: [0.65, 0.62, 0.65], rot: [0, 0.75, 0] },
                            // Left Deep Background Crest
                            { name: 'Peak_LeftDeepCrest', pos: [-88, -6, 32], scale: [0.82, 0.80, 0.82], rot: [0, -0.45, 0] },
                            // Right Backdrop Flank Peak
                            { name: 'Peak_RightBackdrop', pos: [55, -15, 26], scale: [0.60, 0.56, 0.60], rot: [0, -1.20, 0] },
                            // Right Far Horizon Mountain
                            { name: 'Peak_RightFarHorizon', pos: [98, -22, 10], scale: [0.68, 0.64, 0.68], rot: [0, -1.85, 0] },
                            // Right Middle Ridge Saddle
                            { name: 'Peak_RightMidSaddle', pos: [42, -12, -24], scale: [0.50, 0.48, 0.50], rot: [0, 2.25, 0] },
                            // Distant Center Colossal Mountain Ridge
                            { name: 'Peak_CenterDistantColossus', pos: [-18, -8, 88], scale: [0.88, 0.85, 0.88], rot: [0, 3.05, 0] }
                        ];

                        peaksConfig.forEach(cfg => {
                            const peak = baseMountain.clone();
                            peak.name = cfg.name;
                            peak.position.set(...cfg.pos);
                            peak.scale.set(...cfg.scale);
                            peak.rotation.set(...cfg.rot);
                            mainScene.mountains.add(peak);
                        });

                        mainScene.extraPeaksAdded = true;
                    }
                }

                // Attach TopChapters volumetric cloud sea & atmospheric layers
                const topCh = hp.chapters?.TopChapters;
                if (topCh) {
                    await topCh.load?.();
                    if (topCh.clouds && !mainScene.clouds.children.includes(topCh.clouds)) {
                        mainScene.clouds.add(topCh.clouds);
                    }
                }

                // Remove any previously added 3D depth logo
                const existingLogo = mainScene.getObjectByName('QUINZEX_DEPTH_LOGO');
                if (existingLogo) {
                    mainScene.remove(existingLogo);
                }
            } catch (err) {
                console.error('Error initializing homepage 3D environment:', err);
            }
        }

        function checkAndBindApp() {
            const App = window.MontfortApp;
            const Events = window.MontfortEvents;

            if (!App || !Events || !App.state || !App.webgl) {
                if (isMounted) {
                    timer = setTimeout(checkAndBindApp, 100);
                }
                return;
            }

            // Mountain summit baseline coordinates
            const basePos = [175.85617065429688, 45.820762634277344, -51.13716125488281];
            // Desktop lookAt targets the peak with landscape aspect ratio
            const desktopLookAt = [-5.933984756469727, -4.881087303161621, 54.62010192871094];
            // Mobile lookAt targets the peak centered for portrait aspect ratio (matching Montfort TargetPath-Mobile)
            const mobileLookAt = [11.824583053588867, -7.763660430908203, 2.5923118591308594];

            const getLookAt = () => {
                const isMobile = window.innerWidth <= 768;
                return isMobile ? mobileLookAt : desktopLookAt;
            };

            // Initialize full environment (multiple mountain peaks + cloud sea)
            initHomepageEnvironment(App);

            // Ensure renderer is sized to exact viewport with crisp devicePixelRatio
            const updateSize = () => {
                const w = window.innerWidth;
                const h = window.innerHeight;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                if (App.webgl?.renderer) {
                    App.webgl.renderer.setSize(w, h);
                    App.webgl.renderer.setPixelRatio(dpr);
                }
                if (App.webgl?.camera) {
                    App.webgl.camera.aspect = w / h;
                    App.webgl.camera.updateProjectionMatrix();
                }
                updateCamera(true);
            };

            // Update 3D Camera coordinates smoothly on scroll
            let lastScrollY = -1;
            const updateCamera = (force = false) => {
                if (!isMounted) return;

                const cam = App.webgl?.camera;
                const scene = App.webgl?.mainScene;

                if (cam && scene) {
                    const scrollY = window.scrollY || 0;
                    if (!force && scrollY === lastScrollY) return;
                    lastScrollY = scrollY;

                    const isMobile = window.innerWidth <= 768;
                    const baseLookAt = getLookAt();

                    // Direction vector toward mountain center
                    const dx = baseLookAt[0] - basePos[0];
                    const dy = baseLookAt[1] - basePos[1];
                    const dz = baseLookAt[2] - basePos[2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    const dirX = dx / dist;
                    const dirY = dy / dist;
                    const dirZ = dz / dist;

                    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
                    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

                    if (scene.mountains) {
                        scene.mountains.visible = true;
                    }

                    // Pure Mountain Zoom (dolly along sightline) & Angle Shift on scroll
                    const zoomScale = isMobile ? 30.0 : 46.0;
                    const zoom = Math.sin(progress * Math.PI) * zoomScale;

                    // Lateral & Altitude Angle Differences
                    const lateralShiftScale = isMobile ? 18.0 : 38.0;
                    const lateralShift = -Math.sin(progress * Math.PI * 0.85) * lateralShiftScale;
                    const altitudeShift = -Math.sin(progress * Math.PI * 0.75) * 12.0 + (progress > 0.65 ? (progress - 0.65) * 20.0 : 0);

                    // Apply calculated camera coordinates
                    const posX = basePos[0] + dirX * zoom + lateralShift;
                    const posY = basePos[1] + dirY * zoom + altitudeShift;
                    const posZ = basePos[2] + dirZ * zoom;

                    // Angle difference focal lookAt target
                    const targetDeltaX = isMobile ? 12.0 : 22.0;
                    const targetDeltaZ = isMobile ? 8.0 : 16.0;
                    const targetX = baseLookAt[0] - progress * targetDeltaX;
                    const targetY = baseLookAt[1] + Math.sin(progress * Math.PI) * 9.0;
                    const targetZ = baseLookAt[2] - progress * targetDeltaZ;

                    cam.targetPosition.set(posX, posY, posZ);
                    cam.targetLookAt.set(targetX, targetY, targetZ);
                    cam.chapterPosition.set(0, 0, 0);
                    cam.chapterLookAt.set(0, 0, 0);

                    cam.position.set(posX, posY, posZ);
                    cam.lookAt(targetX, targetY, targetZ);
                }
            };

            updateSize();
            window.addEventListener('resize', updateSize, { passive: true });

            updateCamera();
            window.addEventListener('scroll', updateCamera, { passive: true });
        }

        checkAndBindApp();

        return () => {
            isMounted = false;
            if (timer) clearTimeout(timer);
        };
    }, []);

    return null;
};

export default MontfortCanvas;
