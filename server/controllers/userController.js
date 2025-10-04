import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'Users not found', 
        errors: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully', 
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users', 
      errors: err.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User is not found', 
        errors: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Account succesfully deleted',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user', 
      errors: err.message
    });
  }
};