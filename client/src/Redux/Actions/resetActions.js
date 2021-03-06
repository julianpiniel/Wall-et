import axios from "axios";
import swal from "sweetalert";

const USER_FORGOTPASSWORD_REQUEST = "USER_FORGOTPASSWORD_REQUEST",
  USER_FORGOTPASSWORD_SUCCESS = "USER_FORGOTPASSWORD_SUCCESS",
  USER_CHANGEPASSWORD_REQUEST = "USER_CHANGEPASSWORD_REQUEST",
  USER_CHANGEPASSWORD_SUCCESS = "USER_CHANGEPASSWORD_SUCCESS";

export const forgot = (mail) => async (dispatch) => {
  dispatch({ type: USER_FORGOTPASSWORD_REQUEST, payload: mail });
  return axios
    .post("/resetPassword/reset_password", { mail })
    .then((response) => {
      dispatch({ type: USER_FORGOTPASSWORD_SUCCESS, payload: response.data });
      swal(
        "We have sent you a code to your e-mail to reset your password. Please, check your SPAM folder also",
        { icon: "success" }
      );
    })
    .catch((error) => swal("User Not Found", { icon: "error" }));
};

export const changePassword =
  ({ userid, password }) =>
  async (dispatch) => {
    dispatch({ type: USER_CHANGEPASSWORD_REQUEST, payload: password });
    return axios
      .post("/resetPassword/update_password/" + userid, { password }, 
      {headers: { "Content-Type": "application/json" }})
      .then((response) => {
        dispatch({ type: USER_CHANGEPASSWORD_SUCCESS, payload: response.data });
      })
      .then(()=> window.location.href = "/")
      .catch((error) => swal("Passwords don't match", { icon: "error" }));
  };
