import Asset from '../models/Asset.js';

const getAssets = async (req, res) => {
  try {
    let query = {};

    console.log('Role:', req.user.role);
    console.log('Base ID:', req.user.base_id);

    if (req.user.role === 'Base Commander') {
      query.base_id = req.user.base_id;
    }

    const assets = await Asset.find(query);

    if (!assets.length) {
      console.warn('No assets found for the current user/base.');
    } else {
      console.log(`Found ${assets.length} assets.`);
    }

    res.json(assets);
  } catch (err) {
    console.error('Error in getAssets:', err);
    res.status(500).json({ message: err.message });
  }
};

const createAsset = async (req, res) => {
  const { name, type, quantity, base_id } = req.body;

  const asset = new Asset({
    name,
    type,
    quantity,
    base_id,
  });

  try {
    const newAsset = await asset.save();
    console.log('Asset created:', newAsset);
    res.status(201).json(newAsset);
  } catch (err) {
    console.error('Error creating asset:', err);
    res.status(400).json({ message: err.message });
  }
};

const updateAsset = async (req, res) => {
  const { id } = req.params;
  const { name, type, quantity, base_id } = req.body;

  try {
    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    asset.name = name || asset.name;
    asset.type = type || asset.type;
    asset.quantity = quantity || asset.quantity;
    asset.base_id = base_id || asset.base_id;

    const updatedAsset = await asset.save();
    console.log('Asset updated:', updatedAsset);
    res.json(updatedAsset);
  } catch (err) {
    console.error('Error updating asset:', err);
    res.status(400).json({ message: err.message });
  }
};

const deleteAsset = async (req, res) => {
  const { id } = req.params;

  try {
    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    await asset.remove();
    console.log('Asset deleted:', asset._id);
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    console.error('Error deleting asset:', err);
    res.status(500).json({ message: err.message });
  }
};

export { getAssets, createAsset, updateAsset, deleteAsset };
