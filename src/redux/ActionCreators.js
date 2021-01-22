import * as ActionTypes from './ActionTypes';

export const addComment = (id, from, to, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        id: id,
        from: from,
        to: to,
        comment: comment
    }
});