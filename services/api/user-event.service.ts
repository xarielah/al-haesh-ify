import dbConnect from "@/lib/db/db-connect";
import { IUserEvent, UserEvent } from "@/lib/db/models/event.model";
import { EventItem, IEventItem } from "@/lib/db/models/item.model";
import { FilterQuery, Types, UpdateResult } from "mongoose";
import { eventWithInitiator } from "./pipelines/event-projections";
import { itemsWithAllRefs } from "./pipelines/item-projections";

export const userEventService = {
  get,
  create,
  update,
  deleteEvent,
  getById,
  addItem,
  updateItem,
  deleteItem,
};

export interface FilterBy {
  userId: string;
  eventId?: string;
  withItems?: boolean;
}

interface GetByIdOptions {
  withItems?: boolean;
}

async function getById(
  userId: string,
  eventId: string,
  options?: GetByIdOptions
): Promise<IUserEvent | null> {
  await dbConnect();

  // Convert string IDs to ObjectId
  const eventObjectId = new Types.ObjectId(eventId);
  const userObjectId = new Types.ObjectId(userId);

  const aggregate = UserEvent.aggregate();

  aggregate.match({ _id: eventObjectId, initiator: userObjectId });

  aggregate.lookup({
    from: "users",
    localField: "initiator",
    foreignField: "_id",
    as: "initiatorDetails",
  });

  aggregate.unwind("$initiatorDetails");

  aggregate.project({
    _id: 1,
    title: 1,
    description: 1,
    date: 1,
    place: 1,
    members: 1,
    initiator: {
      _id: "$initiatorDetails._id",
      name: "$initiatorDetails.name",
      image: "$initiatorDetails.image",
      email: "$initiatorDetails.email",
    },
  });

  const results = await aggregate.limit(1).exec();
  if (results.length === 0) return null;

  const foundEvent = results[0];

  if (options?.withItems) {
    const items = await getEventItems(foundEvent._id);
    foundEvent.items = items;
  }

  return foundEvent;
}

async function get(filterBy: FilterBy): Promise<IUserEvent[]> {
  await dbConnect();
  const query: FilterQuery<IUserEvent> = {};

  query.$or = [
    { initiator: new Types.ObjectId(filterBy.userId) },
    { members: new Types.ObjectId(filterBy.userId) },
  ];

  if (filterBy.eventId) {
    query._id = new Types.ObjectId(filterBy.eventId);
  }

  const aggregate = UserEvent.aggregate();

  aggregate.match(query);

  aggregate.lookup({
    from: "users",
    localField: "initiator",
    foreignField: "_id",
    as: "initiatorDetails",
  });

  aggregate.unwind("$initiatorDetails");

  if (filterBy.withItems) {
    aggregate.lookup({
      from: "eventitems",
      localField: "_id",
      foreignField: "event",
      as: "items",
    });

    aggregate.unwind("$items");
  }

  aggregate.project(eventWithInitiator);

  return aggregate.exec();
}

async function create(event: Partial<IUserEvent>): Promise<IUserEvent> {
  await dbConnect();
  return UserEvent.create(event);
}

async function update(event: IUserEvent): Promise<UpdateResult> {
  await dbConnect();
  return UserEvent.updateOne({ _id: event._id }, event, { new: true });
}

async function deleteEvent(eventId: string) {
  await dbConnect();
  return UserEvent.deleteOne({ _id: eventId });
}

async function addItem(item: Partial<IEventItem>) {
  await dbConnect();
  const createdItem = await EventItem.create<IEventItem>(item);

  return getEventItemById(createdItem._id);
}

async function getEventItems(eventId: string) {
  await dbConnect();
  const aggregate = EventItem.aggregate();

  aggregate.match({ event: new Types.ObjectId(eventId) });

  aggregate.lookup({
    from: "users",
    localField: "assigned",
    foreignField: "_id",
    as: "assignedDetails",
  });

  aggregate.unwind({
    path: "$assignedDetails",
    preserveNullAndEmptyArrays: true,
  });

  aggregate.lookup({
    from: "users",
    localField: "addedBy",
    foreignField: "_id",
    as: "addedByDetails",
  });

  aggregate.unwind({
    path: "$addedByDetails",
    preserveNullAndEmptyArrays: true,
  });

  aggregate.lookup({
    from: "users",
    localField: "updatedBy",
    foreignField: "_id",
    as: "updatedByDetails",
  });

  aggregate.unwind({
    path: "$updatedByDetails",
    preserveNullAndEmptyArrays: true,
  });

  aggregate.project(itemsWithAllRefs);

  const results = await aggregate.exec();
  return results;
}

async function getEventItemById(itemId: string) {
  await dbConnect();
  const aggregate = EventItem.aggregate();

  aggregate.match({ _id: new Types.ObjectId(itemId) });

  aggregate.lookup({
    from: "users",
    localField: "assigned",
    foreignField: "_id",
    as: "assignedDetails",
  });

  aggregate.unwind({
    path: "$assignedDetails",
    preserveNullAndEmptyArrays: true,
  });

  aggregate.lookup({
    from: "users",
    localField: "addedBy",
    foreignField: "_id",
    as: "addedByDetails",
  });

  aggregate.unwind({
    path: "$addedByDetails",
    preserveNullAndEmptyArrays: true,
  });

  aggregate.lookup({
    from: "users",
    localField: "updatedBy",
    foreignField: "_id",
    as: "updatedByDetails",
  });

  aggregate.unwind({
    path: "$updatedByDetails",
    preserveNullAndEmptyArrays: true,
  });

  aggregate.project(itemsWithAllRefs);

  const results = await aggregate.limit(1).exec();

  if (results.length === 0) return null;

  return results[0];
}

async function updateItem(item: IEventItem) {
  await dbConnect();
  const result = await EventItem.findOneAndUpdate({ _id: item._id }, item);

  if (!result) return null;

  return getEventItemById(item._id);
}

async function deleteItem(itemId: string) {
  await dbConnect();
  const result = await EventItem.findOneAndDelete({ _id: itemId });

  if (!result) return null;

  return getEventItemById(itemId);
}
