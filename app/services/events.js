import ServerConfig from '../utils/server-config.js';
import helpers from './helpers.js'

let EventsService = {
  getEvents(profile, callback) {
    let resourceEndpoint = ServerConfig.get('/api/events')

    return helpers.getRequest(resourceEndpoint, profile)
                    .end((err, resp) => {
                      callback(err, resp)
                    })
  }
}

export default EventsService;
