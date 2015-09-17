import {assert} from 'chai';
import MapHelpers from '../../../../../../app/views/components/map/helpers.js';

describe('MapHelpers', function () {
  describe('#buildGeoJson', function () {
    it('returns an array of geoJson data', function () {
      let target = [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-6.238335, 53.2451022]
          },
          properties: {
              title: 'Sarah Smith',
              'marker-color': '#499CE3'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-6.2397222, 53.1302756]
          },
          properties: {
              title: 'Alan Smith',
              'marker-color': '#499CE3'
          }
        }
      ]
      let customers = [
        {
          name: 'Sarah Smith',
          user_id: 1,
          latitude: 53.2451022,
          longitude: -6.238335
        },
        {
          name: 'Alan Smith',
          user_id: 2,
          latitude: 53.1302756,
          longitude: -6.2397222
        }
      ];

      let sortedCustomers = [
        {user_id: 1, distance: 0},
        {user_id: 2, distance: 1}
      ]
      let result = MapHelpers.buildGeoJson(customers, sortedCustomers, 0)

      assert.deepEqual(result, target);
    });
  });
  describe('#kmRadius', function() {
    it('converts m to km', function () {
      let result = MapHelpers.kmRadius(1);

      assert.equal(result, 1000)
    });
  })
});
