"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import {
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

/* =========================================
   CORE
========================================= */

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    const targetX =
      time * 0.12 + state.pointer.y * 0.08;

    const targetY =
      time * 0.18 + state.pointer.x * 0.08;

    meshRef.current.rotation.x +=
      (targetX - meshRef.current.rotation.x) * 0.025;

    meshRef.current.rotation.y +=
      (targetY - meshRef.current.rotation.y) * 0.025;
  });

  return (
    <Float
      speed={1.15}
      rotationIntensity={0.35}
      floatIntensity={1.05}
    >
      <Sphere
        ref={meshRef}
        args={[1.65, 96, 96]}
        scale={1.08}
      >
        <MeshDistortMaterial
          color="#c7a66a"
          roughness={0.22}
          metalness={0.82}
          distort={0.22}
          speed={1.25}
        />
      </Sphere>
    </Float>
  );
}

/* =========================================
   INNER GLOW
========================================= */

function InnerGlow() {
  return (
    <mesh>
      <sphereGeometry args={[1.72, 64, 64]} />

      <meshBasicMaterial
        color="#e3c98e"
        transparent
        opacity={0.045}
        depthWrite={false}
      />
    </mesh>
  );
}

/* =========================================
   RINGS
========================================= */

function Rings() {
  const groupRef =
    useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    groupRef.current.rotation.z =
      time * 0.055;

    groupRef.current.rotation.x =
      Math.sin(time * 0.22) * 0.07;

    groupRef.current.rotation.y =
      Math.cos(time * 0.18) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Main white ring */}

      <mesh
        rotation={[
          Math.PI / 2.3,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.25,
            0.009,
            16,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Gold ring */}

      <mesh
        rotation={[
          Math.PI / 2.8,
          0.4,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.65,
            0.007,
            16,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#c7a66a"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Outer ring */}

      <mesh
        rotation={[
          Math.PI / 3,
          -0.3,
          0,
        ]}
      >
        <torusGeometry
          args={[
            3.05,
            0.0045,
            16,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.085}
          depthWrite={false}
        />
      </mesh>

      {/* Very subtle fourth ring */}

      <mesh
        rotation={[
          Math.PI / 2.1,
          -0.6,
          0.5,
        ]}
      >
        <torusGeometry
          args={[
            3.45,
            0.003,
            12,
            160,
          ]}
        />

        <meshBasicMaterial
          color="#c7a66a"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================
   PARTICLES
========================================= */

function Particles() {
  const pointsRef =
    useRef<THREE.Points>(null);

  const particles = 380;

  const positions = useMemo(() => {
    const data = new Float32Array(
      particles * 3
    );

    for (let i = 0; i < particles; i++) {
      const radius =
        3.5 + Math.random() * 3.5;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      data[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      data[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      data[i * 3 + 2] =
        radius * Math.cos(phi);
    }

    return data;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time =
      state.clock.getElapsedTime();

    pointsRef.current.rotation.y =
      time * 0.012;

    pointsRef.current.rotation.x =
      Math.sin(time * 0.08) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
       <bufferAttribute
  attach="attributes-position"
  args={[positions, 3]}
/>
      </bufferGeometry>

      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.38}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================
   LIGHTING
========================================= */

function Scene() {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={2.4}
      />

      <pointLight
        position={[-4, -2, 3]}
        intensity={10}
        color="#c7a66a"
      />

      <pointLight
        position={[3, 1, -2]}
        intensity={3}
        color="#ffffff"
      />

      <Core />

      <InnerGlow />

      <Rings />

      <Particles />
    </>
  );
}

/* =========================================
   HERO SCENE
========================================= */

export default function HeroScene() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        right-[-38%]
        top-[58%]
        z-0
        h-[390px]
        w-[390px]
        -translate-y-1/2
        opacity-45

        sm:right-[-25%]
        sm:h-[460px]
        sm:w-[460px]
        sm:opacity-55

        md:right-[-4%]
        md:top-1/2
        md:h-[650px]
        md:w-[650px]
        md:opacity-100

        lg:right-[0%]
        lg:h-[700px]
        lg:w-[700px]
      "
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 42,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}