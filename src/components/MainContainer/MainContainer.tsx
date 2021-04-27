import * as React from 'react';
import styled from 'styled-components';
import {Search} from '../Search';
import {Result} from '../Result';
import {Nomination} from '../Nomination';
import {useSelector, useDispatch} from 'react-redux';
import { StoreState } from 'src/store';
import {TitlePage} from '../TitlePage';
import { loadUserSave } from 'src/store/reducers/user/user.reducer';

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 5% 20%;
  display: flex;
  flex-direction: column;


`;


const MainTitle = styled.h1`

`;

const FeedbackWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
    
  & > section{
    margin: 5%;
  }


  @media (max-width: 500px){
    flex-direction: column;
    align-items: center;

    & > section{
      width: 100%;
    }
  }
`;

export const MainContainer: React.FC = () => {
  
  const entered = useSelector<StoreState, boolean>(s => s.app.entered);
  const dispatch = useDispatch();

  React.useEffect(()=> {
    dispatch(loadUserSave());
  }, [dispatch]);

  return (
    <>
  {
    entered?
    <MainWrapper>
      <MainTitle>
        Ospify
      </MainTitle>
      <Search />
      <FeedbackWrapper>
        <Result />
        <Nomination />
      </FeedbackWrapper>
  </MainWrapper>
  : <TitlePage />  
}
  </>
)}