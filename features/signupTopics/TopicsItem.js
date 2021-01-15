import styled from 'styled-components';

import {Button} from 'components/Button';

const TopicsItemContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const TopicsItemTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors['black.100']};

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

function TopicsItem({title, onToggleSelect, isSelected}) {
  return (
    <TopicsItemContainer>
      <TopicsItemTitle>{title}</TopicsItemTitle>
      <Button
        variant={isSelected ? 'default' : 'outline'}
        onClick={onToggleSelect}
      >
        {isSelected ? 'Diikuti' : 'Ikuti'}
      </Button>
    </TopicsItemContainer>
  );
}

export default TopicsItem;
