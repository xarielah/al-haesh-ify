import { auth } from "@/auth";
import { userEventService } from "@/services/api/user-event.service";
import { NextResponse } from "next/server";

export const DELETE = auth(async (req) => {
  const session = req.auth;

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ message: "DELETE Hello World" });
});

export const PUT = auth(async (req) => {
  const session = req.auth;

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ message: "PUT Hello World" });
});

export const GET = auth(async (req, { params }) => {
  try {
    const session = req.auth;

    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { eventId } = await (params as any);

    const event = await userEventService.getById(session.user._id, eventId, {
      withItems: true,
    });

    if (!event)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error getting event", error);
    return NextResponse.json({ error: "Could not get event" }, { status: 400 });
  }
});
