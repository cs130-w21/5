const HOST = "http://localhost:8080/api";

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
  const res = await POST("/auth/signUp", {
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

// Double check with the POST URL for sign in endpoint 
// I need to send in the email and password 
// Backend check and pull out that user info 
// Get a flag confirmed yes sent from backend then redirect to personal profile page 
export const signInRequest = async (
  email,
  password
) => {
  const res = await POST("/auth/signIn", {
    email, 
    password
  });

  if (res.status !== 200) {
    return createError(res, "Status Error: " + res.status);
  }

  // Local test 
  // Hard code a 200 to test out if the sign in button is able to redirect to the profile page

  const data = await res.json();
  return createSuccess(data);
}
