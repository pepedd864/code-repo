import { PerspectiveCamera, WebGLRenderer } from 'three'

export const listenResize = (
  sizes: {
    width: number
    height: number
  },
  canvas: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) => {
  window.addEventListener('resize', () => {
    // update sizes
    sizes.width = canvas.getBoundingClientRect().width
    sizes.height = canvas.getBoundingClientRect().height

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
  })
}

/**
 * 全屏
 */
export const setFullScreen = (canvas: HTMLElement) => {
  const fullscreenElement =
    // @ts-ignore
    document.fullscreenElement || document.webkitFullscreenElement
  if (fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else {
      // @ts-ignore
      document.webkitExitFullscreen()
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else {
      // @ts-ignore
      canvas.webkitRequestFullscreen()
    }
  }
}

/**
 * 全屏按钮
 */
export const dbClkfullScreen = (element: HTMLElement) => {
  element.addEventListener('dblclick', (e) => {
    e.stopPropagation()
    setFullScreen(document.body)
  })
}

/**
 * 获取文件
 * @param url 文件路径
 * @returns {string}
 */
export function getFile(url: string) {
  return new URL(`../${url}`, import.meta.url).href
}

/**
 * 显示加载
 * @param loading
 */
export function useLoading(loading: boolean) {
  if (loading) {
    document.dispatchEvent(new CustomEvent('loading'))
  } else {
    document.dispatchEvent(new CustomEvent('loaded'))
  }
}

