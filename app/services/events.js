import request from 'superagent';
import _ from 'lodash';
import ServerConfig from '../utils/server-config.js';
import {RAILSRoot} from '../config.js'

let internals = {
  getRequest(endpoint, params) {
    debugger
    return request.get(`${RAILSRoot}${endpoint}`)
                  .withCredentials()
                  .set('Accept', 'application/json')
                  .set('Authorization', params.access_token)
                  .send(params)
  }
}
let EventsService = {
  getEvents(profile, callback) {
    let resourceEndpoint = ServerConfig.get('/api/events')

    return internals.getRequest(resourceEndpoint, profile)
                    .end((err, resp) => {
                      callback(err, resp)
                    })
  }
}

export default EventsService;

module.exports.internals = internals;
