import { createStore, combineReducers } from 'redux';
import userReducer from '../Reducers/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;