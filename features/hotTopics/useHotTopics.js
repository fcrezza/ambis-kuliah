import {useRouter} from 'next/router';

function useHotTopics() {
  const router = useRouter();
  const isShowed = !['/', '/topics'].includes(router.asPath);

  return {isShowed};
}

export default useHotTopics;
