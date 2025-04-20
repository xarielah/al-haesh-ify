import { auth } from "@/auth";
import { userEventService } from "@/services/api/user-event.service";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  const session = req.auth;

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const events = await userEventService.get({ userId: session.user._id });

  return NextResponse.json(events);
});

export const POST = auth(async (req) => {
  const session = req.auth;

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, description, date, place } = await req.json();
  console.log(title, description, date, place);

  const eventToCreate = {
    title,
    description,
    date,
    place,
    initiator: session.user._id,
  };

  const newEvent = await userEventService.create(eventToCreate);

  return NextResponse.json(newEvent);
});
