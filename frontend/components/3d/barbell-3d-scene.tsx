"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Dumbbell, Zap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Barbell3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePr, setActivePr] = useState(false);

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
    camera.position.set(0, 1.2, 4.8);

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

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const voltLight = new THREE.PointLight(0xc6ff00, 3.5, 10);
    voltLight.position.set(0, 1.5, 2);
    scene.add(voltLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.8);
    rimLight.position.set(-5, -2, -2);
    scene.add(rimLight);

    // 4. Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcdfe4,
      metalness: 0.95,
      roughness: 0.2,
    });

    const plateObsidian = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.6,
      roughness: 0.35,
    });

    const voltRimMat = new THREE.MeshBasicMaterial({
      color: 0xc6ff00,
      transparent: true,
      opacity: 0.9,
    });

    // 5. Procedural Olympic Barbell
    const barbell = new THREE.Group();
    scene.add(barbell);

    // Central Shaft (28mm Olympic 20kg Bar)
    const shaftGeo = new THREE.CylinderGeometry(0.045, 0.045, 3.6, 32);
    shaftGeo.rotateZ(Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeo, steelMaterial);
    barbell.add(shaft);

    // Collars
    const collarGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 32);
    collarGeo.rotateZ(Math.PI / 2);

    const collarL = new THREE.Mesh(collarGeo, steelMaterial);
    collarL.position.x = -1.0;
    barbell.add(collarL);

    const collarR = new THREE.Mesh(collarGeo, steelMaterial);
    collarR.position.x = 1.0;
    barbell.add(collarR);

    // Left Plates (Calibrated 25kg + 10kg)
    const plate25Geo = new THREE.CylinderGeometry(0.65, 0.65, 0.12, 32);
    plate25Geo.rotateZ(Math.PI / 2);

    const p25L = new THREE.Mesh(plate25Geo, plateObsidian);
    p25L.position.x = -1.15;
    barbell.add(p25L);

    const rimGeo = new THREE.TorusGeometry(0.64, 0.018, 16, 48);
    rimGeo.rotateY(Math.PI / 2);
    const rimL = new THREE.Mesh(rimGeo, voltRimMat);
    rimL.position.x = -1.15;
    barbell.add(rimL);

    const plate10Geo = new THREE.CylinderGeometry(0.5, 0.5, 0.09, 32);
    plate10Geo.rotateZ(Math.PI / 2);
    const p10L = new THREE.Mesh(plate10Geo, plateObsidian);
    p10L.position.x = -1.3;
    barbell.add(p10L);

    // Right Plates
    const p25R = new THREE.Mesh(plate25Geo, plateObsidian);
    p25R.position.x = 1.15;
    barbell.add(p25R);

    const rimR = new THREE.Mesh(rimGeo, voltRimMat);
    rimR.position.x = 1.15;
    barbell.add(rimR);

    const p10R = new THREE.Mesh(plate10Geo, plateObsidian);
    p10R.position.x = 1.3;
    barbell.add(p10R);

    // Particle field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc6ff00,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Pointer lerp
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener("pointermove", onPointerMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      barbell.rotation.y += (mouseX * 0.5 - barbell.rotation.y) * 0.05;
      barbell.rotation.x += (-mouseY * 0.4 - barbell.rotation.x) * 0.05;

      barbell.position.y = Math.sin(elapsed * 1.5) * 0.06;
      barbell.rotation.z = Math.sin(elapsed * 0.8) * 0.04;

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

      shaftGeo.dispose();
      collarGeo.dispose();
      plate25Geo.dispose();
      plate10Geo.dispose();
      rimGeo.dispose();
      particleGeo.dispose();

      steelMaterial.dispose();
      plateObsidian.dispose();
      voltRimMat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const triggerPrPulse = () => {
    setActivePr(true);
    setTimeout(() => setActivePr(false), 1200);
  };

  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden glass-panel-elevated select-none group border border-white/10">
      <div
        ref={mountRef}
        onClick={triggerPrPulse}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top HUD Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <Badge variant="primary" className="font-mono text-[10px] gap-1 px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          OLYMPIC BARBELL PHYSICS ENGINE
        </Badge>
        <span className="text-[11px] font-mono text-ink-subtle hidden sm:inline-block">
          ● Drag to rotate • Click barbell to test PR pulse
        </span>
      </div>

      {/* Left Spatial Badge: Current Set & Plate Math */}
      <div className="absolute bottom-6 left-6 z-20 glass-panel p-4 rounded-xl max-w-[240px] space-y-1.5 text-xs font-mono pointer-events-none border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between text-ink-subtle text-[10px]">
          <span>CALCULATED LOAD</span>
          <Dumbbell className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="text-base font-extrabold text-ink">90.0 kg Barbell Load</div>
        <div className="text-primary font-bold">1 × 25kg + 1 × 10kg / sleeve</div>
        <div className="text-[10px] text-ink-subtle">Olympic Bar (20kg) + 35kg/side</div>
      </div>

      {/* Right Spatial Badge: CSCS Overload Target */}
      <div className="absolute bottom-6 right-6 z-20 glass-panel p-4 rounded-xl max-w-[240px] space-y-1.5 text-xs font-mono pointer-events-none border border-white/10 shadow-2xl text-right">
        <div className="flex items-center justify-between text-ink-subtle text-[10px]">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROGRESSIVE OVERLOAD</span>
        </div>
        <div className="text-base font-extrabold text-ink">Session Target PR</div>
        <div
          className={`font-bold transition-all ${
            activePr ? "text-emerald-400 scale-105" : "text-cyan-400"
          }`}
        >
          {activePr ? "+2.5kg PR ACHIEVED!" : "82.5kg × 8 Reps (+2.5kg Target)"}
        </div>
        <div className="text-[10px] text-ink-subtle">RPE 8.5 • 90s Rest Countdown</div>
      </div>

      {/* Button top right */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={triggerPrPulse}
          className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-surface-4 text-ink text-xs font-mono border border-hairline transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Zap className="w-3 h-3 text-primary" /> Hit PR Pulse
        </button>
      </div>
    </div>
  );
}
