import React from 'react';

import Head from 'components/Head';
import ExploreFeat from 'features/explore';

function Explore() {
  return (
    <>
      <Head
        title="Eksplor topik - Ambis Kuliah"
        description="Eksplor berbagai macam topik diskusi"
      />
      <ExploreFeat />
    </>
  );
}

export default Explore;
