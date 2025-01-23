import { useGLTF } from "@react-three/drei"
import React, { forwardRef } from "react"

interface ModelProps extends React.ComponentProps<"group"> {
  url: string
}

export const Model = forwardRef<THREE.Group, ModelProps>(
  ({ url, ...props }, ref) => {
    const { scene } = useGLTF(url)
    return (
      <group {...props}>
        <primitive ref={ref} object={scene} />
      </group>
    )
  },
)
