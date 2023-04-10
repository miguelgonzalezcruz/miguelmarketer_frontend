import { request } from "./auth";

// const baseURL = "http://localhost:3001";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.miguelmarketer.com"
    : "http://localhost:3001";

const generateGradient = (text) => {
  return request(`${baseURL}/gradient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  });
};

const generateOpenAIGradient = (prompt) => {
  return request(`${baseURL}/openai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
};

export { generateGradient, generateOpenAIGradient };
