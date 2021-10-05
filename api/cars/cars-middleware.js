const Cars = require("./cars-model");

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
  try{
    const payload = req.body;
    
    if(!payload.vin){
      next({ status: 400, message: `vin is missing`});
    } else if(!payload.make){
      next({ status: 400, message: `make is missing`});
    } else if(!payload.model){
      next({ status: 400, message: `model is missing`});
    } else if(!payload.mileage){
      next({ status: 400, message: `mileage is missing`});
    } else {
      req.payload = payload;
      next();
    }
  }
  catch(err){
    next(err);
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  next();
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
