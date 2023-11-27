import * as jose from 'jose'


export const decodeToken = (token:string) => jose.decodeJwt(token);
const getToken = (request:any) => {

}
const data = {

}
export default data
