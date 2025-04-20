import { Document, model, models, Schema } from "mongoose";
import { MongoUser } from "next-auth";
import { IEventItem, ItemCategory } from "./item.model";

export interface IUserEvent extends Document<string> {
  title: string;
  description: string;
  date: string;
  time: string | null | undefined;
  place: string | null | undefined;
  members: string[] | MongoUser[] | [];
  categories: ItemCategory[];
  initiator: MongoUser | string;
  items: IEventItem[];
}

const UserEventSchema = new Schema<IUserEvent>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    date: {
      type: Schema.Types.String,
      required: true,
    },
    time: {
      type: Schema.Types.String,
      default: "",
    },
    place: {
      type: Schema.Types.String,
      default: "",
    },
    members: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    initiator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserEvent =
  models.UserEvent || model("UserEvent", UserEventSchema);
