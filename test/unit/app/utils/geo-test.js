import Geo from '../../../../app/utils/geo.js';
import helpers from './test-helpers.js';
import {assert} from 'chai';

/**
 * Intecom HQ { lat: 53.339371: N: 53° 20' 21.7356'' N, long: 6.2574953, 6° 15' 26.9831'' W}
 * Eyre Square {lat: 53.2742762, 53° 16' 27.3943'' N, long: -9.0490638, 9° 2' 56.6297'' W}
 * Tullamore {lat: 53.2746981, 53° 16' 28.9132'' N, long: -7.4929765, 7° 29' 34.7154'' W}
 * Bray {lat: 53.1986654, 53° 11' 55.1954'' N, long: -6.1129287, 6° 6' 46.5433'' W}
 * 3rd party site used to calculate distance from Intercom HQ: http://www.movable-type.co.uk/scripts/latlong.html
 * ~ Eyre Square = 185.6 km
 * ~ Tullamore = 82.40 km
 * ~ Bray = 18.36 km
 */
const locations = {
  intercom: {
    latitude: 53.339374,
    longitude: -6.257495
  },
  galway: {
    latitude: 53.2742762,
    longitude: -9.0490638
  },
  tullamore: {
    latitude: 53.2746981,
    longitude: -7.4929765
  },
  bray: {
    latitude: 53.200825,
    longitude: -6.111212
  }
}
const CONFIDENCE = 0.99;

describe('Geo', () => {
  describe('calculateDistance', () => {
    it('calculates the distance between Intercom & Galway', () => {
      let result = Geo.calculateDistance(locations.galway, locations.intercom)
      let target = 185.6;
      let margins = helpers.marginCalc(target, CONFIDENCE);

      assert.isTrue(helpers.between(result, margins))
    })

    it('calculates the distance between Intercom & Bray', () => {
      let result = Geo.calculateDistance(locations.bray, locations.intercom)
      let target = 18.36;
      console.log('HELPERS: ', helpers);
      let margins = helpers.marginCalc(target, CONFIDENCE);

      assert.isTrue(helpers.between(result, margins))
    })

    it('calculates the distance between Intercom & Tullamore', () => {
      let result = Geo.calculateDistance(locations.tullamore, locations.intercom)
      let target = 82.40;
      let margins = helpers.marginCalc(target, CONFIDENCE);

      assert.isTrue(helpers.between(result, margins))
    })
  })

  describe('isPointInRadius', () => {
    it('returns true for Intercom - Bray', () => {
      let result = Geo.isPointInRadius(locations.bray, locations.intercom, 100)

      assert.isTrue(result)
    });
    it('returns false for Intercom - Galway', () => {
      let result = Geo.isPointInRadius(locations.galway, locations.intercom, 100)

      assert.isFalse(result)
    });
  })

  describe('internals', () => {
    describe('toRadians', function () {
      it('converts degrees to radians', function () {
        let result = Geo.internals.toRadians(100);

        assert.equal(result, 1.7453292519943295);
      });
    });
    describe('toKm', () => {
      it('converts metres to kilometers', () => {
        let result = Geo.internals.toKm(123400);

        assert.equal(result, 123.4);
      })
    });
  })
})
