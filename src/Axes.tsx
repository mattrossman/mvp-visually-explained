import { Cylinder } from "@react-three/drei"

export function Axes(props: React.ComponentProps<"group">) {
  return (
    <group {...props}>
      <Arrow color="red" />
      <Arrow color="blue" rotation-y={-Math.PI / 2} />
      <Arrow color="green" rotation-z={Math.PI / 2} />
    </group>
  )
}

interface ArrowProps extends React.ComponentProps<"group"> {
  color: React.ComponentProps<"meshBasicMaterial">["color"]
}

function Arrow({ color, ...props }: ArrowProps) {
  return (
    <group {...props}>
      <Cylinder
        args={[0.03, 0.03, 5]}
        position-x={2.5}
        rotation-z={Math.PI / 2}
      >
        <meshBasicMaterial color={color} />
      </Cylinder>
      <Cylinder args={[0.2, 0, 0.5]} position-x={5} rotation-z={Math.PI / 2}>
        <meshBasicMaterial color={color} />
      </Cylinder>
    </group>
  )
}
