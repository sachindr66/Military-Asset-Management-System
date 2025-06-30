import Transfer from '../models/Transfer.js';
import Asset from '../models/Asset.js';
import Base from '../models/Base.js';

export const createTransfer = async (req, res) => {
  const { asset_id, from_base_id, to_base_id, quantity, date } = req.body;

  try {
    console.log('🔥 Transfer request body:', req.body);

    const asset = await Asset.findOne({_id:asset_id, base_id:from_base_id});
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found.' });
    }

    console.log('🔎 Asset found:', asset);

    const qty = parseInt(quantity, 10);
    if (asset.quantity < qty) {
      return res.status(400).json({ message: 'Not enough assets to transfer.' });
    }

    // Deduct quantity from source base
    asset.quantity -= qty;
    await asset.save();

    // Create transfer record
    const transfer = new Transfer({
      asset_id,
      from_base_id,
      to_base_id,
      quantity: qty,
      date,
    });
    await transfer.save();

    // Update destination base
    const targetAsset = await Asset.findOne({ _id: asset_id, base_id: to_base_id });
    if (targetAsset) {
      targetAsset.quantity += qty;
      await targetAsset.save();
    } else {
      const newTargetAsset = new Asset({
        name: asset.name,
        type: asset.type,
        quantity: qty,
        base_id: to_base_id,
      });
      await newTargetAsset.save();
    }

    console.log('✅ Transfer completed and saved.');
    res.status(201).json({ message: 'Transfer completed successfully.' });
  } catch (err) {
    console.error('❌ Transfer error:', err);
    res.status(500).json({ message: err.message });
  }
};


export const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find()
      .populate('asset_id', 'name')
      .populate('from_base_id', 'name')
      .populate('to_base_id', 'name');

    res.status(200).json(transfers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transfers', error: err });
  }
};


