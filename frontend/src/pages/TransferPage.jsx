import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { createTransfer } from '../services/api';  // Assuming API service to create a transfer

const TransferPage = () => {
  const [assetId, setAssetId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fromBase, setFromBase] = useState('');
  const [toBase, setToBase] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    const transferData = { asset_id: assetId, quantity, from_base_id: fromBase, to_base_id: toBase, date };
    createTransfer(transferData).then(() => {
      alert('Transfer Recorded!');
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Asset Transfer
      </Typography>
      <TextField
        label="Asset ID"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="From Base"
        value={fromBase}
        onChange={(e) => setFromBase(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="To Base"
        value={toBase}
        onChange={(e) => setToBase(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Record Transfer
      </Button>
    </Container>
  );
};

export default TransferPage;
