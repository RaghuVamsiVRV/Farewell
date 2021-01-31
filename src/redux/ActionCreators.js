import * as ActionTypes from './ActionTypes';

export const addComment = (from, to, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        from: from,
        to: to,
        comment: comment
    }
});

export const addUser = (_id, name, email, password, batch, college, __v) =>({
    type: ActionTypes.ADD_USER,
    payload: {
        _id : _id,
        name: name, 
        email: email, 
        password: password, 
        batch: batch, 
        college: college,
        __v: __v 
    }
})