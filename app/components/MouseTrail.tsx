"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";

function MouseFollower() {
    const ref = useRef<THREE.Mesh>(null!);
    const trailRef = useRef<any>(null);
    const { viewport } = useThree();

    // Usamos un ref para guardar la posición del mouse globalmente
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalizar coordenadas de -1 a 1
            mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Colores para la interpolación
    const colorA = useMemo(() => new THREE.Color("#8b5cf6"), []); // Violeta
    const colorB = useMemo(() => new THREE.Color("#60a5fa"), []); // Celeste
    const currentColor = useMemo(() => new THREE.Color("#8b5cf6"), []);

    useFrame(({ clock }) => {
        if (ref.current) {
            // Convertir coordenadas normalizadas del mouse (-1 a 1) a coordenadas del mundo
            const x = (mousePosition.current.x * viewport.width) / 2;
            const y = (mousePosition.current.y * viewport.height) / 2;

            // Interpolación suave para que el movimiento no sea instantáneo
            ref.current.position.x += (x - ref.current.position.x) * 0.1;
            ref.current.position.y += (y - ref.current.position.y) * 0.1;
        }

        // Animar color
        const t = (Math.sin(clock.getElapsedTime() * 2) + 1) / 2; // Oscilar entre 0 y 1
        currentColor.lerpColors(colorA, colorB, t);

        // Actualizar color del Trail manualmente
        if (trailRef.current) {
            trailRef.current.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    if (child.material.color) {
                        child.material.color.copy(currentColor);
                    }
                    if (child.material.uniforms && child.material.uniforms.color) {
                        child.material.uniforms.color.value.copy(currentColor);
                    }
                }
            });
        }
    });

    return (
        <Trail
            ref={trailRef}
            width={0.6} // Más fino
            length={6} // Longitud ajustada
            color={currentColor} // Color animado
            attenuation={(t) => t * t}
        >
            <mesh ref={ref}>
                <sphereGeometry args={[0.001, 16, 16]} />
                <meshBasicMaterial color={currentColor} toneMapped={false} />
            </mesh>
        </Trail>
    );
}

export default function MouseTrail() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[100]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                style={{ pointerEvents: "none" }}
            >
                <MouseFollower />
            </Canvas>
        </div>
    );
}
