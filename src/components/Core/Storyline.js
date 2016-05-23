import Rain from '../Rain'
import Steam from '../Steam'
import Sea from '../Sea'
import HUD from './HUD'


class Storyline {


  constructor(args) {

    this.idx = 0
    this.hud = new HUD({listener: (e) => this.onHUD(e)})

    this.rain = new Rain({
      texture: null
    })
    this.sea = new Sea()
    this.steam = new Steam()


    this.story = [
      //0
      {
        msg: 0,
        init: () => {
          this.rain.setRaining(false)
          this.hud.showHUD()
          this.hud.show("instructions1")
        },
        clear: () => {
          this.hud.hideHUD()
        }
      },
      // 1
      {
        msg: 1,
        init: () => {
          this.rain.setRaining(true)
        },
        clear: () => {
          this.hud.hideHUD()
        }
      }
    ]

    this.initStoryline()
  }

  initStoryline() {

    this.story.forEach(s => s.clear())
    this.story[this.idx].init()
  }

  getActive() {
    return this.idx
  }

  onHUD(event) {
    if (event === "continue") {
      this.story[this.idx].clear()
      this.idx = (this.idx + 1) % this.story.length
      this.story[this.idx].init()
    } else if (event === "replay") {
      this.idx = 0
      this.initStoryline()
    }


  }

  getRain() {
    return this.rain
  }

  getSteam() {
    return this.steam
  }

  getSea() {
    return this.sea
  }

}

export default Storyline
