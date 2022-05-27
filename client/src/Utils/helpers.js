export const API =
  process.env.NODE_ENV === "production"
    ? "https://stripe-subscription-backend-app.vercel.app/api"
    : "http://localhost:5000/api";

export async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { body: null, ...opts };

  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("userToken");

  if (token) {
    headers["Authorization"] = token;
  }
  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers,
  });

  if (res.status === 200) {
    return res.json();
  } else {
    let err = await res.json();
    throw err;
  }
}

export const validationChecker = (result) => {
  let errors = {};

  if (!Object.values(result).some(Boolean)) {
    errors.message = "Please fill all the fields....";
  }
  return errors;
};

export const initialState = {
  games: [],
  categories: [],
  loading: false,
  error: false,
};
