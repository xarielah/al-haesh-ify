import { IUserEvent } from "@/lib/db/models/event.model";
import { ItemCategory } from "@/lib/db/models/item.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MongoUser } from "next-auth";

interface ICurrentEvent extends IUserEvent {
  categories: ItemCategory[];
  members: MongoUser[];
}

export interface EventsState {
  loadingEvents: boolean;
  events: IUserEvent[];
  currentEvent: ICurrentEvent | null;
  itemsFilterBy: Record<string, string>;
}

const initialState: EventsState = {
  loadingEvents: false,
  events: [],
  currentEvent: null,
  itemsFilterBy: {},
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<any>) => {
      state.events = action.payload;
    },
    setCurrentEvent: (state, action: PayloadAction<any>) => {
      state.currentEvent = action.payload;
    },
    setFilterItemsBy: (state, action: PayloadAction<any>) => {
      state.itemsFilterBy = action.payload;
    },
  },
});

export const { setCurrentEvent, setEvents, setFilterItemsBy } =
  eventsSlice.actions;

export default eventsSlice.reducer;
