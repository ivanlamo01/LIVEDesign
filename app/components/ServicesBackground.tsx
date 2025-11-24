"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function FloatingShapes() {
    return (
        <group>
            <Float speed={2} rotationIntensity={0} floatIntensity={2}>
                <mesh position={[4, 2, -5]} scale={2}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>
            <Float speed={2} rotationIntensity={0} floatIntensity={1}>
                <mesh position={[-4, -2, -6]} scale={3}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>
            <Float speed={2} rotationIntensity={0} floatIntensity={1.5}>
                <mesh position={[2, -3, -4]} scale={1.5}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>
        </group>
    );
}

export default function ServicesBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.8} />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
