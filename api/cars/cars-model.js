const db = require("./../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

async function create(newCar) {
  const id = await db("cars").insert(newCar);
  return getById([id]);
}

const updateById = async (id, changes) => {
  await db("cars").update(changes).where("id", id);

  return getById(id);
};

const deleteById = (id) => {
  return db("cars").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
