import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FluidBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 20);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;

      // Morph vertices for organic movement
      const positions = meshRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        const offset = Math.sin(x * 2 + time * 0.5) * 0.1 +
          Math.sin(y * 2 + time * 0.3) * 0.1 +
          Math.sin(z * 2 + time * 0.4) * 0.1;

        const length = Math.sqrt(x * x + y * y + z * z);
        const scale = (2 + offset * 0.5) / length;

        positions.setXYZ(i, x * scale, y * scale, z * scale);
      }
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#c9a962"
          attenuationColor="#1a1a1a"
          attenuationDistance={0.5}
        />
      </mesh>
    </Float>
  );
}

function GoldenRing({ radius, thickness }: { radius: number; thickness: number }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 64, 128]} />
      <meshStandardMaterial
        color="#c9a962"
        metalness={0.9}
        roughness={0.1}
        emissive="#c9a962"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Gold to cream gradient
      const t = Math.random();
      colors[i * 3] = 0.78 + t * 0.1;
      colors[i * 3 + 1] = 0.66 + t * 0.2;
      colors[i * 3 + 2] = 0.38 + t * 0.3;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const fov = isMobile ? 70 : 35; // Increased FOV for mobile to 70 for wider view
  const cameraZ = isMobile ? 12 : 8; // Move camera further back on mobile

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: fov }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 8, 20]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#c9a962" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#e8d5b5" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#c9a962" />

        <FluidBlob />
        <GoldenRing radius={3.5} thickness={0.02} />
        <GoldenRing radius={4} thickness={0.015} />
        <FloatingParticles />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}