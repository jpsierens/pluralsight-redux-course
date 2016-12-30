function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = 0, action) {
    if (action.type === 'BEGIN_AJAX_CALL') {
        return state + 1;
    } else if (actionTypeEndsInSuccess(action.type) ||
        action.type === 'AJAX_CALL_ERROR') {
            
        return state - 1;
    }

    return state;
}
