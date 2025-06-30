import Purchase from '../models/Purchase.js';

// Create a new purchase
export const createPurchase = async (req, res) => {
  const { asset_id, quantity, base_id, date } = req.body;

  try {
    const purchase = new Purchase({
      asset_id,
      quantity,
      base_id,
      date,
    });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get historical purchases
export const getPurchases = async (req, res) => {
  const { startDate, endDate, equipmentType } = req.query;

  try {
    const query = {};

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (equipmentType) {
      query['asset.type'] = equipmentType;
    }

    const purchases = await Purchase.find(query).populate('asset_id', 'name type');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
