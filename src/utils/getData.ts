import * as jose from 'jose'

export const decodeToken = (token: string | any) => jose.decodeJwt(token)
const getToken = (request: any) => {}
const data = {}
export default data
