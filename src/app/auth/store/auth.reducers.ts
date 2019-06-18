import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  isAuth: boolean;
}

const initialState: State = {
  token: null,
  isAuth: false
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        isAuth: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        isAuth: false
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
