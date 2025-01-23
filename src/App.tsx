import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useSnapshot } from "valtio"

import { state } from "~/state"
import { useMVP } from "~/useMVP"

import { Model } from "~/Model"
import { Axes } from "~/Axes"
import { Description } from "~/Description"

import urlDogue from "~/dogue.gltf?url"

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
      <div className="fixed bottom-0 inset-x-0 text-gray-400 p-10 text-sm flex">
        <div className="flex-grow">
          {"Made by "}
          <a
            className="underline hover:text-white"
            href="https://mattrossman.com"
          >
            Matt Rossman
          </a>
        </div>
        <div>
          <a
            className="flex items-center gap-1 underline hover:text-white"
            href="https://github.com/mattrossman/mvp-visually-explained"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              ></path>
            </svg>
            <span>Source</span>
          </a>
        </div>
      </div>
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
        url={urlDogue}
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
