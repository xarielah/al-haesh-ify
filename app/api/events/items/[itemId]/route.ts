import { auth } from "@/auth";
import { userEventService } from "@/services/api/user-event.service";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const PUT = auth(async (req, { params }) => {
  const session = req.auth;

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { itemId } = await (params as any);

  const item = await req.json();

  if (!item)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  const itemToUpdate = { ...item };

  if (!itemToUpdate.assigned || !isValidObjectId(itemToUpdate.assigned)) {
    delete itemToUpdate.assigned;
  }

  const updatedItem = await userEventService.updateItem(itemToUpdate);

  return NextResponse.json(updatedItem);
});

export const DELETE = auth(async (req, { params }) => {
  try {
    const session = req.auth;

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { itemId } = await (params as any);

    const item = await userEventService.deleteItem(itemId);

    if (!item) {
      throw new Error("Item not found");
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error deleting item", error);
    return NextResponse.json(
      { error: "Could not delete item" },
      { status: 400 }
    );
  }
});
