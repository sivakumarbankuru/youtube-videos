import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import dashboardRedcer from './dashboardReducer';

const rootReducer = combineReducers({
    dashboard: dashboardRedcer
})

export default withReduxStateSync(rootReducer)