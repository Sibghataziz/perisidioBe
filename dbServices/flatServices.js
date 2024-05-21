import FlatModel from "../models/flat.js";

async function findOneFlatByQuery(query) {
  const flat = await FlatModel.findOne(query);
  return flat;
}

async function findFlatsByQuery(query) {
  const flats = await FlatModel.find(query);
  return flats;
}

async function findFlatsByQueryWithPagination(query, pageNo, pageSize) {
    const flats = await FlatModel.find(query).skip((pageNo-1)*pageSize).limit(pageSize);
    return flats;
  }

async function insertFlat(flat) {
  const newFlat = await FlatModel.create([flat]);
  return newFlat;
}

async function updateOneFlat(query, updatedData){
    const flat = await FlatModel.updateOne(query,{
        $set: updatedData
    })
    return flat
}

async function deleteOneFlat(query){
    await FlatModel.deleteOne(query)
}

export default {
  findOneFlatByQuery,
  findFlatsByQuery,
  insertFlat,
  updateOneFlat,
  deleteOneFlat,
  findFlatsByQueryWithPagination
};
