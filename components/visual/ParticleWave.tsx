"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ParticleWaveProps {
  className?: string;
  /** Mode: "hero" (interactive with full animation) or "cta" / "static" (subtle / still frame) */
  mode?: "hero" | "cta" | "static";
  /** Optional override for wave opacity */
  opacity?: number;
}

interface Ripple {
  x: number;
  y: number;
  startTime: number;
  duration: number;
  maxRadius: number;
}

export function ParticleWave({
  className = "",
  mode = "hero",
  opacity = 1,
}: ParticleWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isStaticMode = mode === "static" || prefersReducedMotion;

    // Hover capability detection
    const canHover = window.matchMedia("(hover: hover)").matches;

    let animId: number | null = null;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid configuration
    let cols = 90;
    let rows = 34;
    let stepDensity = 1; // 1 = full, 2 = halved

    // Precomputed coordinate arrays
    let gridX: Float32Array;
    let gridZ: Float32Array;
    let gridU: Float32Array; // 0..1 across columns
    let colR: Uint8Array;
    let colG: Uint8Array;
    let colB: Uint8Array;

    // Brand gradient definition:
    // 0.0 -> #7B5CFF (123, 92, 255)
    // 0.5 -> #E2539B (226, 83, 155)
    // 1.0 -> #F2894A (242, 137, 74)
    const initPalette = (numCols: number) => {
      colR = new Uint8Array(numCols);
      colG = new Uint8Array(numCols);
      colB = new Uint8Array(numCols);

      for (let c = 0; c < numCols; c++) {
        const u = c / Math.max(1, numCols - 1);
        if (u <= 0.5) {
          const t = u / 0.5;
          colR[c] = Math.round(123 + (226 - 123) * t);
          colG[c] = Math.round(92 + (83 - 92) * t);
          colB[c] = Math.round(255 + (155 - 255) * t);
        } else {
          const t = (u - 0.5) / 0.5;
          colR[c] = Math.round(226 + (242 - 226) * t);
          colG[c] = Math.round(83 + (137 - 83) * t);
          colB[c] = Math.round(155 + (74 - 155) * t);
        }
      }
    };

    const setupGrid = () => {
      const isMobile = width < 768;
      const targetCols = isMobile ? 64 : 96;
      const targetRows = isMobile ? 30 : 46;

      cols = Math.round(targetCols / stepDensity);
      rows = Math.round(targetRows / stepDensity);

      initPalette(cols);

      const totalPoints = cols * rows;
      gridX = new Float32Array(totalPoints);
      gridZ = new Float32Array(totalPoints);
      gridU = new Float32Array(totalPoints);

      // Virtual 3D plane dimensions
      const planeWidth = width * (isMobile ? 1.45 : 1.4);
      const zNear = 180;
      const zFar = 1350;

      for (let r = 0; r < rows; r++) {
        // Slightly quadratic z spacing so near rows aren't too sparse
        const zNorm = r / Math.max(1, rows - 1);
        const z = zNear + (zFar - zNear) * Math.pow(zNorm, 1.12);

        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const u = c / Math.max(1, cols - 1);
          const x = (u - 0.5) * planeWidth;

          gridX[idx] = x;
          gridZ[idx] = z;
          gridU[idx] = u;
        }
      }
    };

    // Cursor tracking
    let targetPointerX = -9999;
    let targetPointerY = -9999;
    let currPointerX = -9999;
    let currPointerY = -9999;
    let hoverStrength = 0;
    let isHovering = false;

    // Ripples
    const ripples: Ripple[] = [];
    const MAX_RIPPLES = 3;

    const addRipple = (screenX: number, screenY: number) => {
      if (ripples.length >= MAX_RIPPLES) {
        ripples.shift();
      }
      ripples.push({
        x: screenX,
        y: screenY,
        startTime: performance.now(),
        duration: 1200,
        maxRadius: 420,
      });
    };

    // Hero section reference for pointer events
    const heroSection = container.closest("section") || container;

    const onPointerMove = (e: PointerEvent) => {
      if (!canHover) return;
      const rect = canvas.getBoundingClientRect();
      targetPointerX = e.clientX - rect.left;
      targetPointerY = e.clientY - rect.top;
      isHovering = true;
    };

    const onPointerLeave = () => {
      if (!canHover) return;
      isHovering = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px >= 0 && px <= rect.width && py >= 0 && py <= rect.height) {
        addRipple(px, py);
      }
    };

    heroSection.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    heroSection.addEventListener("pointerleave", onPointerLeave as EventListener, { passive: true });
    heroSection.addEventListener("pointerdown", onPointerDown as EventListener, { passive: true });

    // Handle Resize
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(240, Math.floor(rect.height));

      const isMobile = width < 768;
      const maxDpr = isMobile ? 1.5 : 2.0;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      setupGrid();

      if (isStaticMode) {
        drawFrame(3.6);
      }
    };

    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    });
    ro.observe(container);

    // Initial sizing
    handleResize();

    // IntersectionObserver to pause when hero is offscreen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId && !isStaticMode) {
            animId = requestAnimationFrame(loop);
          }
        });
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    // VisibilityChange to pause when tab is hidden
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible && !animId && !isStaticMode) {
        animId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Wave Constants
    const A1 = 28;
    const A2 = 20;
    const A3 = 14;

    // Performance profiling over first 60 frames
    let frameCount = 0;
    let totalFrameTime = 0;
    let densityChecked = false;

    // Projection & Render
    const drawFrame = (timeSec: number) => {
      if (!ctx || width === 0 || height === 0) return;

      const fov = 720;
      // Horizon aimed so ridges run above the dashboard and in the side gutters
      const horizonY = height * 0.20;
      const cameraY = 300;
      const centerX = width * 0.5;

      const planeWidth = width * (width < 768 ? 1.45 : 1.4);
      const zNear = 180;
      const zFar = 1350;
      const zSpan = zFar - zNear;

      const k1 = (2.2 * 2 * Math.PI) / planeWidth;
      const k2 = (2.6 * 2 * Math.PI) / zSpan;
      const k3 = (1.4 * 2 * Math.PI) / planeWidth;

      // Cursor lerp & mobile auto-moving lens
      if (!canHover) {
        // Mobile auto-lens drifting along crest
        targetPointerX = width * (0.5 + 0.32 * Math.sin(timeSec * 0.32));
        targetPointerY = horizonY + (height - horizonY) * (0.42 + 0.18 * Math.cos(timeSec * 0.25));
        hoverStrength = 0.85;
      } else {
        if (isHovering) {
          hoverStrength += (1 - hoverStrength) * 0.08;
        } else {
          hoverStrength += (0 - hoverStrength) * 0.05;
        }
      }

      if (currPointerX < -9000) {
        currPointerX = targetPointerX;
        currPointerY = targetPointerY;
      } else {
        currPointerX += (targetPointerX - currPointerX) * 0.08;
        currPointerY += (targetPointerY - currPointerY) * 0.08;
      }

      // Filter active ripples
      const now = performance.now();
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].startTime > ripples[i].duration) {
          ripples.splice(i, 1);
        }
      }

      // Clear canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const total = cols * rows;

      // Single fast render pass
      for (let idx = 0; idx < total; idx++) {
        const x = gridX[idx];
        const z = gridZ[idx];
        const u = gridU[idx];
        const colIdx = idx % cols;

        // Wave formula: y = A1·sin(x·k1 + t·0.35) + A2·sin(z·k2 − t·0.25) + A3·sin((x+z)·k3 + t·0.18)
        let waveY =
          A1 * Math.sin(x * k1 + timeSec * 0.35) +
          A2 * Math.sin(z * k2 - timeSec * 0.25) +
          A3 * Math.sin((x + z) * k3 + timeSec * 0.18);

        // Perspective projection
        const scale = fov / (z + 120);
        let screenX = centerX + x * scale;
        let screenY = horizonY + (cameraY - waveY) * scale;

        // Cursor lens interaction (160px screen space)
        let extraLift = 0;
        let lensAlphaBoost = 0;
        let lensRadiusBoost = 1.0;

        if (hoverStrength > 0.01) {
          const dx = screenX - currPointerX;
          const dy = screenY - currPointerY;
          const distSq = dx * dx + dy * dy;
          const maxDist = 160;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const q = 1 - dist / maxDist;
            const falloff = q * q * hoverStrength;
            extraLift += 18 * falloff;
            lensAlphaBoost += 0.45 * falloff;
            lensRadiusBoost += 0.4 * falloff;
          }
        }

        // Ripple interaction
        if (ripples.length > 0) {
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const age = (now - rip.startTime) / rip.duration;
            const currentR = rip.maxRadius * age;
            const ringWidth = 44;

            const rdx = screenX - rip.x;
            const rdy = screenY - rip.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const diff = Math.abs(rdist - currentR);

            if (diff < ringWidth) {
              const ringFactor =
                Math.cos((diff / ringWidth) * (Math.PI * 0.5)) * (1 - age);
              extraLift += 15 * ringFactor;
              lensAlphaBoost += 0.35 * ringFactor;
              lensRadiusBoost += 0.3 * ringFactor;
            }
          }
        }

        // Apply lift to screen Y
        if (extraLift > 0) {
          screenY -= extraLift * scale;
        }

        // Depth and Height normalization
        const zNorm = (z - zNear) / zSpan;
        const yNorm = (waveY + 62) / 124; // approx 0..1

        // Base radius: 0.6px to 2.0px
        let radius =
          (0.7 + 1.1 * (1 - zNorm * 0.55)) *
          (0.7 + 0.35 * yNorm) *
          lensRadiusBoost;
        if (radius < 0.6) radius = 0.6;
        if (radius > 2.6) radius = 2.6;

        // Base alpha: 0.10 to 0.55
        let alpha =
          (0.12 + 0.43 * (1 - zNorm * 0.6) * (0.35 + 0.65 * yNorm) +
            lensAlphaBoost) *
          opacity;
        if (alpha > 0.85) alpha = 0.85;

        // Vignette: fade near horizon (zNorm > 0.65)
        let fadeZ = 1.0;
        if (zNorm > 0.65) {
          fadeZ = Math.max(0, 1 - (zNorm - 0.65) / 0.35);
        }

        // Vignette: left and right edges
        let fadeX = 1.0;
        if (u < 0.16) {
          fadeX = u / 0.16;
        } else if (u > 0.84) {
          fadeX = (1 - u) / 0.16;
        }

        // Vignette: bottom fade before client logos row
        let fadeBottom = 1.0;
        if (screenY > height - 120) {
          fadeBottom = Math.max(0, (height - 20 - screenY) / 100);
        }

        alpha *= fadeZ * fadeX * fadeBottom;

        // V1l §1e: Drop alpha by 30% in the band under the handwritten line so text area breathes
        const spanY = height - horizonY;
        const textBandTop = horizonY + spanY * 0.20;
        const textBandBottom = horizonY + spanY * 0.38;
        if (screenY >= textBandTop && screenY <= textBandBottom) {
          alpha *= 0.70;
        }

        // V1l §1e: Soft ellipse behind frame (frame size + 60px): fade wave to 0 directly behind frame
        // keeps wave clearly flowing in the band above frame and in side gutters
        const frameCenterX = width * 0.5;
        const frameCenterY = horizonY + spanY * 0.64;
        const frameRx = Math.min(630, width * 0.46) + 30;
        const frameRy = Math.min(360, height * 0.30) + 30;
        const distSqNorm =
          Math.pow((screenX - frameCenterX) / frameRx, 2) +
          Math.pow((screenY - frameCenterY) / frameRy, 2);

        if (distSqNorm < 1.0) {
          // Inner core (dist < 0.45) is 0 alpha; outer margin (0.45 .. 1.0) smoothly restores alpha
          const frameFade = Math.max(0, Math.min(1, (distSqNorm - 0.45) / 0.55));
          alpha *= frameFade;
        }

        if (alpha < 0.02) continue;

        // Draw dot
        const rVal = colR[colIdx];
        const gVal = colG[colIdx];
        const bVal = colB[colIdx];

        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rVal},${gVal},${bVal},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();
    };

    // Render loop
    const loop = (ts: number) => {
      if (!isVisible || !isTabVisible) {
        animId = null;
        return;
      }

      const start = performance.now();
      const timeSec = ts * 0.001;

      drawFrame(timeSec);

      // Performance check
      if (!densityChecked && frameCount < 60) {
        const elapsed = performance.now() - start;
        totalFrameTime += elapsed;
        frameCount++;
        if (frameCount === 60) {
          densityChecked = true;
          const avgFrameTime = totalFrameTime / 60;
          if (avgFrameTime > 10 && stepDensity === 1) {
            // Halve point count automatically
            stepDensity = 2;
            setupGrid();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    if (isStaticMode) {
      drawFrame(3.6);
    } else {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (resizeTimer) clearTimeout(resizeTimer);
      heroSection.removeEventListener("pointermove", onPointerMove as EventListener);
      heroSection.removeEventListener("pointerleave", onPointerLeave as EventListener);
      heroSection.removeEventListener("pointerdown", onPointerDown as EventListener);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      ro.disconnect();
      io.disconnect();
    };
  }, [isMounted, mode, opacity]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* Static CSS fallback shown before canvas hydration to prevent any flash */}
      {!isMounted && (
        <div className="hero-dot-grid absolute inset-0 -z-10 opacity-30" />
      )}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 block w-full h-full"
      />
    </div>
  );
}

export default ParticleWave;