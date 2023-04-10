// const baseURL = "http://localhost:3001";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.miguelmarketer.com"
    : "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const generateGradient = (text) => {
  return request(`${baseURL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: text }),
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export { request, generateGradient };
