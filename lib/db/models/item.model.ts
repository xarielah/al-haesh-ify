import { Document, model, models, Schema } from "mongoose";
import { MongoUser } from "next-auth";
import { IUserEvent } from "./event.model";

export interface ItemCategory {
  _id: string;
  color: string;
  name: string;
}

export interface IEventItem extends Document<string> {
  title: string;
  category: ItemCategory;
  assigned: MongoUser;
  event: IUserEvent | string | undefined;
  comment?: string | null;
  addedBy: MongoUser | string | null;
  updatedBy: MongoUser | string | null;
  createdAt?: string;
  updatedAt?: string;
}

const EventItemSchema = new Schema<IEventItem>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: {
        name: {
          type: Schema.Types.String,
        },
        color: {
          type: Schema.Types.String,
        },
      },
    },
    assigned: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "UserEvent",
      required: true,
    },
    comment: {
      type: Schema.Types.String,
      default: "",
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const EventItem =
  models.EventItem || model("EventItem", EventItemSchema);
