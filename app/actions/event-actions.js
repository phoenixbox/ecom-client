import AppDispatcher from '../dispatchers/dispatcher';
import EventConstants from '../constants/event-constants';
import EventsService from '../services/events';
import EventStore from '../stores/event-store.js';

let EventActions = {
  init: function(profile) {
    EventStore.setLoading(true);

    EventsService.getEvents(profile).end((err, resp) => {
      if (err) {
        AppDispatcher.dispatch({
          actionType: EventConstants.EVENT_ERR,
          err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: EventConstants.EVENT_INIT,
          data: resp.body
        });
      }
    })
  }
};

export default EventActions;
