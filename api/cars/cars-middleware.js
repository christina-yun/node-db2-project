const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const checkedId = await Cars.getById(req.params.id);

    if (!checkedId) {
      next({
        status: 404,
        message: `car with id ${req.params.id} is not found`,
      });
    } else {
      req.car = checkedId;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload.vin) {
      next({ status: 400, message: `vin is missing` });
    } else if (!payload.make) {
      next({ status: 400, message: `make is missing` });
    } else if (!payload.model) {
      next({ status: 400, message: `model is missing` });
    } else if (!payload.mileage) {
      next({ status: 400, message: `mileage is missing` });
    } else {
      req.payload = payload;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    const validVin = vinValidator.validate(req.body.vin);

    if (!validVin) {
      next({ status: 400, message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const carVinNumsArray = await Cars.getAll();
    const carVinNumMatch = carVinNumsArray.filter((car) => {
      return car.vin === req.body.vin;
    });

    if (carVinNumMatch.length > 0) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
