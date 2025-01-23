export const pages = [
  `
  # Visually Explained: **MVP Transformations**

  A vertex shader in Three.js typically includes a line like:
  ~~~glsl
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  ~~~
  The goal of this line is to move each vertex into a specific coordinate system that WebGL/OpenGL knows how to transfer to the screen.
  This involves three core matrices (a model, view, and projection matrix), the composition of which is often called an **MVP matrix**.
  It looks complicated at first, but let's visualize each part to help build an intuition for what is happening and why.

  Let's say we're writing a shader for this dog. Our vertex positions start in **model space**, relative to the dog. These are stored in the shader's \`position\` attribute.
  
  Use the buttons at the top to start applying transformations.
  `,
  `
  # M for Model

  First, we apply the \`modelMatrix\` to our coordinates which transforms them from model space to **world space**.
  In world space, vertices are positioned relative to the scene origin. This is probably how you're used to visualizing things in the scene.

  In Three.js, the \`modelMatrix\` corresponds to \`Object3D.matrixWorld\`
  `,
  `
  # V for View

  Next, we apply the \`viewMatrix\` which transforms coordinates from world space to **camera space**.
  In camera space (also called view space or eye space), the camera is treated as the origin and everything else is positioned relative to it.
  
  In Three.js, the \`viewMatrix\` corresponds to \`Camera.matrixWorldInverse\`

  You may have noticed that \`modelMatrix\` and \`viewMatrix\` aren't directly referenced in the code shown earlier.
  Instead we can use \`modelViewMatrix\` which is equivalent to \`viewMatrix * modelMatrix\`.
  `,
  `
  # P for Projection

  Lastly, we apply the \`projectionMatrix\` which transforms coordinates from camera space to **clip space**.
  Here, we visualize clip space in **NDC (normalized device coordinates)**, which normalizes the 4D coordinates by their W component.

  In Three.js, the \`projectionMatrix\` corresponds to \`Camera.projectionMatrix\`. In the case of this perspective camera, the projection matrix is derived from parameters such as focal length, aspect ratio, and near/far clipping planes.

  Notice that the yellow camera frustum now occupies a box from -1 to 1. Anything outside this range will be clipped before fragments are created, and points with smaller Z values will be displayed on top.
  `,
  `
  # Wrapping up

  The vertex shader ends at clip space, but later down the pipeline these clip space coordinates are normalized and mapped to screen coordinates.

  We can simulate this step by flattening the viewing box and flipping the Z axis so that higher Z values are shown on top.
  This leaves us with a 2D representation of our scene from the camera's point of view, approximating what you'd see on the screen.

  ## References

  [\`THREE.WebGLProgram\`](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/webgl/WebGLProgram) (full list of built-in uniforms and attributes)

  [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection) *"WebGL model view projection"*

  [Learn OpenGL](https://learnopengl.com/Getting-started/Coordinate-Systems) *"Coordinate Systems"*

  `,
]
