import axios from 'axios';
import swal from 'sweetalert';

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const login = (mail, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { mail, password }});
      try {
const data = await axios.post('http://localhost:3001/login', {mail, password});
      switch (data.request.status) {
        case 200:
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.data,
          });
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/home";
          break;
        case 401:
          dispatch({
            type: USER_LOGIN_ERROR,
            payload: data.error,
          });
          swal("Not allow", { icon: "warning" });
          break;
        case 500:
          dispatch({
            type: USER_LOGIN_ERROR,
            payload: data.error,
          });
          swal("Internal server error", { icon: "warning" });
          break;
        default:
          break;
      }
    } catch (error) {
      swal("Wrong Credentials", { icon: "warning" });
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: error,
      });
    }
  };