export default function authorReducer(state = [], action) {
    switch(action.type) {
        case 'LOAD_AUTHOR_SUCCESS':
            return action.authors;
        default:
            return state
    }
}
