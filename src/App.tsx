import { useRef } from "react"
import { Gltf, OrbitControls, TorusKnot } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export default function App() {
  return (
    <Canvas style={{ position: "fixed", inset: 0 }}>
      <color attach="background" args={["black"]} />
      <OrbitControls />

      <Scene />
    </Canvas>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5 * Math.PI} />
      <pointLight position={[1, 2, 3]} intensity={0.5 * Math.PI} />
      <pointLight position={[1, 2, -3]} intensity={0.5 * Math.PI} />

      {/* https://market.pmnd.rs/model/dogue */}
      <Gltf src="/dogue.gltf" position={[2, 0, 0]} rotation={[0, -2, 0]} />
    </>
  )
}
