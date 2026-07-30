"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function GalaxyParticles() {
  // Reduced from 4000 → 1500 particles — still visually rich, much cheaper
  const count = 1500;
  const ref = useRef<THREE.Points>(null);
  // Use a ref for mouse instead of attaching to every mousemove — no re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const rafPending = useRef(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        rafPending.current = false;
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    // Seeded "random" so it's deterministic (no hydration issues)
    let s = 12345;
    const rng = () => { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s / 0x7fffffff; };
    for (let i = 0; i < count; i++) {
      const radius = rng() * 10 + 0.5;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      pos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi) * 0.3;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const t = radius / 10;
      col[i * 3]     = 0.5 + t * 0.5;
      col[i * 3 + 1] = 0.2 + t * 0.3;
      col[i * 3 + 2] = 0.7 + t * 0.3;
      siz[i] = rng() * 3 + 0.5;
    }
    return [pos, col, siz];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02 + mouse.current.x * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.04 + mouse.current.y * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.65}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function MouseGlow() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafPending = useRef(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 4;
        mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -3;
        rafPending.current = false;
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.position.x += (mouse.current.x - mesh.current.position.x) * 0.04;
    mesh.current.position.y += (mouse.current.y - mesh.current.position.y) * 0.04;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -1]}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.035}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Minimal dust — reduced from 200 → 80 particles
function DustParticles() {
  const count = 80;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let s = 99999;
    const rng = () => { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s / 0x7fffffff; };
    for (let i = 0; i < count * 3; i++) pos[i] = (rng() - 0.5) * 20;
    return pos;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        transparent
        opacity={0.12}
        color="#c084fc"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const { gl } = useThree();
  useEffect(() => {
    // Cap pixel ratio at 1 for the 3D background — not perceptible at this scale
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  }, [gl]);

  return (
    <>
      <GalaxyParticles />
      <MouseGlow />
      <DustParticles />
    </>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0" style={{ willChange: "transform" }}>
      <Canvas
        camera={{ position: [0, 1, 10], fov: 60 }}
        // frameloop="demand" would be ideal but we need continuous rotation
        // dpr capped at 1 inside Scene
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
