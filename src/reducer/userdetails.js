const initialState = {
   bioData:{},media:{}
}
export default function profile(state = initialState, action) {
    switch (action.type) {
        case "SET_USER_PROFILE":
            let newState = Object.assign({}, state);
            newState.bioData = action.payload.profile,
            newState.media = action.payload.media
            return newState;
            break;
        case "EDIT_USER_PROFILE":
            let newState2 = Object.assign({}, state);
            newState2.bioData = action.payload
            return newState2;
            break;
        default:
            return state;
            break;
    }
} 