import {createStore, combineReducers} from 'redux';
import { Comments } from './comments';
import { Users } from "./users";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments: Comments,
            users: Users
        })
    );
    return store;
}