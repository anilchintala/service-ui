import { all } from 'redux-saga/effects';
import { notificationSagas } from 'controllers/notification';
import { authSagas } from 'controllers/auth/sagas';
import { fetchSagas } from 'controllers/fetch';
import { launchSagas } from 'controllers/launch';
import { groupOperationsSagas } from 'controllers/groupOperations';
import { suiteSagas } from 'controllers/suite';

export function* rootSagas() {
  yield all([
    notificationSagas(),
    authSagas(),
    fetchSagas(),
    launchSagas(),
    groupOperationsSagas(),
    suiteSagas(),
  ]);
}
