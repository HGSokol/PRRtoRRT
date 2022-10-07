import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Region } from 'types';

type controlSlice = {
  search: string,
  region: Region | ''
}

const initialState: controlSlice = {
  search: '',
  region: '',
};

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRegion: (state, action: PayloadAction<Region | ''>) => {
      state.region = action.payload;
    },
    clearControls: () => initialState,
  }
});

export const {setRegion, setSearch, clearControls} = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;
