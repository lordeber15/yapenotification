const { Op } = require('sequelize');

exports.syncNotifications = async (req, res) => {
  try {
    const { Notification } = req.tenant.models;
    const notifications = Array.isArray(req.body) ? req.body : [req.body];
    
    const results = [];
    for (const notif of notifications) {
      try {
        const created = await Notification.create({
          device_id: notif.id_dispositivo,
          type: notif.tipo,
          sender_name: notif.nombre,
          amount: notif.monto,
          verification_code: notif.codigo_verificacion,
          raw_text: notif.raw_texto,
          timestamp: notif.fecha_hora
        });
        results.push({ id: created.id, status: 'success' });
      } catch (e) {
        results.push({ status: 'error', message: e.message });
      }
    }
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { Notification } = req.tenant.models;
    const { desde, hasta } = req.query;
    
    const queryOptions = {
      order: [['timestamp', 'DESC']]
    };

    if (desde || hasta) {
      queryOptions.where = {
        timestamp: {}
      };
      if (desde) queryOptions.where.timestamp[Op.gte] = new Date(desde);
      if (hasta) queryOptions.where.timestamp[Op.lte] = new Date(hasta);
    } else {
      // Default last 24h
      const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
      queryOptions.where = {
        timestamp: { [Op.gte]: last24h }
      };
    }

    const notifications = await Notification.findAll(queryOptions);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
