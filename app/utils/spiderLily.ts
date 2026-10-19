import * as THREE from 'three'

/** Adapted botanical construction from https://github.com/cupidbity/spiderlily
 * Curled ribbon tepals and hooked filaments are retained; the hand-tracking,
 * recursive plant, webcam and postprocessing are replaced by a single hero study.
 */
export function createSpiderLily() {
  const group = new THREE.Group()
  const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xd50922, metalness: .35, roughness: .3, side: THREE.DoubleSide })
  const filamentMaterial = new THREE.MeshStandardMaterial({ color: 0xf01830, metalness: .3, roughness: .32 })
  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x860a1d, metalness: .35, roughness: .36 })
  const antherMaterial = new THREE.MeshStandardMaterial({ color: 0xff243b, metalness: .4, roughness: .28 })
  const rows = 32
  const cols = 8
  const petalGeometry = new THREE.BufferGeometry()
  const vertices = new Float32Array((rows + 1) * (cols + 1) * 3)
  petalGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  const indices: number[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const a = row * (cols + 1) + col
      const b = a + cols + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }
  petalGeometry.setIndex(indices)
  const updatePetals = (curl: number) => {
    let y = 0
    let z = 0
    let index = 0
    for (let row = 0; row <= rows; row++) {
      const t = row / rows
      const width = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.08)), .85)
      for (let col = 0; col <= cols; col++) {
        const u = col / cols - .5
        const edge = Math.abs(u) * 2
        vertices[index++] = u * .095 * width
        vertices[index++] = y
        vertices[index++] = z + .016 * edge * Math.sin(t * Math.PI * 8) - edge * .006 * width
      }
      const angle = THREE.MathUtils.degToRad(curl) * Math.pow(t, 2.6)
      y += Math.cos(angle) * .52 / rows
      z += Math.sin(angle) * .52 / rows
    }
    petalGeometry.attributes.position!.needsUpdate = true
    petalGeometry.computeVertexNormals()
    petalGeometry.computeBoundingSphere()
  }
  const pathPoints = [new THREE.Vector3()]
  const walker = new THREE.Vector3()
  for (let i = 1; i <= 24; i++) {
    const t = i / 24
    const angle = THREE.MathUtils.degToRad(75 * t - 115 * Math.pow(t, 3.4))
    walker.y += Math.cos(angle) * .676 / 24
    walker.z += Math.sin(angle) * .676 / 24
    pathPoints.push(walker.clone())
  }
  const filamentGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pathPoints), 32, .0035, 6, false)
  const antherGeometry = new THREE.SphereGeometry(.009, 10, 6)
  const pedicelGeometry = new THREE.CylinderGeometry(.0073, .011, .2, 8)
  const petals: { pivot: THREE.Group, azimuth: number }[] = []
  const stamens: { pivot: THREE.Group, filament: THREE.Mesh, anther: THREE.Mesh, tilt: number, length: number, delay: number }[] = []
  const head = new THREE.Group()
  head.position.y = .55
  group.add(head)
  // Three outward-facing florets form a single Lycoris umbel.
  for (let floret = 0; floret < 3; floret++) {
    const stalk = new THREE.Group()
    stalk.rotation.order = 'YXZ'
    stalk.rotation.y = floret / 3 * Math.PI * 2 + .35
    stalk.rotation.x = THREE.MathUtils.degToRad(58 + Math.sin(floret * 12) * 4)
    head.add(stalk)
    const pedicel = new THREE.Mesh(pedicelGeometry, stemMaterial)
    pedicel.position.y = .1
    stalk.add(pedicel)
    const throat = new THREE.Group()
    throat.position.y = .2
    stalk.add(throat)
    for (let petal = 0; petal < 6; petal++) {
      const pivot = new THREE.Group()
      pivot.rotation.order = 'YXZ'
      const azimuth = petal / 6 * Math.PI * 2
      const mesh = new THREE.Mesh(petalGeometry, petalMaterial)
      mesh.position.y = .008
      pivot.add(mesh)
      throat.add(pivot)
      petals.push({ pivot, azimuth })
    }
    for (let i = 0; i < 6; i++) {
      const pivot = new THREE.Group()
      pivot.rotation.order = 'YXZ'
      pivot.rotation.y = i / 6 * Math.PI * 2 + Math.sin(i * 17 + floret) * .3
      const filament = new THREE.Mesh(filamentGeometry, filamentMaterial)
      const anther = new THREE.Mesh(antherGeometry, antherMaterial)
      pivot.add(filament, anther)
      throat.add(pivot)
      stamens.push({ pivot, filament, anther, tilt: THREE.MathUtils.degToRad(18 + i / 5 * 42), length: .94 + (Math.sin(i * 47 + floret) + 1) * .06, delay: i * .035 })
    }
  }
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.14, -1.9, -.12), new THREE.Vector3(-.08, -1, -.06),
    new THREE.Vector3(.035, -.2, .03), new THREE.Vector3(0, .55, 0)
  ])
  const stemGeometry = new THREE.TubeGeometry(stemCurve, 40, .012, 8, false)
  group.add(new THREE.Mesh(stemGeometry, stemMaterial))
  const tip = pathPoints[pathPoints.length - 1]!
  const tangent = tip.clone().sub(pathPoints[pathPoints.length - 2]!)
  const setBloom = (amount: number) => {
    const t = THREE.MathUtils.clamp(amount, 0, 1)
    updatePetals(THREE.MathUtils.lerp(-8, 105, t))
    for (const { pivot, azimuth } of petals) {
      pivot.rotation.x = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(3, 60, t))
      pivot.rotation.y = azimuth + THREE.MathUtils.degToRad(42 * t)
    }
    for (const entry of stamens) {
      const growth = THREE.MathUtils.smoothstep((t - .2 - entry.delay) / (1 - .2 - entry.delay), 0, 1)
      const scale = Math.max(.0001, entry.length * growth)
      entry.pivot.rotation.x = entry.tilt * (.15 + .85 * growth)
      entry.pivot.position.set(0, -.025, 0)
      entry.filament.scale.setScalar(scale)
      entry.anther.position.copy(tip).multiplyScalar(scale)
      entry.anther.rotation.x = Math.atan2(tangent.z, tangent.y)
      entry.anther.scale.set(.7 * growth, 2.4 * growth, .7 * growth)
    }
  }
  setBloom(1)
  const dispose = () => {
    for (const geometry of [petalGeometry, filamentGeometry, antherGeometry, pedicelGeometry, stemGeometry]) geometry.dispose()
    for (const material of [petalMaterial, filamentMaterial, stemMaterial, antherMaterial]) material.dispose()
  }
  return { group, setBloom, dispose }
}
