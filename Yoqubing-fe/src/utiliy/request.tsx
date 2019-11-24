import axios from "axios";

const server = "https://mockapi.eolinker.com/nKCmgxNb9dc40f3a1b2e6652aeacaae2bb186d2d2bec7d5";

const withToken = (body : any) : any => {
  if (!body) body = {};
  if (!window.localStorage.session) return {...body, token: ""};
  return {...body, token: JSON.parse(window.localStorage.session).token};
}

export default async function request(url : string, body ?: any) {
  body = withToken(body);
  return await axios({
    method: "POST",
    headers: { "Content-type": "application/json" },
    url: server + url,
    data: body,
    withCredentials: true,
  }).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
  });
}