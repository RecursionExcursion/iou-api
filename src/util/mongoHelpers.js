import { ObjectId } from 'mongodb';

export const getObjectId = (id) => {
  return ObjectId.createFromHexString(id);
}