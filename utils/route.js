import {useRouter} from 'next/router';

import {useUser} from './user';

function useRoute(authRoute, unAuthRoute = '/login') {
  const router = useRouter();
  const {userData} = useUser();
  const isAuth = Object.keys(userData).length;

  if (isAuth && authRoute) {
    router.replace(authRoute);
  } else if (!isAuth && unAuthRoute) {
    router.replace(unAuthRoute);
  }
}

export default useRoute;
