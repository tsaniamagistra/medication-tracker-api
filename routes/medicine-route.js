const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine-controller');

router.post('/', medicineController.createMedicine);

router.get('/', medicineController.getAllMedicines);

router.get('/id/:id', medicineController.getMedicineById);

router.get('/name/:name', medicineController.getMedicineByName);

router.put('/:id', medicineController.updateMedicineById);

router.delete('/:id', medicineController.deleteMedicineById);

module.exports = router;
