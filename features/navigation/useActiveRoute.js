import {useRouter} from 'next/router';

function useActiveRoute(href) {
  const {asPath} = useRouter();
  const isActive = asPath === href;

  return {isActive};
}

export default useActiveRoute;
