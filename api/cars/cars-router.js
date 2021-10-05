const router = require('express').Router();
const Cars = require('./cars-model');

//[GET] /api/cars
router.get('/', (req, res, next) => {}) 

//[GET] /api/cars/:id
router.get('/:id', (req, res, next) => {}) 

//[POST] /api/cars
router.post('/', (req, res, next) => {})

//**[PUT] /api/cars/:id
router.put('/:id', (req, res, next) => {})

//**[DELETE] /api/cars/:id
router.delete('/:id', (req, res, next) => {})

//Error handling
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
});

module.exports = router;
