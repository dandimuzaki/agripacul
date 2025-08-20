import AddressList from '../models/AddressList.js'
import shippingServices from '../services/shippingServices.js'

export const getAddressList = async (req, res) => {
  try {
    const result = await AddressList.findOne({ user: req.user._id })
    if (!result) {
      return res.status(404).json({ message: 'Please add your address' })
    }
    return res.status(200).json({
      success: true,
      message: 'Address list fetched successfully',
      data: result.addressList
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProvinces = async (req, res) => {
  try {
    const provinces = await shippingServices.getProvinces();
    return res.status(200).json({
      success: true,
      message: 'Provinces fetched successfully',
      data: provinces
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCities = async (req, res) => {
  const { provinceId } = req.params;
  try {
    const cities = await shippingServices.getCities(provinceId);
    return res.status(200).json({
      success: true,
      message: 'Cities fetched successfully',
      data: cities
    })
  } catch (err) {[
    res.status(500).json({ message: err.message })
  ]}
}

export const getDistricts = async (req, res) => {
  const { cityId } = req.params;
  try {
    const districts = await shippingServices.getDistricts(cityId);
    return res.status(200).json({
      success: true,
      message: 'Districts fetched successfully',
      data: districts
    })
  } catch (err) {[
    res.status(500).json({ message: err.message })
  ]}
}

export const getSubdistricts = async (req, res) => {
  const { districtId } = req.params;
  try {
    const subdistricts = await shippingServices.getSubdistricts(districtId);
    return res.status(200).json({
      success: true,
      message: 'Sub-districts fetched successfully',
      data: subdistricts
    })
  } catch (err) {[
    res.status(500).json({ message: err.message })
  ]}
}

export const addAddress = async (req, res) => {
  try {
    let result = await AddressList.findOne({ user: req.user._id })
    
    if (!result) {
      result = new AddressList({
        user: req.user._id,
        addressList: [{ ...req.body, mainAddress: true }]
      })
    } else {
      if (result.addressList.length == 0) {
        result.addressList.push({ ...req.body, mainAddress: true })
      } else if (req.body.mainAddress) {
        result.addressList.forEach(addr => addr.mainAddress = false)
        result.addressList.push(req.body)
      }
    }
    await result.save()

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: result.addressList,
    })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const editAddress = async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.addressId;
  const updates = req.body;

  try {
    const addressDoc = await AddressList.findOne({ user: userId });
    if (!addressDoc) {
      return res.status(404).json({ message: 'No addresses found for this user' });
    }

    // Reset mainAddress if needed
    if (updates.mainAddress) {
      addressDoc.addressList.forEach(addr => {
        addr.mainAddress = false;
      });
    }

    // Find the address to update
    const address = addressDoc.addressList.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Apply updates safely
    Object.assign(address, updates);

    await addressDoc.save();

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: addressDoc.addressList,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteAddress = async (req, res) => {
  const { addressId } = req.params;

  try {
    const result = await AddressList.findOne({ user: req.user._id })
    if (!result) {
      return res.status(404).json({ message: 'Address is empty' })
    }

    const initialLength = result.addressList.length;
    result.addressList = result.addressList.filter((address) => address._id.toString() !== addressId)

    if (result.addressList.length === initialLength) {
      return res.status(404).json({ message: 'Address not found' })
    }

    await result.save()
    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
      data: result.addressList
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}