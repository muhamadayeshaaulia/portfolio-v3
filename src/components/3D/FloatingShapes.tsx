import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface FloatingShapeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  shape: 'sphere' | 'box' | 'torus';
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ position, rotation = [0, 0, 0], color, shape }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  const ShapeComponent = shape === 'sphere' ? Sphere : shape === 'box' ? Box : Torus;

  return (
    <ShapeComponent ref={meshRef} position={position} args={shape === 'torus' ? [0.5, 0.2, 8, 16] : [0.5, 0.5, 0.5]}>
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </ShapeComponent>
  );
};

const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const getParticleColor = () => {
    switch (theme) {
      case 'cyberpunk':
        return '#ff00ff';
      case 'ocean':
        return '#00ffff';
      case 'light':
        return '#3b82f6';
      default:
        return '#ffffff';
    }
  };

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={getParticleColor()} size={0.02} />
    </points>
  );
};

export const FloatingShapes: React.FC = () => {
  const { theme } = useTheme();

  const getShapeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return ['#ff00ff', '#00ffff', '#ff0080'];
      case 'ocean':
        return ['#0ea5e9', '#06b6d4', '#14b8a6'];
      case 'light':
        return ['#3b82f6', '#8b5cf6', '#14b8a6'];
      default:
        return ['#3b82f6', '#8b5cf6', '#14b8a6'];
    }
  };

  const colors = getShapeColors();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Particles />
        
        <FloatingShape position={[-2, 1, 0]} color={colors[0]} shape="sphere" rotation={[0.1, 0.2, 0]} />
        <FloatingShape position={[2, -1, 0]} color={colors[1]} shape="box" rotation={[0.2, 0.1, 0.3]} />
        <FloatingShape position={[0, 2, -1]} color={colors[2]} shape="torus" rotation={[0.3, 0.2, 0.1]} />
        <FloatingShape position={[-3, -2, 1]} color={colors[0]} shape="sphere" rotation={[0.2, 0.3, 0.1]} />
        <FloatingShape position={[3, 1, -2]} color={colors[1]} shape="box" rotation={[0.1, 0.3, 0.2]} />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};