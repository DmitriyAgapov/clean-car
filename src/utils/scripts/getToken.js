import { API_ROOT } from "utils/agent";

const fetchToken = async () => {
  // @ts-ignore
  const response =  await fetch(API_ROOT, {
    method: 'POST',
    body: JSON.stringify({email: "prweb2012@gmail.com",password: "lKC7S8iP"})
  })
  // console.log(response);
}
export default fetchToken
