import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useSnapshot } from "valtio"

import { state } from "~/state"
import { useMVP } from "~/useMVP"

import { Model } from "~/Model"
import { Axes } from "~/Axes"
import { Description } from "~/Description"

export default function App() {
  return (
    <>
      <Canvas
        style={{ position: "fixed", inset: 0, backgroundColor: "#111111" }}
        camera={{ position: [7, 7, 7] }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <OrbitControls autoRotate />
          <Axes />

          <gridHelper />
          <Scene />
        </Suspense>
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
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 2, 3]} intensity={0.5} />
      <pointLight position={[1, 2, -3]} intensity={0.5} />

      {/* https://market.pmnd.rs/model/dogue */}
      <Model
        ref={modelRef}
        url="/dogue.gltf"
        position={[2, 0, 0]}
        rotation={[0, -2, 0]}
      />

      <perspectiveCamera
        ref={cameraRef}
        far={10}
        near={1}
        position={[-2, 2, 3]}
        onUpdate={(c) => c.lookAt(2, 1, 0)}
      />
    </MVPScene>
  )
}
