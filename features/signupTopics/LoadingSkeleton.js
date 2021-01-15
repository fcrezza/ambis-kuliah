import ContentLoader from 'react-content-loader';

function LoadingSkeleton(props) {
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={80}
      viewBox="0 0 340 84"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="565" y="157" rx="3" ry="3" width="67" height="11" />
      <rect x="0" y="6" rx="0" ry="0" width="100%" height="75" />
    </ContentLoader>
  );
}

export default LoadingSkeleton;
