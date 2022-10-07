import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Country, Extra, Status } from 'types';

export const loadCountries = createAsyncThunk<
  {data: Country[]},
  undefined,
  { 
    state: { countries: CountrySlice},
    extra: Extra,
    rejectValue: string,
  }
>(
  '@@countries/load-countries',
  async (_, {
    extra: {client, api},
    rejectWithValue,
  }) => {
    try{
      return client.get(api.ALL_COUNTRIES)
    } catch(e) {
      if(e instanceof Error){
        return rejectWithValue(e.message)
      }
      return rejectWithValue('Unknown error')
    }
  },
  {
    condition: (_, { getState }) => {
      const { countries: { status } } = getState();

      if (status === 'loading') {
        return false;
      }
    }
  }
);

type CountrySlice = {
  status: Status,
  error: string | null,
  list: Country[],
}

const initialState: CountrySlice = {
  status: 'idle',
  error: null,
  list: [],
}

const countrySlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || "Cannot load data"
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
  }
})

export const countryReducer = countrySlice.reducer;

// selectors
export const selectCountriesInfo = (state: RootState) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length
})

export const selectAllCountries = (state: RootState) => state.countries.list;
export const selectVisibleCountries = (state: RootState, {search = '', region = ''}) => {
  return state.countries.list.filter(
    country => (
      country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
    )
  )
}



