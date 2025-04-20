export const itemsWithAllRefs = {
  _id: 1,
  title: 1,
  category: 1,
  assigned: {
    $cond: {
      if: { $ifNull: ["$assignedDetails._id", false] },
      then: {
        _id: "$assignedDetails._id",
        name: "$assignedDetails.name",
        image: "$assignedDetails.image",
      },
      else: null,
    },
  },
  event: 1,
  comment: 1,
  addedBy: {
    $cond: {
      if: { $ifNull: ["$addedByDetails._id", false] },
      then: {
        _id: "$addedByDetails._id",
        name: "$addedByDetails.name",
        image: "$addedByDetails.image",
      },
      else: null,
    },
  },
  updatedBy: {
    $cond: {
      if: { $ifNull: ["$updatedByDetails._id", false] },
      then: {
        _id: "$updatedByDetails._id",
        name: "$updatedByDetails.name",
        image: "$updatedByDetails.image",
      },
      else: null,
    },
  },
  createdAt: 1,
  updatedAt: 1,
};
