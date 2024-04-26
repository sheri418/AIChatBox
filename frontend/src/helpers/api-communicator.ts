import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to Authenticate");
  }
  return res.data;
};

export const sendChatRequest = async (message: string) => {
  try {
    const res = await axios.post("/api/v1/chat/new", { message });

    return res.data;
  } catch (error) {
    throw new Error("Unable to send chat");
  }
};
