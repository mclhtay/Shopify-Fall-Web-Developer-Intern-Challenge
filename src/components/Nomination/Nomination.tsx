import * as React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { StoreState } from 'src/store';
import { Movie, SearchResult } from 'src/types';
import {updateRemoveNomination} from 'src/store/reducers/user/user.reducer';
import { RowItem } from '../RowItem';

const Wrapper = styled.section`
  width: 50%;
  display: flex;
  flex-direction:column;
  padding: 15px;
  min-height: 300px;
  justify-content:flex-start
`;

const Title = styled.h2`

`;

const NominationList = styled.ul``;


export const Nomination: React.FC = () => {

  const dispatch = useDispatch();

  const nominatedList = useSelector<StoreState, SearchResult>(s => s.user.nominated);

  const handleRemoveNomination = (m: Movie) => {
    dispatch(updateRemoveNomination(m));
  }


  return (
    <Wrapper>
      <Title>Nominations</Title>
      <NominationList>
        {
          nominatedList.map(n => (
            <RowItem key={n.imdbID} disabled={false} dangerButton buttonText="Remove" rowText={`${n.Title} (${n.Year})`} itemId={n.imdbID} 
              onClick={() => handleRemoveNomination(n)}
            />
          ))
        }
      </NominationList>
    </Wrapper>
  )
}