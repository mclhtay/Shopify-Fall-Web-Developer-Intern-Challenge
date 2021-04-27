import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserReducerType } from './types';
import { Movie, SearchResult } from '../../../types';
import { emitToast, updateLoading, disableBanner, updateEnterSite } from '../app/app.reducer';
import { search } from '../../../api';
import { localStorageKey } from './constants';

const initialState: UserReducerType = {
  queryString: '',
  searchResults: [],
  nominated: [],
  noResult: false,
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setQueryString: (state, action: PayloadAction<{ update: string }>) => {
      state.queryString = action.payload.update;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult>) => {
      state.searchResults = action.payload;
      state.noResult = false;
    },
    addNomination: (state, action: PayloadAction<Movie>) => {
      state.nominated.push(action.payload);
    },
    removeNomination: (state, action: PayloadAction<Movie>) => {

      const index = state.nominated.findIndex(n => n.imdbID === action.payload.imdbID);

      state.nominated = [...state.nominated.slice(0, index), ...state.nominated.slice(index + 1)];
    },
    setNoResult: (state) => {
      state.noResult = true;
    },
    loadNomination: (state, action: PayloadAction<SearchResult>) => {
      state.nominated = action.payload;
    }
  }
});


const { setQueryString, setSearchResults, addNomination, removeNomination, setNoResult, loadNomination } = userSlice.actions;


export default userSlice.reducer;


export const updateQueryString = (newQuery: string) => async (dispatch) => {
  dispatch(setQueryString({ update: newQuery }));

  if (newQuery) {
    dispatch(updateLoading(true));
    try {
      const { data: { Search } } = await search(newQuery);

      if (Search)
        dispatch(setSearchResults(Search));
      else {
        dispatch(setNoResult());
      }

    } catch (error) {
      dispatch(emitToast(error.response.data.error?.message || "An unknown error has occurred"));
    }
    dispatch(updateLoading(false));
  }
}

export const updateAddNomination = (movie: Movie) => (dispatch, getState) => {

  const { user: { nominated } } = getState();

  if (nominated.length === 5) {
    dispatch(emitToast("You cannot nominate more than 5 movies!", 'Error'));
    return;
  }

  dispatch(addNomination(movie));
  dispatch(saveUserInfo());
  if (nominated.length === 4) {
    dispatch(emitToast(`Yay, you nominated 5 movies!`, 'Success', true));

  } else {
    dispatch(emitToast(`You are now nominating '${movie.Title}'!`, 'Success'));

  }
}

export const updateRemoveNomination = (movie: Movie) => dispatch => {
  dispatch(removeNomination(movie));
  dispatch(saveUserInfo());
  dispatch(emitToast(`You are no longer nominating '${movie.Title}'!`, 'Warn'));
  dispatch(disableBanner());
}


export const loadUserSave = () => (dispatch) => {

  const localSave = localStorage.getItem(localStorageKey)

  if (localSave) {
    const userSave = JSON.parse(localSave);
    dispatch(loadNomination(userSave));

    if (userSave.length !== 0) {
      dispatch(disableBanner());
      dispatch(updateEnterSite());
    }
  }

}

export const saveUserInfo = () => (dispatch, getState) => {
  const { user: { nominated } } = getState();

  localStorage.setItem(localStorageKey, JSON.stringify(nominated));

}