import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'

import rootReducer from '../reducers/rootReducer';


const config = {
}
const middlewares = [ createStateSyncMiddleware(config) ]


const store = createStore(rootReducer, {}, applyMiddleware(...middlewares, thunk))
initStateWithPrevTab(store)

export default store