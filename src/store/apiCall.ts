import { loginStart, loginSuccess, loginFailure } from "./slice/accountSlice";
import axios from "axios";
import { API_LINK } from "../default-value";
import { fetchSuccess } from "./slice/cartSlice";
export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const res = await axios.post(`${API_LINK}/login`, formData, config);
    localStorage.setItem("accessToken", res.data.access_token);
    localStorage.setItem("username", res.data.username);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.access_token}`;
    const username = res.data.username;
    const res2 = await axios.get(`${API_LINK}/user/account/${username}`);
    dispatch(loginSuccess(res2.data.data));
    // const res3 = await axios.post(`${API_LINK}/rank/search/`, {
    //   username: user.username,
    // });
    alert("Đăng nhập thành công");
  } catch (error) {
    dispatch(loginFailure());
    alert("Đăng nhập thất bại");
  }
};

export const register = async (dispatch: any, user: any) => {
  dispatch(loginStart());

  if (user.ingame) {
    // const res2 = await axios.get(
    //   `${API_LINK}/ingame/search?summonerName=${user.ingame}`
    // );
    // const data2 = await res2.data?.ingame?.profileIconId;

    const res = await axios.post(`${API_LINK}/create/accounts`, {
      name: user.fullname,
      username: user.username,
      password: user.password,
      ingame: user.ingame,
      mainAva: user.mainAva,
    });

    alert("Tạo tài khoản thành công");
  }
};

export const getDataFromAccessToken = async (
  dispatch: any,
  accessToken: any,
  username: string
) => {
  dispatch(loginStart());
  try {
    const res = await axios.get(`${API_LINK}/user/account/${username}`);
    // try {
    //   const resCart = await axios.post(
    //     `${API_LINK}/cart/`,
    //     {
    //       verify_id: accessToken,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   dispatch(fetchSuccess(resCart.data.cart._id));
    // } catch (error) {}
    dispatch(loginSuccess(res.data.data));
  } catch (error) {
    dispatch(loginFailure());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    alert("Vui lòng đăng nhập lại");
  }
};
