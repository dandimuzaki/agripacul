import AddressList from '../models/AddressList.js';
import Location from '../models/Location.js';

export const getAddressList = async (req, res) => {
  try {
    const result = await AddressList.findOne({ user: req.user.id });
    if (!result) {
      return res.status(404).json({ message: 'Please add your address' });
    }
    return res.status(200).json({
      success: true,
      message: 'Address list fetched successfully',
      data: result.addressList
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { province, city, district, subdistrict, ...rest } = req.body;

    const [provinceData, cityData, districtData, subdistrictData] = await Promise.all([
      Location.findById(province),
      Location.findById(city),
      Location.findById(district),
      Location.findById(subdistrict)
    ]);

    if (!provinceData || !cityData || !districtData || !subdistrictData) {
      return res.status(400).json({ error: 'Invalid location selection' });
    }

    const newAddress = {
      ...rest,
      province: { id: provinceData._id, name: provinceData.name },
      city: { id: cityData._id, name: cityData.name },
      district: { id: districtData._id, name: districtData.name },
      subdistrict: { id: subdistrictData._id, name: subdistrictData.name },
      rajaOngkirId: subdistrictData.rajaOngkirId
    };

    let result = await AddressList.findOne({ user: req.user.id });

    if (!result) {
      result = new AddressList({
        user: req.user.id,
        addressList: [{ ...newAddress, mainAddress: true }]
      });
    } else if (result.addressList.length === 0) {
      result.addressList.push({ ...newAddress, mainAddress: true });
    } else if (req.body.mainAddress) {
      result.addressList.forEach((addr) => addr.mainAddress = false);
      result.addressList.push(newAddress);
    } else if (!req.body.mainAddress) {
      result.addressList.push(newAddress);
    }
    await result.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: result.addressList,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const { province, city, district, subdistrict, ...rest } = req.body;

  try {
    const addressDoc = await AddressList.findOne({ user: userId });
    if (!addressDoc) {
      return res.status(404).json({ message: 'No addresses found for this user' });
    }

    // Reset mainAddress if needed
    if (req.body.mainAddress) {
      addressDoc.addressList.forEach((addr) => {
        addr.mainAddress = false;
      });
    }

    // Find the address to update
    const address = addressDoc.addressList.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // 🔄 If any location ID is passed, fetch its document
    let provinceData, cityData, districtData, subdistrictData;

    if (province) provinceData = await Location.findById(province);
    if (city) cityData = await Location.findById(city);
    if (district) districtData = await Location.findById(district);
    if (subdistrict) subdistrictData = await Location.findById(subdistrict);

    // 🔄 Update fields
    if (rest.recipientName !== undefined) address.recipientName = rest.recipientName;
    if (rest.phoneNumber !== undefined) address.phoneNumber = rest.phoneNumber;
    if (rest.label !== undefined) address.label = rest.label;
    if (rest.detail !== undefined) address.detail = rest.detail;
    if (rest.mainAddress !== undefined) address.mainAddress = rest.mainAddress;

    if (provinceData) address.province = { id: provinceData._id, name: provinceData.name };
    if (cityData) address.city = { id: cityData._id, name: cityData.name };
    if (districtData) address.district = { id: districtData._id, name: districtData.name };
    if (subdistrictData) {
      address.subdistrict = { id: subdistrictData._id, name: subdistrictData.name };
      address.rajaOngkirId = subdistrictData.rajaOngkirId;
    }

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
    const result = await AddressList.findOne({ user: req.user.id });
    if (!result) {
      return res.status(404).json({ message: 'Address is empty' });
    }

    const initialLength = result.addressList.length;
    result.addressList = result.addressList.filter((address) => address._id.toString() !== addressId);

    if (result.addressList.length === initialLength) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await result.save();
    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
      data: result.addressList
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};