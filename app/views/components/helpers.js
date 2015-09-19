import _ from 'lodash';
import Geo from '../../utils/geo.js'

module.exports = {
  sortByDistanceWithOrder(customers, origin, order) {
    return _.chain(customers)
      .map((customer) => {
        let custLocation = {
          latitude: customer.latitude,
          longitude: customer.longitude
        }

        return {
          id: customer.user_id,
          distance: Geo.calculateDistance(custLocation, origin)
        }
      })
      .sortByOrder('distance', order)
      .value()
  },
  filterByRange(customers, range) {
    return _.filter(customers, (customer) => {
      return customer.distance <= range
    })
  }
}
