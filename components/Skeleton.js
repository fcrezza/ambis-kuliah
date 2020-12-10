import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  padding: 1.5rem;

  &:not(:last-child) {
    border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  }
`;

export const PostSkeleton = props => (
  <SkeletonContainer>
    <ContentLoader
      speed={2}
      width="100%"
      height="170px"
      viewBox="0 0 750 175"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="67" cy="150" r="15" />
      <rect x="94" y="140" rx="0" ry="0" width="200" height="20" />
      <rect x="0" y="11" rx="0" ry="0" width="40" height="70" />
      <rect x="51" y="10" rx="0" ry="0" width="100" height="30" />
      <rect x="51" y="50" rx="0" ry="0" width="100%" height="70" />
    </ContentLoader>
  </SkeletonContainer>
);

export const TrendSkeleton = props => (
  <SkeletonContainer>
    <ContentLoader
      speed={2}
      width="100%"
      height="130px"
      viewBox="0 0 400 180"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="15" cy="150" r="15" />
      <rect x="40" y="140" rx="0" ry="0" width="200" height="20" />
      <rect x="0" y="10" rx="0" ry="0" width="100" height="30" />
      <rect x="0" y="50" rx="0" ry="0" width="100%" height="70" />
    </ContentLoader>
  </SkeletonContainer>
);
