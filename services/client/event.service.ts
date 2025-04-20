import { IUserEvent } from "@/lib/db/models/event.model";
import { IEventItem } from "@/lib/db/models/item.model";

export const eventService = {
  get,
  update,
  create,
  deleteEvent,
  getById,
  addItem,
  updateItem,
  deleteItem,
};

async function get(
  filterBy: Record<string, string> = {}
): Promise<IUserEvent[]> {
  const urlQueryParams = new URLSearchParams(filterBy);
  const queryParams =
    urlQueryParams.size > 0 ? "?" + urlQueryParams.toString() : "";

  return fetch(`/api/events${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

async function getById(eventId: string): Promise<IUserEvent> {
  return fetch(`/api/events/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

async function create(event: Partial<IUserEvent>): Promise<IUserEvent> {
  return fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((res) => res.json());
}

async function update(event: IUserEvent): Promise<void> {
  return fetch("/api/events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then((res) => res.json());
}

async function deleteEvent(eventId: string) {
  return fetch(`/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

async function addItem(item: Partial<IEventItem>) {
  return fetch("/api/events/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
}

async function updateItem(
  item: Partial<IEventItem>
): Promise<IEventItem | null> {
  return fetch(`/api/events/items/${item._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
}

async function deleteItem(itemId: string): Promise<IEventItem | null> {
  return fetch(`/api/events/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
