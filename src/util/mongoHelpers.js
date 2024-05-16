import { ObjectId } from "mongodb";

export const getObjectId = (id) => ObjectId.createFromHexString(id);