import Location from '../models/Location.js';
import rajaOngkirServices from '../services/rajaOngkirServices.js';

export const fetchProvinces = async (req, res) => {
  try {
    // Check if we already have provinces data in the database
    let provinces = await Location.find({ type: 'province' });

    if (provinces.length === 0) {
      // Hit RajaOngkir API through RajaOngkir services to get provinces data (id and name)
      const fetchedProvinces = await rajaOngkirServices.fetchProvinces();
      // Store each province into the database
      for (const prov of fetchedProvinces.data) {
        await Location.updateOne(
          { rajaOngkirId: prov.id, type: 'province' },
          { $set: { name: prov.name, type: 'province' } },
          { upsert: true }
        );
      }

      // Fetch again the provinces after we created them in the database
      provinces = await Location.find({ type: 'province' });
    }

    return res.status(200).json({
      success: true,
      message: 'Provinces fetched successfully',
      data: provinces
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchCities = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const parent = await Location.findById(provinceId);

    let cities = await Location.find({ type: 'city', parent: parent._id });

    if (cities.length === 0) {
      const fetchedCities = await rajaOngkirServices.fetchCities(parent.rajaOngkirId);
      for (const city of fetchedCities.data) {
        await Location.updateOne(
          { rajaOngkirId: city.id, type: 'city' },
          { $set: { name: city.name, type: 'city', parent: parent._id } },
          { upsert: true }
        );
      }

      cities = await Location.find({ type: 'city', parent: parent._id });
    }
    return res.status(200).json({
      success: true,
      message: 'Cities fetched successfully',
      data: cities
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchDistricts = async (req, res) => {
  try {
    const { cityId } = req.params;
    const parent = await Location.findById(cityId);

    let districts = await Location.find({ type: 'district', parent: parent._id });

    if (districts.length === 0) {
      const fetchedDistricts = await rajaOngkirServices.fetchDistricts(parent.rajaOngkirId);
      for (const district of fetchedDistricts.data) {
        await Location.updateOne(
          { rajaOngkirId: district.id, type: 'district' },
          { $set: { name: district.name, type: 'district', parent: parent._id } },
          { upsert: true }
        );
      }

      districts = await Location.find({ type: 'district', parent: parent._id });
    }

    return res.status(200).json({
      success: true,
      message: 'Districts fetched successfully',
      data: districts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchSubdistricts = async (req, res) => {
  try {
    const { districtId } = req.params;
    const parent = await Location.findById(districtId);

    let subdistricts = await Location.find({ type: 'subdistrict', parent: parent._id });

    if (subdistricts.length === 0) {
      const fetchedSubdistricts = await rajaOngkirServices.fetchSubdistricts(parent.rajaOngkirId);
      for (const subdistrict of fetchedSubdistricts.data) {
        await Location.updateOne(
          { rajaOngkirId: subdistrict.id, type: 'subdistrict' },
          { $set: { name: subdistrict.name, type: 'subdistrict', parent: parent._id } },
          { upsert: true }
        );
      }

      subdistricts = await Location.find({ type: 'subdistrict', parent: parent._id });
    }

    return res.status(200).json({
      success: true,
      message: 'Sub-districts fetched successfully',
      data: subdistricts
    });
  } catch (err) {[
    res.status(500).json({ message: err.message })
  ];}
};