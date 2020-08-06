import { User } from './User.interface';

export function getUserFromJWT(token: string): User {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export function getToken(): string | null {
  return localStorage.getItem('timos-designs-auth');
}
