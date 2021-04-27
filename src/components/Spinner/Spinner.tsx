import * as React from 'react';
import styled, {keyframes} from 'styled-components';


interface Props{
  width?: number;
  height?: number;
  text?: string;
  showSpinner?: boolean
}


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spin = styled.div`
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid #3498db;
  animation: ${spin} 2s linear infinite; 
`;

const DEFAULT_WIDTH = 120;
const DEFAULt_HEIGHT = 120; 
const DEFAULT_TEXT = "Loading";

export const Spinner: React.FC<Props> = ({width = DEFAULT_WIDTH, height = DEFAULt_HEIGHT, text = DEFAULT_TEXT, showSpinner = true }: Props) => {

  return(
    <Wrapper >
      {showSpinner ? <Spin className="spinner" style={{width: width, height: height}} /> : null}
      <p>{text}</p>
    </Wrapper>

  )
}