export interface IUserTokenData {
  id: number;
  email: string;
  roles: string[];
  exp?: number;
  iat?: number;
}

export function decodeJwt(token: string): IUserTokenData {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
}