const initialState = {
    login: false,
    newUser: false,
    isLoading: false,

}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'SET_LOGIN' :
            return {
                ...state,
                groupMember: action.payload,
            }

        case 'SET_NEW_USER' :
            return {
                ...state,
                newUser: action.payload,
            }

        case 'SET_IS_LOADING' :
            return {
                ...state,
                isLoading: action.payload,
            }
        
        default :
            return state;
    }
}

export default dataReducer;