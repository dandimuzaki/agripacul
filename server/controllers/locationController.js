import Location from '../models/Location.js';
import rajaOngkirServices from '../services/rajaOngkirServices.js';

export const fetchProvinces = async (req, res) => {
  try {
    let provinces = await Location.find({ type: 'province' });

    if (provinces.length === 0) {
      const fetchedProvinces = await rajaOngkirServices.fetchProvinces();
      if (!fetchedProvinces) {
        return res.status(404).json({
          success: false,
          message: 'Provinces are not found', 
          errors: null
        });
      }
      for (const prov of fetchedProvinces.data) {
        await Location.updateOne(
          { rajaOngkirId: prov.id, type: 'province' },
          { $set: { name: prov.name, type: 'province' } },
          { upsert: true }
        );
      }

      provinces = await Location.find({ type: 'province' });
      if (!provinces) {
        return res.status(404).json({
          success: false,
          message: 'Provinces are not found', 
          errors: null
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Provinces fetched successfully',
      data: provinces
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch provinces', 
      errors: err.message
    });
  }
};

export const fetchCities = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const parent = await Location.findById(provinceId);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Target province is not found', 
        errors: null
      });
    }

    let cities = await Location.find({ type: 'city', parent: parent._id });

    if (cities.length === 0) {
      const fetchedCities = await rajaOngkirServices.fetchCities(parent.rajaOngkirId);
      if (!fetchedCities) {
        return res.status(404).json({
          success: false,
          message: 'Cities are not found', 
          errors: null
        });
      }
      for (const city of fetchedCities.data) {
        await Location.updateOne(
          { rajaOngkirId: city.id, type: 'city' },
          { $set: { name: city.name, type: 'city', parent: parent._id } },
          { upsert: true }
        );
      }

      cities = await Location.find({ type: 'city', parent: parent._id });
      if (!cities) {
        return res.status(404).json({
          success: false,
          message: 'Cities are not found', 
          errors: null
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: 'Cities fetched successfully',
      data: cities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cities', 
      errors: err.message
    });
  }
};

export const fetchDistricts = async (req, res) => {
  try {
    const { cityId } = req.params;
    const parent = await Location.findById(cityId);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Target city is not found', 
        errors: null
      });
    }

    let districts = await Location.find({ type: 'district', parent: parent._id });

    if (districts.length === 0) {
      const fetchedDistricts = await rajaOngkirServices.fetchDistricts(parent.rajaOngkirId);
      if (!fetchedDistricts) {
        return res.status(404).json({
          success: false,
          message: 'Districts are not found', 
          errors: null
        });
      }

      for (const district of fetchedDistricts.data) {
        await Location.updateOne(
          { rajaOngkirId: district.id, type: 'district' },
          { $set: { name: district.name, type: 'district', parent: parent._id } },
          { upsert: true }
        );
      }

      districts = await Location.find({ type: 'district', parent: parent._id });
      if (!districts) {
        return res.status(404).json({
          success: false,
          message: 'Districts are not found', 
          errors: null
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Districts fetched successfully',
      data: districts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch districts', 
      errors: err.message
    });
  }
};

export const fetchSubdistricts = async (req, res) => {
  try {
    const { districtId } = req.params;
    const parent = await Location.findById(districtId);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Target district is not found', 
        errors: err.message
      });
    }

    let subdistricts = await Location.find({ type: 'subdistrict', parent: parent._id });

    if (subdistricts.length === 0) {
      const fetchedSubdistricts = await rajaOngkirServices.fetchSubdistricts(parent.rajaOngkirId);
      if (!fetchedSubdistricts) {
        return res.status(404).json({
          success: false,
          message: 'Subdistricts are not found', 
          errors: null
        });
      }
      for (const subdistrict of fetchedSubdistricts.data) {
        await Location.updateOne(
          { rajaOngkirId: subdistrict.id, type: 'subdistrict' },
          { $set: { name: subdistrict.name, type: 'subdistrict', parent: parent._id } },
          { upsert: true }
        );
      }

      subdistricts = await Location.find({ type: 'subdistrict', parent: parent._id });
      if (!subdistricts) {
        return res.status(404).json({
          success: false,
          message: 'Sub-districts are not found', 
          errors: null
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Sub-districts fetched successfully',
      data: subdistricts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sub-district', 
      errors: err.message
    });
  }
};