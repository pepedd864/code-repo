import * as kokomi from 'kokomi.js'
import { getFile } from '@/utils/utils'

class MyBox extends kokomi.Component {
  box: kokomi.Box

  constructor(base: kokomi.Base) {
    super(base)
    const box = new kokomi.Box(base)
    this.box = box
  }

  addExisting() {
    this.box.addExisting()
  }

  remove() {
    const scene = this.base.scene
    scene.remove(this.box.mesh)
  }
}

export default class Sketch extends kokomi.Base {
  // @ts-ignore
  create() {
    const am = new kokomi.AssetManager(this, [
      {
        name: 'galax_l',
        type: 'texture',
        path: getFile('assets/skybox/mobile_l.jpg'),
      },
      {
        name: 'galax_r',
        type: 'texture',
        path: getFile('assets/skybox/mobile_r.jpg'),
      },
      {
        name: 'galax_u',
        type: 'texture',
        path: getFile('assets/skybox/mobile_u.jpg'),
      },
      {
        name: 'galax_d',
        type: 'texture',
        path: getFile('assets/skybox/mobile_d.jpg'),
      },
      {
        name: 'galax_f',
        type: 'texture',
        path: getFile('assets/skybox/mobile_f.jpg'),
      },
      {
        name: 'galax_b',
        type: 'texture',
        path: getFile('assets/skybox/mobile_b.jpg'),
      },
    ])

    am.on('ready', ()=> {
      const panoramaImages = am.items
    })

    new kokomi.OrbitControls(this)
    new kokomi.Stats(this)
  }
}
