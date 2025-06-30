import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem
} from '@mui/material';
import { createPurchase, fetchAssets } from '../services/api';

const PurchasePage = () => {
  const [assets, setAssets] = useState([]);
  const [assetId, setAssetId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAssets();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };
    loadAssets();
  }, []);

  const handleSubmit = async () => {
    const base_id = localStorage.getItem('base_id');

    if (!assetId || !quantity || !date || !base_id) {
      alert('Please fill all fields.');
      return;
    }

    const purchaseData = {
      asset_id: assetId,
      quantity: parseInt(quantity),
      base_id,
      date,
    };

    try {
      await createPurchase(purchaseData);
      alert('✅ Purchase Recorded!');
    } catch (err) {
      console.error('❌ Error recording purchase:', err);
      alert('Failed to record purchase. Check console.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Record Purchase</Typography>

      <TextField
        select
        label="Select Asset"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        fullWidth
        margin="normal"
      >
        {assets.map((asset) => (
          <MenuItem key={asset._id} value={asset._id}>
            {asset.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        fullWidth
      >
        Record Purchase
      </Button>
    </Container>
  );
};

export default PurchasePage;
