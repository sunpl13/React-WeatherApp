import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import wreducer from './Weather/reducer'
import rootReducer from './index'

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;