import React from 'react';
import styled from 'styled-components';
import { MainContainer } from './components/MainContainer';
import store from './store';
import {Provider} from 'react-redux';
import {Toast} from './components/Toast';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  position:relative;
  
  & section{
    background: white;
    border-radius: 16px;
    filter: drop-shadow(0px 8px 16px rgba(52, 60, 68, 0.1));
  }

  & p, h1, h2, h3, button{
    font-family: 'Montserrat', sans-serif;
  }
`;

function App() {

  return (
    <Provider store={store}>
      <Wrapper>
        <Toast />
        <MainContainer />
      </Wrapper>
    </Provider>
  )
}

export default App;
