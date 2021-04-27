/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import styled, {keyframes} from 'styled-components';

interface Props {
  disabled: boolean;
  buttonText: string;
  onClick: (e) => void;
  rowText: string;
  itemId: string;
  dangerButton? : boolean;
}


const Row = styled.li`
  display: flex;
  align-items:center;
  &::before{
    content: '🎬'
  }
`;

const RowText = styled.p``;

const HoverAnimation = keyframes`
  from{
    background-color: #66CD00;
  }to{
    background-color: #8fb9d9;
  }
`;

const RowButton = styled.button<{danger: boolean| undefined, disabled: boolean}>`
  display: inline-block;
  background-color: #66CD00;
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: white;
  font-weight: bold;  
  cursor: pointer;
  margin: 10px;

  background-color: ${({danger}) => danger? `red` : `#66CD00`};

  &:hover{
    animation: ${({disabled}) => disabled? `` : `HoverAnimation 0.2s linear` };
    background-color: ${({disabled}) => disabled? `gray` : `#8fb9d9` };
  }
  &:disabled{
    cursor: not-allowed;
    background-color: gray;
  }

`;

export const RowItem: React.FC<Props> =( {disabled, buttonText, onClick, rowText, itemId, dangerButton}: Props) => (
  <Row>
    <RowText>{rowText}</RowText>
    <RowButton danger={dangerButton} id={itemId} onClick={onClick} disabled={disabled}>{buttonText}</RowButton>
  </Row>
)