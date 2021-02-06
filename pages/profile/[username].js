import {ErrorBoundary} from 'react-error-boundary';
import styled from 'styled-components';

import {ProfileContent, ErrorFallback} from 'features/profile';
import {useRouter} from 'next/router';

const ProfileContainer = styled.div`
  display: flex;
`;

function Profile() {
  const router = useRouter();

  return (
    <ProfileContainer>
      <ErrorBoundary resetKeys={[router]} FallbackComponent={ErrorFallback}>
        <ProfileContent />
      </ErrorBoundary>
    </ProfileContainer>
  );
}

export default Profile;
