import React from 'react';
import {useRouter} from 'next/router';

// import Posts from './Posts';
import Search from 'components/Search';
import {Container, Copyright} from './utils';

function HotTopics() {
  const router = useRouter();
  const isShowed = !['/', '/login', '/signup', '/signup/topics'].includes(
    router.pathname
  );

  if (isShowed) {
    return (
      <Container>
        <Search placeholder="Cari diskusi" />
        {/* <Posts /> */}
        <Copyright>© 2020 Ambis Kuliah. All rights reserved</Copyright>
      </Container>
    );
  }

  return null;
}

export default HotTopics;
