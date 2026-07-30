"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const colors = ["#a855f7", "#7c3aed", "#c084fc", "#6b21a8"];
    const items: { position: [number, number, number]; color: string; index: number }[] = [];
    for (let i = 0; i < 6; i++) {
      items.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 5],
        color: colors[Math.floor(Math.random() * colors.length)],
        index: i,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.02;
    group.current.children.forEach((child, i) => {
      child.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
    });
  });

  return (
    <group ref={group}>
      {shapes.map((shape) => (
        <mesh key={shape.index} position={shape.position} scale={0.3 + Math.random() * 0.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={shape.color} transparent opacity={0.15} wireframe emissive={shape.color} emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={3000} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
