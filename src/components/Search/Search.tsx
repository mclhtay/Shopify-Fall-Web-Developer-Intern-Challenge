import * as React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {updateQueryString as uqs} from '../../store/reducers/user/user.reducer';

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content: center;

`;


const Heading = styled.label`
  margin: 10px;
`;


const SearchInputWrapper = styled.div`
  display: flex;
  width:100%;
  position: relative;
  margin: 10px;

  & i{
    position: absolute;
    left:10px;
    top: 2px;
    border: none;
  }

`;

const SearchBar = styled.input`
  width: 90%;
  padding-left: 30px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #8fb9d9;

  @media (max-width: 500px){
    width: 70%;
  }
`;

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [queryString, updateQueryString] = React.useState<string>('');


  const handleQueryChange = (e) => {
    updateQueryString(e.target.value);
  }

  React.useEffect(() => {

    const debounce = setTimeout(async() => {
      
         dispatch(uqs(queryString));
      
    }, 500);
    return () => clearTimeout(debounce)

  }, [queryString, dispatch])


  return (
    <Wrapper >
      <Heading htmlFor="query">Movie title</Heading>
        <SearchInputWrapper>
          <i className="fa fa-search"></i>
          <SearchBar type="text" id="query" value={queryString} onChange={handleQueryChange}/>
        </SearchInputWrapper>
    </Wrapper>
  )

}