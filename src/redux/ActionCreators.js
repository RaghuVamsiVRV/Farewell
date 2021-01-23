import * as ActionTypes from './ActionTypes';

export const addComment = (from, to, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        from: from,
        to: to,
        comment: comment
    }
});