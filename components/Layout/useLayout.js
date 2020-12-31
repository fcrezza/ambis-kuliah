import {useRouter} from 'next/router';

function useLayout() {
  const router = useRouter();
  const isShowed = !['/', '/topics', '/login', '/signup'].includes(
    router.pathname
  );

  return {isShowed};
}

export default useLayout;
