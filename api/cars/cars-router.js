const router = require("express").Router();

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const Cars = require("./cars-model");

//[GET] /api/cars
router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

//[GET] /api/cars/:id
router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    res.status(200).json(req.car);
  } catch (err) {
    next(err);
  }
});

//[POST] /api/cars
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      Cars.create(req.body)
        .then((newAccount) => {
          res.status(201).json(newAccount);
        })
        .catch(next);
    } catch (err) {
      next(err);
    }
  }
);

//**[PUT] /api/cars/:id
router.put(
  "/:id",
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  (req, res, next) => {
    try {
      Cars.updateById(req.params.id, req.body)
        .then((updatedAccount) => {
          res.status(200).json(updatedAccount);
        })
        .catch(next);
    } catch (err) {
      next(err);
    }
  }
);

//**[DELETE] /api/cars/:id
router.delete("/:id", checkCarId, (req, res, next) => {
  try {
    Cars.deleteById(req.params.id)
      .then(() => {
        res.json(req.car);
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
});

//Error handling
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
