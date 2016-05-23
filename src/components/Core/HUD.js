import Signal from 'min-signal';

class HUD {

  constructor(args) {

    this.signal = new Signal()
    console.log(args.listener)
    this.signal.add(args.listener)

    this.hud = document.getElementById("hud")

    this.continue = document.getElementById("continueButton")
    this.continue.addEventListener('click', e => this.onContinue(e))

    this.continue = document.getElementById("replayButton")
    this.continue.addEventListener('click', e => this.onReplay(e))
  }

  show(domId) {
    document.getElementById(domId).style.disply = "block"
  }

  hide(domId) {
    document.getElementById(domId).style.disply = "none"
  }

  showReplay() {
    this.replayMessage.style.display = "block";
  }

  hideReplay() {
    this.replayMessage.style.display = "none";
  }

  showHUD() {
    this.hud.style.display = "block";
  }
  hideHUD() {
    this.hud.style.display = "none";
  }

  onContinue(e) {
    this.signal.dispatch("continue")
  }

  onReplay(e) {
    console.log("replay")
    this.signal.dispatch("replay")
  }

}

export default HUD
