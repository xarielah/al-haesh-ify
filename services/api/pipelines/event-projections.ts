export const eventWithInitiator = {
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
  items: 1,
};
