const Device = require('../models/Device');

exports.registerDevice = async (req, res) => {
  try {
    const { device_identifier, description } = req.body;
    const company_id = req.user.company_id;

    if (!company_id) {
      return res.status(403).json({ error: 'User not associated with a company' });
    }

    let device = await Device.findOne({ where: { device_identifier } });
    if (device) {
      await device.update({ description, company_id });
    } else {
      device = await Device.create({
        device_identifier,
        description,
        company_id
      });
    }

    res.json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.findAll({ where: { company_id: req.user.company_id } });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
