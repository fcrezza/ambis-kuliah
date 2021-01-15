import {useRouter} from 'next/router';

function useHotTopics() {
  const router = useRouter();
  const isShowed = !['/', '/login', '/signup', '/signup/topics'].includes(
    router.pathname
  );

  return {isShowed};
}

export default useHotTopics;
