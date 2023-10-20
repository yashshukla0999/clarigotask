const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {};

authController.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.create({ username, password, role });

    const token = jwt.sign({ userId: user._id, role: user.role }, 'gwcwgcgwcgwvcgw789');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username ' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'gwcwgcgwcgwvcgw789', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

authController.changePassword = async (req, res) => {
  try {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user || user.password !== oldPassword) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error changing password' });
  }
};

authController.getUserDetail = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user detail' });
  }
};

module.exports = authController;
