"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, ShieldCheck, Dumbbell, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Kynvelo3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pulseActive, setPulseActive] = useState(false);
  const [fpsReady, setFpsReady] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 5.8);

    // 2. Renderer with pixelRatio cap at 2 and alpha: true
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

    // 3. Lighting (Key Directional + Ambient + Kinetic PointLight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(4, 8, 6);
    scene.add(dirLight);

    const voltPointLight = new THREE.PointLight(0xc6ff00, 3, 12);
    voltPointLight.position.set(0, 1.2, 1.5);
    scene.add(voltPointLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 1.5, 10);
    cyanPointLight.position.set(-2.5, -0.5, 1);
    scene.add(cyanPointLight);

    // 4. Group Object: The Kynvelo Dual-Sided 3D Machine
    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // Material Library
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcdfe4,
      metalness: 0.9,
      roughness: 0.2,
    });

    const obsidianMaterial = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.7,
      roughness: 0.35,
    });

    const voltGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xc6ff00,
      transparent: true,
      opacity: 0.9,
    });

    const glassFlapMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.6,
    });

    // -------------------------------------------------------------
    // 3D OLYMPIC BARBELL ASSEMBLY (Left Side - Athlete Domain)
    // -------------------------------------------------------------
    const barbellGroup = new THREE.Group();
    barbellGroup.position.set(-1.4, 0.4, 0);
    barbellGroup.rotation.z = THREE.MathUtils.degToRad(-15);
    barbellGroup.rotation.y = THREE.MathUtils.degToRad(20);

    // Central Shaft (28mm Olympic bar)
    const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.2, 32);
    shaftGeo.rotateZ(Math.PI / 2);
    const shaftMesh = new THREE.Mesh(shaftGeo, steelMaterial);
    barbellGroup.add(shaftMesh);

    // Left Olympic Plates (50mm hole, calibrated 25kg, 10kg)
    const plate25Geo = new THREE.CylinderGeometry(0.55, 0.55, 0.09, 32);
    plate25Geo.rotateZ(Math.PI / 2);
    const plate25Left = new THREE.Mesh(plate25Geo, obsidianMaterial);
    plate25Left.position.x = -1.1;
    barbellGroup.add(plate25Left);

    // Plate Volt Rim
    const rimGeo = new THREE.TorusGeometry(0.54, 0.015, 16, 48);
    rimGeo.rotateY(Math.PI / 2);
    const rimLeft = new THREE.Mesh(rimGeo, voltGlowMaterial);
    rimLeft.position.x = -1.1;
    barbellGroup.add(rimLeft);

    const plate10Geo = new THREE.CylinderGeometry(0.42, 0.42, 0.07, 32);
    plate10Geo.rotateZ(Math.PI / 2);
    const plate10Left = new THREE.Mesh(plate10Geo, obsidianMaterial);
    plate10Left.position.x = -1.22;
    barbellGroup.add(plate10Left);

    // Right Olympic Plates
    const plate25Right = new THREE.Mesh(plate25Geo, obsidianMaterial);
    plate25Right.position.x = 1.1;
    barbellGroup.add(plate25Right);

    const rimRight = new THREE.Mesh(rimGeo, voltGlowMaterial);
    rimRight.position.x = 1.1;
    barbellGroup.add(rimRight);

    const plate10Right = new THREE.Mesh(plate10Geo, obsidianMaterial);
    plate10Right.position.x = 1.22;
    barbellGroup.add(plate10Right);

    machineGroup.add(barbellGroup);

    // -------------------------------------------------------------
    // 3D KINETIC TURNSTILE GATE (Right Side - Gym Owner Domain)
    // -------------------------------------------------------------
    const turnstileGroup = new THREE.Group();
    turnstileGroup.position.set(1.4, -0.3, 0);
    turnstileGroup.rotation.y = THREE.MathUtils.degToRad(-25);

    // Pedestal Post
    const pedestalGeo = new THREE.BoxGeometry(0.45, 1.8, 0.75);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, obsidianMaterial);
    turnstileGroup.add(pedestalMesh);

    // Top Scanner Glass Bezel
    const scannerGlassGeo = new THREE.BoxGeometry(0.42, 0.04, 0.7);
    const scannerGlassMesh = new THREE.Mesh(scannerGlassGeo, steelMaterial);
    scannerGlassMesh.position.y = 0.92;
    turnstileGroup.add(scannerGlassMesh);

    // Optical Laser Reticle Beam (Pulses in Volt / Emerald)
    const laserBeamGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 16);
    laserBeamGeo.rotateZ(Math.PI / 2);
    const laserBeamMesh = new THREE.Mesh(laserBeamGeo, voltGlowMaterial);
    laserBeamMesh.position.set(0, 0.94, 0);
    turnstileGroup.add(laserBeamMesh);

    // Glass Barrier Flaps
    const flapGeo = new THREE.BoxGeometry(0.04, 0.7, 0.55);
    const flapMesh = new THREE.Mesh(flapGeo, glassFlapMaterial);
    flapMesh.position.set(-0.35, 0.25, 0);
    turnstileGroup.add(flapMesh);

    machineGroup.add(turnstileGroup);

    // -------------------------------------------------------------
    // 3D CYBERNETIC TELEMETRY PARTICLE CONSTELLATION
    // -------------------------------------------------------------
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc6ff00,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // MOUSE POINTER INTERACTION & LERP RIG
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener("pointermove", handlePointerMove);

    // -------------------------------------------------------------
    // ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Camera / Machine Rotation
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.3;

      machineGroup.rotation.y += (targetX - machineGroup.rotation.y) * 0.06;
      machineGroup.rotation.x += (-targetY - machineGroup.rotation.x) * 0.06;

      // Idle Kinematics
      barbellGroup.position.y = 0.4 + Math.sin(elapsedTime * 1.5) * 0.04;
      laserBeamMesh.rotation.x = Math.sin(elapsedTime * 3) * 0.2;

      // Particle Drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      // Laser intensity pulse
      voltPointLight.intensity = 2.5 + Math.sin(elapsedTime * 4) * 0.8;

      renderer.render(scene, camera);
      if (!fpsReady) setFpsReady(true);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);

      shaftGeo.dispose();
      plate25Geo.dispose();
      plate10Geo.dispose();
      rimGeo.dispose();
      pedestalGeo.dispose();
      scannerGlassGeo.dispose();
      laserBeamGeo.dispose();
      flapGeo.dispose();
      particleGeo.dispose();

      steelMaterial.dispose();
      obsidianMaterial.dispose();
      voltGlowMaterial.dispose();
      glassFlapMaterial.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const triggerCheckInPulse = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1200);
  };

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel-elevated select-none group border border-white/10">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        onClick={triggerCheckInPulse}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <Badge variant="primary" className="font-mono text-[10px] gap-1 px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          WEBGL 3D KINETIC ENGINE
        </Badge>
        <span className="text-[11px] font-mono text-ink-subtle hidden sm:inline-block">
          ● Drag to rotate • Click model to simulate turnstile entry
        </span>
      </div>

      {/* Floating Spatial HUD Node Left (Athlete Metric) */}
      <div className="absolute bottom-6 left-6 z-20 glass-panel p-3.5 rounded-xl max-w-[210px] space-y-1 text-xs font-mono pointer-events-none border border-white/10 shadow-2xl animate-in fade-in">
        <div className="flex items-center justify-between text-ink-subtle text-[10px]">
          <span>ATHLETE TELEMETRY</span>
          <Dumbbell className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="text-sm font-bold text-ink">Barbell Bench Press</div>
        <div className="text-primary font-bold">82.5 kg × 8 Reps (+2.5kg PR)</div>
        <div className="text-[10px] text-ink-subtle">Olympic Bar (20kg) + 31.25kg/side</div>
      </div>

      {/* Floating Spatial HUD Node Right (Turnstile Status) */}
      <div className="absolute bottom-6 right-6 z-20 glass-panel p-3.5 rounded-xl max-w-[220px] space-y-1 text-xs font-mono pointer-events-none border border-white/10 shadow-2xl text-right animate-in fade-in">
        <div className="flex items-center justify-between text-ink-subtle text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>RECEPTION RELAY</span>
        </div>
        <div className="text-sm font-bold text-ink">Gate 01 Main Turnstile</div>
        <div
          className={`font-bold transition-colors ${
            pulseActive ? "text-emerald-400 scale-105" : "text-primary"
          }`}
        >
          {pulseActive ? "ACCESS GRANTED (300ms)" : "HMAC SCANNER READY"}
        </div>
        <div className="text-[10px] text-ink-subtle">TCP/IP Relay • 10-Min Anti-Passback</div>
      </div>

      {/* Center Prompt */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={triggerCheckInPulse}
          className="px-3 py-1.5 rounded-lg bg-surface-3 hover:bg-surface-4 text-ink text-xs font-mono border border-hairline transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Zap className="w-3 h-3 text-primary" /> Test Gate Pulse
        </button>
      </div>
    </div>
  );
}
