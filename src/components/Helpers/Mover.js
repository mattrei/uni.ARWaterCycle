import Force3 from './Force3'

class Mover extends Force3 {
  constructor(props) {
    super(props)
    this.size = 0;
    this.time = 0;
    this.is_active = false;
  };
  init(vector, accleration) {
    this.position = vector.clone();
    this.velocity = vector.clone();
    this.anchor = vector.clone();
    this.acceleration = accleration.clone()
    this.time = 0;
  };
  activate() {
    this.is_active = true;
  };
  inactivate() {
    this.is_active = false;
  };
}

export default Mover
