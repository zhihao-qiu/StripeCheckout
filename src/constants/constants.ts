// For requests that require authentication, we'll send the JWT, if it exists, in the Authorization header of the request.
export const getTokenFromLocalStorage = () => {
  const authToken = localStorage.getItem('token')
  return {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
}
