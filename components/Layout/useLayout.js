import {useRouter} from 'next/router';

function useLayout() {
  const router = useRouter();
  const isShowed = !['/', '/topics'].includes(router.pathname);

  return {isShowed};
}

export default useLayout;
