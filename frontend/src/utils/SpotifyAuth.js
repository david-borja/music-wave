const  SERVER_URL = "http://localhost:5000"
const useAuth = (authCode) => { 
  return fetch(`${SERVER_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: authCode }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      // redirects the user to the homepage
    });

};

export default useAuth;
