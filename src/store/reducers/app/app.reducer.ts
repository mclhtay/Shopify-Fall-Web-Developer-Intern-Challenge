import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppReducerType, Toast, ToastTypes } from './types';
import { generateToastID } from './functions';


const initialState: AppReducerType = {
  loading: false,
  toast: {
    id: '',
    message: '',
    type: 'Info'
  },
  entered: false,
  banner: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toast = { ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    enter: (state) => {
      state.entered = true;
    },
    setBanner: (state, action: PayloadAction<boolean>) => {
      state.banner = action.payload;
    }
  }
})

export default appSlice.reducer;

const { addToast, setLoading, enter, setBanner } = appSlice.actions;

export const emitToast = (msg: string, type: ToastTypes = 'Error', banner?: boolean) => dispatch => {
  const randomID = generateToastID();
  dispatch(addToast({ id: randomID, message: msg, type }));

  if (banner) {
    dispatch(setBanner(banner));
  }
}


export const updateLoading = (isLoading: boolean) => dispatch => {
  dispatch(setLoading(isLoading));
}

export const updateEnterSite = () => dispatch => {
  dispatch(enter());
}

export const disableBanner = () => dispatch => {
  dispatch(setBanner(false));
}