exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert([
    {
      vin: "JH4KA7650PC002520",
      make: "Acura",
      model: "Legend",
      mileage: 2000,
      title: "clean",
      transmission: "failing",
    },
    {
      vin: "1FV3EFAC7TL676933",
      make: "Vespa",
      model: "GTS300",
      mileage: 3049,
      title: "clean",
      transmission: "good",
    },
    {
      vin: "4S3BJ6329M1918965",
      make: "Subaru",
      model: "Outback",
      mileage: 23985,
      title: null,
      transmission: null,
    },
  ]);
};
