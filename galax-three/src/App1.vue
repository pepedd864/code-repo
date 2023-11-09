<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import stats from '@/utils/stat'
import * as dat from 'lil-gui'
import { nextTick, ref } from 'vue'
import {
  dbClkfullScreen,
  getFile,
  listenResize,
  useLoading,
} from '@/utils/utils'
import vertexShader from '@/shader/particle/vt.glsl?raw'
import fragmentShader from '@/shader/particle/fm.glsl?raw'

useLoading(true)

const showSetting = ref(false)
const toggleSetting = () => {
  showSetting.value = !showSetting.value
}

let canvas: HTMLElement
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer

nextTick(() => {
  /// base
  canvas = document.querySelector('#canvas') as HTMLElement
  scene = new THREE.Scene()
  const size = {
    width: canvas.getBoundingClientRect().width,
    height: canvas.getBoundingClientRect().height,
  }
  camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
  camera.position.set(-4, 1, 4)
  // Renderer
  renderer = new THREE.WebGLRenderer({
    // 在 css 中设置背景色透明显示渐变色
    alpha: true,
    // 开启抗锯齿
    antialias: true,
  })
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(window.devicePixelRatio)

  const controls = new OrbitControls(camera, renderer.domElement)
  canvas.appendChild(renderer.domElement)
  controls.enableDamping = true // 开启阻尼效果
  controls.zoomSpeed = 0.3
  controls.autoRotateSpeed = 0.7
  controls.autoRotate = true
  // 设置相机当前仰角
  controls.minDistance = 5 // 最小缩放比例
  controls.maxDistance = 7 // 最大缩放比例
  controls.minPolarAngle = Math.PI / 5 // 最小仰角
  controls.maxPolarAngle = Math.PI / 2.3 // 最大仰角
  controls.enablePan = false // 禁止平移
  /// base

  const parameters = {
    count: 100000,
    size: 0.2,
    radius: 10,
    branches: 12,
    spin: 1,
    randomness: 0.7,
    randomnessPower: 3,
    insideColor: '#cdb4ad',
    outsideColor: '#1b3984',
  }

  let geometry: THREE.BufferGeometry
  let material: THREE.ShaderMaterial
  let points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>

  const generatorGalaxy = () => {
    if (points) {
      geometry.dispose()
      material.dispose()
      scene.remove(points)
    }

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    // Geometry
    geometry = new THREE.BufferGeometry()
    const position = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scale = new Float32Array(parameters.count)

    for (let i = 0; i < parameters.count; i += 1) {
      const i3 = i * 3
      const radius = Math.random() * parameters.radius
      const branchesAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2
      const spinAngle = radius * parameters.spin

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / parameters.radius)

      const randomX =
        Math.random() ** parameters.randomnessPower *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomY =
        Math.random() ** parameters.randomnessPower *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomZ =
        Math.random() ** parameters.randomnessPower *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius

      position[i3] = Math.cos(branchesAngle + spinAngle) * radius + randomX
      position[i3 + 1] = randomY
      position[i3 + 2] = Math.sin(branchesAngle + spinAngle) * radius + randomZ

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      scale[i] = parameters.size + Math.random() * parameters.size
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scale, 1))

    // Material
    // material = new THREE.PointsMaterial({
    //   size: parameters.size,
    //   sizeAttenuation: true,
    //   depthWrite: false,
    //   blending: THREE.AdditiveBlending,
    //   vertexColors: true,
    // })
    material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)
  }

  generatorGalaxy()

  // 添加天空盒
  const directions = [
    getFile('assets/skybox/mobile_l.jpg'), // -z
    getFile('assets/skybox/mobile_r.jpg'), // +z
    getFile('assets/skybox/mobile_u.jpg'), // +y
    getFile('assets/skybox/mobile_d.jpg'), // -y
    getFile('assets/skybox/mobile_b.jpg'), // -x
    getFile('assets/skybox/mobile_f.jpg'), // +x
  ]

  const textureLoader = new THREE.CubeTextureLoader()

  // 加载完成后执行的回调函数
  const onTextureLoad = () => {
    // 在这里将加载的纹理设置为场景的背景
    scene.background = textureLoader.load(directions)

    document.dispatchEvent(new CustomEvent('loaded'))
  }

  // 加载纹理
  textureLoader.load(directions, onTextureLoad)

  // 添加坐标轴
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  listenResize(size, canvas, camera, renderer)
  dbClkfullScreen(canvas.firstChild as HTMLElement)

  // Animations
  const tick = () => {
    stats.begin()

    controls.update()

    // Render
    renderer.render(scene, camera)
    stats.end()
    requestAnimationFrame(tick)
  }

  tick()

  /**
   * Debug
   */
  // @ts-ignore
  if (import.meta.env.MODE === 'development') {
    const gui = new dat.GUI()

    gui.add(controls, 'autoRotate')
    gui.add(controls, 'autoRotateSpeed', 0.1, 10, 0.01)

    gui
      .add(parameters, 'count', 100, 100000, 100)
      .onFinishChange(generatorGalaxy)
    gui.add(parameters, 'size', 0.1, 0.3, 0.01).onFinishChange(generatorGalaxy)
    gui
      .add(parameters, 'radius', 0.01, 20, 0.01)
      .onFinishChange(generatorGalaxy)
    gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(generatorGalaxy)
    gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(generatorGalaxy)
    gui
      .add(parameters, 'randomness', 0, 2, 0.001)
      .onFinishChange(generatorGalaxy)
    gui
      .add(parameters, 'randomnessPower', 1, 10, 0.001)
      .onFinishChange(generatorGalaxy)
    gui.addColor(parameters, 'insideColor').onFinishChange(generatorGalaxy)
    gui.addColor(parameters, 'outsideColor').onFinishChange(generatorGalaxy)
  }
})

