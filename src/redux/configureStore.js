import {createStore, combineReducers} from 'redux';
import { Comments } from './comments';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments: Comments,
        })
    );
    return store;
}