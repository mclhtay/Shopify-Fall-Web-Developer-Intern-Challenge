import * as React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
// @ts-ignore
import vid from '../../assets/bg.mp4';
import { updateEnterSite } from 'src/store/reducers/app/app.reducer';


const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 1;
`;

const VideoWrapper = styled.video`
  min-width: 100%; 
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 1;
`;

const RedirectPanel = styled.div`
  display: flex;
  position: absolute;
  z-index: 10000000;
  width: 100%;
  height: 99vh;
  left: 0;
  justify-content: center;
  align-items: center;
  color: white;
  background-color:rbga(0, 0, 0, 0.8);
  flex-direction: column;
  text-align: center;

  overflow: hidden;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 6rem;
`;

const Desc = styled.p`
  font-weight: bolder;
  font-size: 1rem;
`;

const EnterButton = styled.button`
  display: inline-block;
  background-color: black;
  border: 1px solid white;
  padding: 10px;
  color: white;
  font-weight: bold;  
  cursor: pointer;
  margin: 10px;
  width: 100px;

  &:disabled{
    cursor: not-allowed;
  }
`;

export const TitlePage: React.FC = () => {

  const [clicked, updateClicked] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const handleEnter = () => {
    updateClicked(true);
  }

  React.useEffect(() => {
    if(clicked){
      
        dispatch(updateEnterSite());
      
    }
  }, [clicked, dispatch])

  return (
    <MainWrapper >
      <VideoWrapper autoPlay muted loop >
        <source src={vid} />
        Your browser does not support HTML5 video.
      </VideoWrapper>
      <RedirectPanel>
        <Title>Ospify</Title>
        <Desc>The Oscar Nominator of Shopify</Desc>
        <EnterButton disabled={clicked} onClick={handleEnter}>Enter</EnterButton>
      </RedirectPanel>
    </MainWrapper>
  )
}