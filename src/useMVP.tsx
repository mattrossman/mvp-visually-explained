import { useLayoutEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useHelper } from "@react-three/drei"
import { useSpring } from "@react-spring/three"
import * as THREE from "three"

// Scratch variables
const identity = new THREE.Matrix4()
const mat4 = new THREE.Matrix4()
const flat = new THREE.Matrix4()
  .makeScale(2.5, 2.5, -0.01)
  .setPosition(2.5, 2.5, 0)

type UseMVPProps = {
  model: boolean
  view: boolean
  projection: boolean
  screen: boolean
}

export function useMVP({ model, view, projection, screen }: UseMVPProps) {
  const modelRef = useRef<THREE.Group>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const sceneRef = useRef<THREE.Group>(null)

  // Visualize camera frustum and view plane
  useHelper(
    cameraRef as React.MutableRefObject<THREE.PerspectiveCamera>,
    THREE.CameraHelper,
  )

  // Matrices to apply
  const { modelMatrix, modelMatrixInverse, viewMatrix, projectionMatrix } =
    useMemo(() => {
      const modelMatrix = new THREE.Matrix4()
      const modelMatrixInverse = new THREE.Matrix4()
      const viewMatrix = new THREE.Matrix4()
      const projectionMatrix = new THREE.Matrix4()
      return { modelMatrix, modelMatrixInverse, viewMatrix, projectionMatrix }
    }, [])

  useLayoutEffect(() => {
    if (!sceneRef.current || !modelRef.current || !cameraRef.current) return

    // Reset scene transforms so we can capture the original matrices
    sceneRef.current.matrix.identity()

    // Make sure matrices are up to date
    sceneRef.current.updateMatrixWorld()
    cameraRef.current.updateProjectionMatrix()

    // Save matrices
    modelMatrix.copy(modelRef.current.matrixWorld)
    modelMatrixInverse.copy(modelMatrix).invert()
    viewMatrix.copy(cameraRef.current.matrixWorldInverse)
    projectionMatrix.copy(cameraRef.current.projectionMatrix)
  }, [modelMatrix, modelMatrixInverse, projectionMatrix, viewMatrix])

  const spring = useSpring({
    model: Number(model),
    view: Number(view),
    projection: Number(projection),
    screen: Number(screen),
  })

  useFrame(() => {
    if (!sceneRef.current) return

    sceneRef.current.matrix.copy(modelMatrixInverse)

    lerpMatrix(identity, modelMatrix, spring.model.get(), mat4)
    sceneRef.current.matrix.premultiply(mat4)

    lerpMatrix(identity, viewMatrix, spring.view.get(), mat4)
    sceneRef.current.matrix.premultiply(mat4)

    lerpMatrix(identity, projectionMatrix, spring.projection.get(), mat4)
    sceneRef.current.matrix.premultiply(mat4)

    lerpMatrix(identity, flat, spring.screen.get(), mat4)
    sceneRef.current.matrix.premultiply(mat4)
  })

  const MVPScene = ({ children }: { children?: React.ReactNode }) => (
    <group matrixAutoUpdate={false} ref={sceneRef} children={children} />
  )
  return { MVPScene, modelRef, cameraRef }
}

function lerpMatrix(
  a: THREE.Matrix4,
  b: THREE.Matrix4,
  t: number,
  out: THREE.Matrix4,
) {
  for (let i = 0; i < out.elements.length; ++i) {
    out.elements[i] = lerp(a.elements[i], b.elements[i], t)
  }
}

function lerp(x: number, y: number, t: number) {
  return (1 - t) * x + t * y
}