const toggleLoading = () => {
  document.dispatchEvent(new CustomEvent('loading'))
  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('loaded'))
  }, 4000)
}

const textMesh = new THREE.Mesh()

// 添加3d文字到屏幕中
function create3dText(text: string, scene: THREE.Scene) {
  const loader = new FontLoader()
  loader.load(getFile('assets/fonts/PingFang SC Regular.json'), (font) => {
    textMesh.geometry = new TextGeometry(text, {
      font: font,
      size: Math.random(), //文本的大小
      height: 0.5, // 文本的厚度
      curveSegments: 8, // 曲线上点的数量，使得文本的曲线更加光滑
      bevelEnabled: true, // 倒角，也就是斜面
      bevelThickness: 0.07, // 倒角厚度
      bevelSize: 0.07, // 倒角大小
      bevelOffset: 0, // 倒角偏移量
      bevelSegments: 12, // 倒角段数
    })
    textMesh.material = new THREE.MeshNormalMaterial()
    // 让文字位于屏幕中央
    textMesh.geometry.center()

    scene.add(textMesh)
  })
}
</script>

<template>
  <div class="container">
    <fc-arrow-btn
      class="setting-btn"
      style="--color: white"
      @click="toggleSetting"
      >Setting
    </fc-arrow-btn>
    <fc-arrow-btn class="loading-btn" @click="toggleLoading">
      Loading
    </fc-arrow-btn>
    <transition name="fade">
      <div v-if="showSetting" class="setting">
        <div class="title">添加想要显示的文字</div>
        <div class="list">
          <button @click="create3dText('test', scene)">添加文字</button>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
          <fc-typing-input placeholder="test" white></fc-typing-input>
        </div>
        <fc-arrow-btn
          class="close-btn"
          style="--color: white"
          @click="toggleSetting"
          >Close
        </fc-arrow-btn>
      </div>
    </transition>
    <div id="canvas"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background: #000;

  #canvas {
    width: 100vw;
    height: 100vh;
  }

  .setting-btn {
    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 100;
  }

  .loading-btn {
    position: absolute;
    top: 100px;
    right: 20px;
    z-index: 100;
  }

  .setting {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(20px);

    .title {
      font-size: 30px;
      color: #fff;
      margin-bottom: 20px;
      text-shadow: 0 0 10px #fff;
    }

    .list {
      padding: 40px 0 10px 0;
      width: calc(100vh / 3);
      height: calc(100vh / 2);
      //border: 1px solid #fff;
      //border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow-y: auto;
    }

    .close-btn {
      position: absolute;
      bottom: 30px;
      right: 20px;
    }
  }
}
</style>
