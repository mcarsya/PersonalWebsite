import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Field({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const inertia = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 11;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-1.6 * dt);
    inertia.current.x += (state.pointer.y * 0.3 - inertia.current.x) * k;
    inertia.current.y += (state.pointer.x * 0.45 - inertia.current.y) * k;
    const mesh = points.current;
    if (!mesh) return;
    mesh.rotation.x = inertia.current.x;
    mesh.rotation.y += dt * 0.025;
    mesh.rotation.z = inertia.current.y * 0.12;
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.3;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color="#9fd9e6"
        transparent
        opacity={0.62}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AmbientField() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={mobile ? 1 : [1, 1.6]}
      camera={{ position: [0, 0, 15], fov: 55 }}
      gl={{ antialias: !mobile, powerPreference: "low-power" }}
    >
      <Field count={mobile ? 420 : 1400} />
    </Canvas>
  );
}
