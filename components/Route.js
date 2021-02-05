import {useRouter} from 'next/router';

import {useAuth} from 'utils/auth';

export function UnauthenticatedRoute({children}) {
  const {userData} = useAuth();
  const {replace} = useRouter();

  if (!Object.keys(userData).length) {
    return children;
  }

  replace('/home');
  return null;
}

export function AuthenticatedRoute({children}) {
  const {userData} = useAuth();
  const {replace} = useRouter();

  if (Object.keys(userData).length) {
    return children;
  }

  replace('/login');
  return null;
}
