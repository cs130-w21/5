const HOST = "http://localhost:3001";

const POST = async (endpoint, data, extraOptions) => {
  const response = await fetch(HOST + endpoint, {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...extraOptions,
  });
  return response;
};

const GET = async (endpoint, extraOptions) => {
  const response = await fetch(HOST + endpoint, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...extraOptions,
  });
  return response;
};

const createError = (e, errMsg = null) => {
  return { error: true, e, errMsg };
};

const createSuccess = (data) => {
  return { error: false, data };
};

export const signUpUser = async (
  firstName,
  lastName,
  email,
  password,
  isTutor
) => {
  const res = await POST("/signUp", {
    firstName,
    lastName,
    email,
    password,
    isTutor,
  });
  if (res.status !== 200) {
    return createError(res, "Status Error: " + res.status);
  }
  const data = await res.json();
  return createSuccess(data);
};
