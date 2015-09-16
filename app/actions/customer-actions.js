import AppDispatcher from '../dispatchers/dispatcher';
import CustomerConstants from '../constants/customer-constants';
import CustomersService from '../services/customers';
import CustomerStore from '../stores/customer-store.js';

let CustomerActions = {
  init: function(profile) {
    CustomerStore.setLoading(true);
    /**
     * @param  access_token - As Authorization header
     * @return array - Customer's
     *   @return string - computed name
     *   @return string - latitude
     *   @return string - longitude
    */
    CustomersService.getCustomers(profile).end((err, resp) => {
      if (err) {
        AppDispatcher.dispatch({
          actionType: CustomerConstants.EVENT_ERR,
          err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: CustomerConstants.EVENT_INIT,
          data: resp.body.customers
        });
      }
    })
  }
};

export default CustomerActions;
