import {useRouter} from 'next/router';

import {useUser} from './user';

function useRoute(authRoute, unAuthRoute = '/login') {
  const router = useRouter();
  const {userData} = useUser();
  const userDataLength = Object.keys(userData).length;

  if (userDataLength && authRoute) {
    router.replace(authRoute);
  } else if (!userDataLength && unAuthRoute) {
    router.replace(unAuthRoute);
  }
}

export default useRoute;
