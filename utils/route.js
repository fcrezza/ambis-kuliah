import {useRouter} from 'next/router';

import {useAuth} from './auth';

function useRoute(authRoute, unAuthRoute = '/login') {
  const router = useRouter();
  const {userData, error} = useAuth();

  if (userData && authRoute) {
    router.replace(authRoute);
  } else if (error?.response?.status === 401 && unAuthRoute) {
    router.replace(unAuthRoute);
  }
}

export default useRoute;
