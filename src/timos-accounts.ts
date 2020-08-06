import { getToken, getUserFromJWT } from './jwt-helper';
import { User } from './User.interface';

export function signInTAUser(redirect: string) {
  localStorage.removeItem('timos-designs-auth');
  window.location.replace(
    'https://accounts.timos.design?redirect=' + encodeURI(redirect)
  );
}

export function signOutTAUser() {
  localStorage.removeItem('timos-designs-auth');
}

export async function verfiyTAUser(): Promise<boolean> {
  const token: string | null = getToken();
  if (!token) return false;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const res = await fetch(
    'https://api.timos.design/user/verify',
    options
  ).then((res) => res.json());

  if (res.error) return false;
  return true;
}

export function persistLogin(token: string): void {
  localStorage.setItem('timos-designs-auth', token);
}

export function getTAUser(): User | undefined {
  const token: string | null = getToken();
  if (token) {
    return getUserFromJWT(token);
  }
}
