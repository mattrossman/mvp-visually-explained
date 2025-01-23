import { Gltf, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useSnapshot } from "valtio"

import { state } from "~/state"
import { useMVP } from "~/useMVP"

import { Axes } from "~/Axes"
import { Description } from "~/Description"

export default function App() {
  return (
    <>
      <Canvas
        style={{ position: "fixed", inset: 0, backgroundColor: "#111111" }}
        camera={{ position: [7, 7, 7] }}
      >
        <OrbitControls autoRotate />
        <Axes />
        <gridHelper />

        <Scene />
      </Canvas>
      <Description />
    </>
  )
}

function Scene() {
  const snap = useSnapshot(state)

  const { MVPScene, modelRef, cameraRef } = useMVP({ ...snap.transforms })

  return (
    <MVPScene>
      <ambientLight intensity={0.5 * Math.PI} />
      <pointLight position={[1, 2, 3]} intensity={0.5 * Math.PI} />
      <pointLight position={[1, 2, -3]} intensity={0.5 * Math.PI} />

      {/* https://market.pmnd.rs/model/dogue */}
      <Gltf
        ref={modelRef}
        src="/dogue.gltf"
        position={[2, 0, 0]}
        rotation={[0, -2, 0]}
      />

      <perspectiveCamera
        ref={cameraRef}
        far={10}
        near={1}
        position={[-2, 2, 3]}
        onUpdate={(c) => c.lookAt(2, 1, 0)}
      >
        <axesHelper />
      </perspectiveCamera>
    </MVPScene>
  )
}
