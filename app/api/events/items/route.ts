import { auth } from "@/auth";
import { IEventItem } from "@/lib/db/models/item.model";
import { userEventService } from "@/services/api/user-event.service";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  try {
    const session = req.auth;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const item = await req.json();

    const itemToAdd: Partial<IEventItem> = { ...item };

    if (!itemToAdd.event) {
      throw new Error("Event id is required to add item");
    }

    const isPartOfEvent = await userEventService.getById(
      session.user._id,
      itemToAdd.event as string
    );

    if (!isPartOfEvent) {
      throw new Error("User is not part of the event");
    }

    itemToAdd.addedBy = session.user._id;
    itemToAdd.updatedBy = session.user._id;

    if (!itemToAdd.assigned || !isValidObjectId(itemToAdd.assigned)) {
      delete itemToAdd.assigned;
    }

    const addedItem = await userEventService.addItem(itemToAdd);

    return NextResponse.json(addedItem);
  } catch (error) {
    console.error("Error creating item", error);
    return NextResponse.json(
      { error: "Could not create / add item" },
      { status: 400 }
    );
  }
});
