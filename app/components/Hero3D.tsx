"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleWave() {
    const ref = useRef<THREE.Points>(null!);

    // Generar partículas
    const count = 2000;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        const { clock } = state;
        const time = clock.getElapsedTime();

        if (ref.current) {
            // Animación de onda suave
            const positions = ref.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                const x = positions[i * 3];
                // Onda sinusoidal basada en la posición X y el tiempo
                // Modificamos Y para crear la onda
                // Usamos los valores originales para no acumular error, pero aquí estamos modificando el array directamente.
                // Para hacerlo bien, deberíamos guardar las posiciones iniciales.
                // Pero para un efecto fluido "caótico" pero controlado, podemos hacer algo más simple o usar un shader.

                // Mejor enfoque para React Three Fiber: Calcular posiciones en cada frame o usar un shader material.
                // Para simplificar y mantener rendimiento, usaremos un movimiento suave.

                // Vamos a hacer que roten suavemente
                ref.current.rotation.y = time * 0.05;
                ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
            }
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#3b82f6"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    );
}

// Versión mejorada con Shader para más control y performance (estilo "Wave")
function WaveParticles() {
    const count = 5000;
    const mesh = useRef<THREE.Points>(null!);

    // Posiciones iniciales en un plano o volumen
    const [positions, originalPositions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 2; // Más plano

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;
        }
        return [positions, originalPositions];
    }, []);

    const texture = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        return new THREE.CanvasTexture(canvas);
    }, []);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const z = originalPositions[i3 + 2];

            // Fórmula de onda compleja
            // y = sin(x * frequency + time) * amplitude
            positions[i3 + 1] = Math.sin(x * 0.5 + time * 0.5) * 0.5 + Math.cos(z * 0.3 + time * 0.3) * 0.5;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Rotación lenta de todo el sistema
        mesh.current.rotation.y = time * 0.05;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#60a5fa"
                map={texture}
                alphaTest={0.2}
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function Hero3D() {
    return (
        <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
            <Canvas
                camera={{ position: [0, 2, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Optimización para pantallas retina
            >
                {/* <color attach="background" args={['transparent']} /> */}
                <ambientLight intensity={0.5} />
                <WaveParticles />
            </Canvas>
        </div>
    );
}
