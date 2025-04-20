import { IFilterList } from "@/app/(pages)/events/components/filter-list";
import { IUserEvent } from "@/lib/db/models/event.model";
import { IEventItem } from "@/lib/db/models/item.model";
import { AppDispatch } from "@/lib/store";
import {
  setCurrentEvent,
  setEvents,
  setFilterItemsBy,
} from "@/lib/store/features/events.slice";
import { getMembersAndCategories } from "@/lib/utils";
import { eventService } from "@/services/client/event.service";

export const eventsActions = {
  getEvents,
  getCurrentEventById,
  addEventItem,
  updateEventItem,
  deleteEventItem,
  setItemsFilter,
  clearItemsFilter,
};

async function getEvents(
  dispatch: AppDispatch,
  filterBy?: Record<string, string>
) {
  const events = await eventService.get(filterBy);
  dispatch(setEvents(events));
}

async function getCurrentEventById(
  dispatch: AppDispatch,
  eventId: string,
  itemsFilterBy: Record<string, string>
) {
  const event = await eventService.getById(eventId);

  if (!event) throw new Error("Event not found");

  const { members, categories } = getMembersAndCategories(event);

  event.members = members;
  event.categories = categories;

  if (itemsFilterBy) {
    let eventItems = structuredClone(event.items);

    if (itemsFilterBy.category) {
      eventItems = eventItems.filter(
        (item) =>
          item.category?.name === (itemsFilterBy.category as any).name &&
          item.category?.color === (itemsFilterBy.category as any).color
      );
    }

    if (itemsFilterBy.assigned) {
      eventItems = eventItems.filter(
        (item) => item.assigned?.email === (itemsFilterBy.assigned as any).email
      );
    }

    if (itemsFilterBy.search) {
      eventItems = eventItems.filter((item) =>
        item.title.toLowerCase().includes(itemsFilterBy.search.toLowerCase())
      );
    }

    event.items = eventItems;
  }

  dispatch(setCurrentEvent(event));
}

async function addEventItem(
  dispatch: AppDispatch,
  currentEvent: IUserEvent,
  item: Partial<IEventItem>
) {
  const newAddedItem = await eventService.addItem(item);

  if (!newAddedItem) throw new Error("Could not add item");

  const curEvent = { ...currentEvent };

  curEvent.items = [...currentEvent.items, newAddedItem];

  const { members, categories } = getMembersAndCategories(
    curEvent as IUserEvent
  );

  curEvent.members = members;
  curEvent.categories = categories;

  dispatch(setCurrentEvent(curEvent));
}

async function updateEventItem(
  dispatch: AppDispatch,
  event: IUserEvent,
  item: Partial<IEventItem>
) {
  const updatedItem = await eventService.updateItem(item);

  if (!updatedItem) throw new Error("Could not update item");

  const curEvent = structuredClone(event);

  const updateItemIdx = curEvent.items.findIndex(
    (item) => item._id === updatedItem._id
  );

  curEvent.items[updateItemIdx] = updatedItem;

  const { members, categories } = getMembersAndCategories(
    curEvent as IUserEvent
  );

  curEvent.members = members;
  curEvent.categories = categories;

  dispatch(setCurrentEvent(curEvent));
}

async function deleteEventItem(
  dispatch: AppDispatch,
  event: IUserEvent,
  item: IEventItem
) {
  const deletedItem = await eventService.deleteItem(item._id);

  if (!deletedItem) throw new Error("Could not delete item");

  const curEvent = structuredClone(event);

  const deleteItemIdx = curEvent.items.findIndex(
    (eventItem) => eventItem._id === item._id
  );

  curEvent.items.splice(deleteItemIdx, 1);

  const { members, categories } = getMembersAndCategories(
    curEvent as IUserEvent
  );

  curEvent.members = members;
  curEvent.categories = categories;

  dispatch(setCurrentEvent(curEvent));
}

function setItemsFilter(dispatch: AppDispatch, filterBy: IFilterList) {
  dispatch(setFilterItemsBy(filterBy));
}

function clearItemsFilter(dispatch: AppDispatch) {
  dispatch(setFilterItemsBy({}));
}
