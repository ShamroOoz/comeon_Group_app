export const reducer = (state, action) => {
  switch (action.type) {
    case "MAKE_REQUEST":
      return { ...state, loading: true };
    case "GET_DATA":
      return {
        ...state,
        loading: false,
        games: action.payload?.games,
        categories: action.payload?.categories,
      };
    case "ERROR":
      return { ...state, error: true, loading: false };
    default:
      throw new Error();
  }
};
