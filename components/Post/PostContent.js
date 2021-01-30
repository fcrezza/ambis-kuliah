import styled from 'styled-components';

const ContentContainer = styled.div``;

export const ContentTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.3rem;
  line-height: 30px;
  font-weight: 700;
  display: inline-block;
  margin: 0;
`;

const ContentDescription = styled.p`
  line-height: 30px;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1rem;
  margin: 0;
`;

const ContentImage = styled.div``;

function PostContent({title, description, image}) {
  return (
    <ContentContainer>
      {title ? <ContentTitle>{title}</ContentTitle> : null}
      <ContentDescription>{description}</ContentDescription>
      <ContentImage imageUrl={image} />
    </ContentContainer>
  );
}

export default PostContent;
