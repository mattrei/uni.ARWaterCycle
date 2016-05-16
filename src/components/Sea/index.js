import SeaGeometry from './SeaGeometry';
import SeaMaterial from './SeaMaterial';

/**
 * Cube class
 */
class Sea extends THREE.Mesh {

  /**
   * Constructor function
   */
  constructor() {
    super( new SeaGeometry(), new SeaMaterial({ wireframe: true }) );
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.material.update( time );
  }
}

export default Sea;
