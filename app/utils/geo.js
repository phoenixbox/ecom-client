import _ from 'lodash';

const EARTH_RADIUS = 6371000;

module.exports = {
  /**
   * isPointInCircle
   * @param  object  target - lat|long of target {latitude, longitude}
   * @param  object  origin - lat|long of range origin {latitude, longitude}
   * @param  integer radius of range
   * @return bool    true if within range
   *   Two points target && origin
   *   point 1 (phi, lamb)
   *   point 2 (phi, lamb)
   *   phi1,lamb1 === lat1,long1
   *   phi2,lamb2 === lat2,long2
   *   deltaLambda lamb1-lamb2
   *   d = r * centralAngle
  */
  isPointInRadius(target, origin, radius) {
    let distance = this.calculateDistance(target, origin)

    return distance < radius;
  },

  calculateDistance(target, origin) {
    let phiTarget = internals.toRadians(target.latitude)
    let phiOrigin = internals.toRadians(origin.latitude)
    let deltaLambda = internals.toRadians(origin.longitude - target.longitude)
    /*
     * Sperical Law of Cosines for distance calculation
     * refs: https://en.wikipedia.org/wiki/Spherical_law_of_cosines
     *       https://en.wikipedia.org/wiki/Great-circle_distance
    */
    let distance = Math.acos(
      (Math.sin(phiTarget) * Math.sin(phiOrigin)) +
      (Math.cos(phiTarget) * Math.cos(phiOrigin) * Math.cos(deltaLambda))
    ) * EARTH_RADIUS;
    let km = internals.toKm(distance)

    return _.round(km, 2)
  }
}

var internals = {
  toRadians(degrees) {
    return degrees * Math.PI / 180
  },
  toKm(metres) {
    return metres / 1000
  }
}

module.exports.internals = internals
