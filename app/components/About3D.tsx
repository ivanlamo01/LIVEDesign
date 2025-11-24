"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere() {
    const meshRef = useRef<THREE.Points>(null!);
    const count = 2500;

    // Generar partículas en forma de esfera
    const [positions, originalPositions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Distribución esférica usando coordenadas esféricas
            const radius = 2.5 + Math.random() * 0.5;
            const theta = Math.random() * Math.PI * 2; // ángulo horizontal
            const phi = Math.acos((Math.random() * 2) - 1); // ángulo vertical

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;
        }
        return [positions, originalPositions];
    }, []);

    // Crear textura circular para las partículas
    const texture = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);

        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (meshRef.current) {
            // Efecto de respiración: expandir y contraer la esfera
            const breathScale = 1 + Math.sin(time * 0.5) * 0.1;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Aplicar escala de respiración
                positions[i3] = originalPositions[i3] * breathScale;
                positions[i3 + 1] = originalPositions[i3 + 1] * breathScale;
                positions[i3 + 2] = originalPositions[i3 + 2] * breathScale;

                // Agregar un poco de movimiento ondulatorio
                const wave = Math.sin(time * 0.3 + originalPositions[i3] * 0.5) * 0.03;
                positions[i3 + 1] += wave;
            }

            meshRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#a855f7"
                map={texture}
                alphaTest={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function About3D() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#a855f7" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
                <ParticleSphere />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.5}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}
