import {assert} from 'chai';
import helpers from '../../../../../app/views/components/helpers.js';

const CUSTOMER_SAMPLE = [
  {
    latitude: "52.986375",
    user_id: 12,
    first_name: "Christina",
    second_name: "McArdle",
    longitude: "-6.043701"
  },
  {
    latitude: "51.92893",
    user_id: 1,
    first_name: "Alice",
    second_name: "Cahill",
    longitude: "-10.27699"
  },
  {
    latitude: "51.8856167",
    user_id: 2,
    first_name: "Ian",
    second_name: "McArdle",
    longitude: "-10.4240951"
  },
  {
    latitude: "52.3191841",
    user_id: 3,
    first_name: "Jack",
    second_name: "Enright",
    longitude: "-8.5072391"
  }
]
const INTERCOM_HQ = {
  latitude: 53.339374,
  longitude: -6.257495
}

describe('helpers', function () {
  describe('#sortByDistance', function () {
    it('returns an array of objects sorted by distance ', function () {
      let result = helpers.sortByDistanceWithOrder(CUSTOMER_SAMPLE, INTERCOM_HQ, 'asc');
      let target = [
        {
          "distance": 41.76,
          "id": 12
        },
        {
          "distance": 188.96,
          "id": 3
        },
        {
          "distance": 313.26,
          "id": 1
        },
        {
          "distance": 324.38,
          "id": 2
        }
      ]

      assert.deepEqual(result, target)
    });
  });
});
