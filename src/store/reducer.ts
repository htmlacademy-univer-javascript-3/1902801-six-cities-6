import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockOffers, Offer } from '../mocks/offers';

type State = {
  activeCity: string;
  offers: Offer[];
};

const initialState: State = {
  activeCity: 'Paris',
  offers: mockOffers,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.activeCity = action.payload;
    },
    setOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
  },
});

export const { setCity, setOffers } = slice.actions;
export default slice.reducer;
