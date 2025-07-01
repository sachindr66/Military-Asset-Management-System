import Asset from '../models/Asset.js';
import Purchase from '../models/Purchase.js';
import Transfer from '../models/Transfer.js';
import Assignment from '../models/Assignment.js';

export const getDashboardMetrics = async (req, res) => {
  const baseId = req.query.base_id;
  if (!baseId) {
    return res.status(400).json({ message: 'base_id is required' });
  }
  try {
    const assets = await Asset.find({ base_id: baseId });
    const openingBalance = assets.reduce((acc, asset) => acc + asset.quantity, 0);

    const purchases = await Purchase.find({ base_id: baseId });
    const transfersIn = await Transfer.find({ to_base_id: baseId });
    const transfersOut = await Transfer.find({ from_base_id: baseId });
    const assignments = await Assignment.find({ base_id: baseId });

    const purchasesTotal = purchases.reduce((acc, purchase) => acc + purchase.quantity, 0);
    const transfersInTotal = transfersIn.reduce((acc, transfer) => acc + transfer.quantity, 0);
    const transfersOutTotal = transfersOut.reduce((acc, transfer) => acc + transfer.quantity, 0);
    const assignedAssets = assignments.reduce((acc, assignment) => acc + assignment.quantity, 0);
    const expendedAssets = assignedAssets; 

    const closingBalance = openingBalance + purchasesTotal + transfersInTotal - transfersOutTotal - assignedAssets;

    res.json({
      openingBalance,
      closingBalance,
      netMovement: purchasesTotal + transfersInTotal - transfersOutTotal,
      assignedAssets,
      expendedAssets,
      purchasesTotal,
      transfersInTotal,
      transfersOutTotal,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
