import * as React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { StoreState } from 'src/store';
import { UserReducerType } from 'src/store/reducers/user/types';
import {updateAddNomination} from 'src/store/reducers/user/user.reducer';

import {RowItem} from '../RowItem';
import { Movie, SearchResult } from 'src/types';

const Wrapper = styled.section`
  width: 50%;
  display: flex;
  flex-direction:column;
  padding: 15px;
  min-height: 300px;
  justify-content:flex-start;


`;

const Title = styled.h2`

`;

const NoResultMessage = styled.p`
  
`;

const ResultList = styled.ul``;


const shouldDisable = (item: Movie, nominatedList: SearchResult): boolean => {

  return nominatedList.reduce((acc: boolean, next) => {
    
    if(acc) return acc;
    
    if(next.imdbID === item.imdbID){
      acc = true;
    }else{
      acc = false
    }
    return acc;
  }, false)
}

export const Result:React.FC = () => {

  const dispatch = useDispatch();

  const {queryString, searchResults, noResult, nominated} = useSelector<StoreState, UserReducerType>(s => s.user);

  const handleNominate = (m: Movie) =>{
    dispatch(updateAddNomination(m));
  }

  return(
    <Wrapper>
      <Title>{queryString? `Results for '${queryString}'`: `Search Results`}</Title>
      {noResult? 
      <NoResultMessage>
        {queryString? 'There are no movies found' : 'Start typing and search for movies'}
      </NoResultMessage>
      :
        <ResultList>
          {searchResults.map(s => (
            <RowItem rowText={`${s.Title} (${s.Year})`} buttonText="Nominate" itemId={s.imdbID} onClick={() => handleNominate(s)} 
            disabled={shouldDisable(s, nominated)}/>
          ))}
        </ResultList>
    }
    </Wrapper>
  )
}