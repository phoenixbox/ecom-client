import ServerConfig from '../utils/server-config.js';
import helpers from './helpers.js'

let CustomersService = {
  getCustomers(profile, callback) {
    let resourceEndpoint = ServerConfig.get('/api/customers')

    return helpers.getRequest(resourceEndpoint, profile)
                    .end((err, resp) => {
                      callback(err, resp)
                    })
  }
}

export default CustomersService;
