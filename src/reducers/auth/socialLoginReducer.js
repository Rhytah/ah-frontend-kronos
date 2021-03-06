// action types
import {
  GOOGLE_AUTHENTICATION,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTHENTICATION,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
} from '../../actions/socialLoginTypes';
import { initialSocialAuthenticationState } from '../initialState';

const socialLoginReducer = (state = initialSocialAuthenticationState, action) => {
  switch (action.type) {
    case GOOGLE_AUTHENTICATION:
      return {
        ...state,
        isGoogleLoggedIn: false,
      };
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        isGoogleLoggedIn: true,
        logged_in: true,
        GoogleToken: action.payload,
      };
    case GOOGLE_AUTH_FAIL:
      return {
        ...state,
        isGoogleLoggedIn: false,
        error: action.payload,
      };

    case FACEBOOK_AUTHENTICATION:
      return {
        ...state,
        isAuthenticating: true,
        isFacebookLoggedIn: false,
      };
    case FACEBOOK_AUTH_SUCCESS:
      return {
        ...state,
        isFacebookLoggedIn: true,
        logged_in: true,
        FacebookToken: action.payload,
      };
    case FACEBOOK_AUTH_FAIL:
      return {
        ...state,
        isFacebookLoggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default socialLoginReducer;
