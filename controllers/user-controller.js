const User = require('../models/user-model')

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data submitted'});
    }
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(User);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await Medicine.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.email = email;
    user.password = password;
    user.name = name;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid data submitted'});
    }
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await Medicine.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};