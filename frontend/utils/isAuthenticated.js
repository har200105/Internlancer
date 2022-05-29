import axios from "axios";

export const isAuthenticatedUser = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.API}/api/token/verify`,
      {
        token: token,
      }
    );

    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
};