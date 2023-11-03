// For requests that require authentication, we'll send the JWT, if it exists, in the Authorization header of the request.
//TODO - add token in graphql context for authenticated requests
export const getTokenFromLocalStorage = () => {
  const authToken = localStorage.getItem('token')
  return {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
}
