import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({ message: 'Account not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Account succesfully deleted',
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
}