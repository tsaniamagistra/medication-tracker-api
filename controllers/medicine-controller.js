const Medicine = require('../models/medicine-model');

const createMedicine = async (req, res) => {
  try {
    const { name, dosage, frequency, frequencyType, additionalInfo, doseSchedules, timezone, price, currency } = req.body;
    const medicine = new Medicine({ name, dosage, frequency, frequencyType, additionalInfo, doseSchedules, timezone, price, currency });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data submitted'});
    }
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMedicineByName = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({ name: req.params.name });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateMedicineById = async (req, res) => {
  try {
    const { name, dosage, frequency, frequencyType, additionalInfo, doseSchedules, timezone, price, currency } = req.body;
    let medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    medicine.name = name;
    medicine.dosage = dosage;
    medicine.frequency = frequency;
    medicine.frequencyType = frequencyType;
    medicine.additionalInfo = additionalInfo;
    medicine.doseSchedules = doseSchedules;
    medicine.timezone = timezone;
    medicine.price = price;
    medicine.currency = currency;
    await medicine.save();
    res.status(200).json(medicine);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data submitted'});
    }
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    await medicine.remove();
    res.status(200).json({ message: 'Medicine deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createMedicine, getAllMedicines, getMedicineById, getMedicineByName, updateMedicineById, deleteMedicineById };
