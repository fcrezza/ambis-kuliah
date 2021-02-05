import React from 'react';
import styled, {keyframes} from 'styled-components';

// /* generated by https://loading.io/ */

const Keyframes = keyframes`
  0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
`;

const Container = styled.div`
  width: 50px;
  height: 50px;
  display: inline-block;
  overflow: hidden;
  background: none;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
`;

const Content = styled.div`
  box-sizing: content-box;
  animation: ${Keyframes} 1s linear infinite;
  top: 25px;
  left: 25px;
  position: absolute;
  width: 25px;
  height: 25px;
  border: 4px solid #333333;
  border-top-color: transparent;
  border-radius: 50%;
`;

function Spinner() {
  return (
    <Container>
      <Inner>
        <Content />
      </Inner>
    </Container>
  );
}

export default Spinner;