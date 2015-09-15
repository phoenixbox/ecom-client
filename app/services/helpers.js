import {RAILSRoot} from '../config.js'
import request from 'superagent';

export default {
  getRequest(endpoint, params) {
    return request.get(`${RAILSRoot}${endpoint}`)
                  .set('Accept', 'application/json')
                  .set('Authorization', params.access_token)
  }
}
