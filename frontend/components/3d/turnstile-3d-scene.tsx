"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShieldCheck, Zap, Terminal, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Turnstile3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.4, 4.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);

    const voltLight = new THREE.PointLight(0xc6ff00, 3, 10);
    voltLight.position.set(0, 1.2, 1.5);
    scene.add(voltLight);

    // 4. Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xd0d4dc,
      metalness: 0.9,
      roughness: 0.2,
    });

    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.7,
      roughness: 0.35,
    });

    const voltGlowMat = new THREE.MeshBasicMaterial({
      color: 0xc6ff00,
      transparent: true,
      opacity: 0.9,
    });

    const glassFlapMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.6,
    });

    // 5. Dual Optical Turnstile Lanes Assembly
    const turnstileGroup = new THREE.Group();
    scene.add(turnstileGroup);

    // Pedestal Post 1 (Left)
    const postGeo = new THREE.BoxGeometry(0.55, 1.9, 1.1);
    const postL = new THREE.Mesh(postGeo, obsidianMat);
    postL.position.x = -1.1;
    turnstileGroup.add(postL);

    // Top Scanner Glass Bezel Left
    const bezelGeo = new THREE.BoxGeometry(0.5, 0.05, 1.0);
    const bezelL = new THREE.Mesh(bezelGeo, steelMaterial);
    bezelL.position.set(-1.1, 0.96, 0);
    turnstileGroup.add(bezelL);

    // Laser Beam Left
    const laserGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.9, 16);
    laserGeo.rotateZ(Math.PI / 2);
    const laserL = new THREE.Mesh(laserGeo, voltGlowMat);
    laserL.position.set(-1.1, 0.99, 0);
    turnstileGroup.add(laserL);

    // Pedestal Post 2 (Center)
    const postC = new THREE.Mesh(postGeo, obsidianMat);
    postC.position.x = 0;
    turnstileGroup.add(postC);

    const bezelC = new THREE.Mesh(bezelGeo, steelMaterial);
    bezelC.position.set(0, 0.96, 0);
    turnstileGroup.add(bezelC);

    const laserC = new THREE.Mesh(laserGeo, voltGlowMat);
    laserC.position.set(0, 0.99, 0);
    turnstileGroup.add(laserC);

    // Pedestal Post 3 (Right)
    const postR = new THREE.Mesh(postGeo, obsidianMat);
    postR.position.x = 1.1;
    turnstileGroup.add(postR);

    const bezelR = new THREE.Mesh(bezelGeo, steelMaterial);
    bezelR.position.set(1.1, 0.96, 0);
    turnstileGroup.add(bezelR);

    const laserR = new THREE.Mesh(laserGeo, voltGlowMat);
    laserR.position.set(1.1, 0.99, 0);
    turnstileGroup.add(laserR);

    // Glass Barrier Flap Lane 1
    const flapGeo = new THREE.BoxGeometry(0.04, 0.75, 0.7);
    const flap1 = new THREE.Mesh(flapGeo, glassFlapMat);
    flap1.position.set(-0.55, 0.35, 0);
    turnstileGroup.add(flap1);

    // Glass Barrier Flap Lane 2
    const flap2 = new THREE.Mesh(flapGeo, glassFlapMat);
    flap2.position.set(0.55, 0.35, 0);
    turnstileGroup.add(flap2);

    // Particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer movement
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener("pointermove", onPointerMove);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      turnstileGroup.rotation.y += (mouseX * 0.4 - turnstileGroup.rotation.y) * 0.05;
      turnstileGroup.rotation.x += (-mouseY * 0.3 - turnstileGroup.rotation.x) * 0.05;

      laserC.rotation.x = Math.sin(elapsed * 4) * 0.15;
      voltLight.intensity = 2.5 + Math.sin(elapsed * 3) * 0.8;

      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);

      postGeo.dispose();
      bezelGeo.dispose();
      laserGeo.dispose();
      flapGeo.dispose();
      particleGeo.dispose();

      steelMaterial.dispose();
      obsidianMat.dispose();
      voltGlowMat.dispose();
      glassFlapMat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const triggerPulse = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1200);
  };

  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden glass-panel-elevated select-none group border border-white/10">
      <div
        ref={mountRef}
        onClick={triggerPulse}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <Badge variant="primary" className="font-mono text-[10px] gap-1 px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          UNIVERSAL TCP/IP RELAY HARDWARE
        </Badge>
        <span className="text-[11px] font-mono text-ink-subtle hidden sm:inline-block">
          ● Drag to inspect gates • Click model to trigger 300ms relay pulse
        </span>
      </div>

      <div className="absolute bottom-6 left-6 z-20 glass-panel p-4 rounded-xl max-w-[240px] space-y-1.5 text-xs font-mono pointer-events-none border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between text-ink-subtle text-[10px]">
          <span>RECEPTION RELAY STREAM</span>
          <Terminal className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="text-base font-extrabold text-ink">Lanes 01 & 02 Online</div>
        <div
          className={`font-bold transition-all ${
            pulseActive ? "text-emerald-400 scale-105" : "text-primary"
          }`}
        >
          {pulseActive ? "RELAY PULSED (300ms)" : "HMAC SCANNER READY"}
        </div>
        <div className="text-[10px] text-ink-subtle">Dry Contact • 24ms Response</div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 glass-panel p-4 rounded-xl max-w-[240px] space-y-1.5 text-xs font-mono pointer-events-none border border-white/10 shadow-2xl text-right">
        <div className="flex items-center justify-between text-ink-subtle text-[10px]">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>SECURITY POLICY</span>
        </div>
        <div className="text-base font-extrabold text-ink">Anti-Passback</div>
        <div className="text-cyan-400 font-bold">10-Min Lockout Enforced</div>
        <div className="text-[10px] text-ink-subtle">Prevents Token Re-use / Sharing</div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={triggerPulse}
          className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-surface-4 text-ink text-xs font-mono border border-hairline transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Zap className="w-3 h-3 text-primary" /> Test Gate Pulse
        </button>
      </div>
    </div>
  );
}
