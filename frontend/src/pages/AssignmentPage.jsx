import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createAssignment, getAssets, getPersonnel } from '../services/api';

const AssignmentPage = () => {
  const [assetId, setAssetId] = useState('');
  const [personnelId, setPersonnelId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');

  const [assets, setAssets] = useState([]);
  const [personnelList, setPersonnelList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetData = await getAssets();
        const personnelData = await getPersonnel();
        setAssets(assetData);
        setPersonnelList(personnelData);
      } catch (err) {
        console.error('Error fetching asset/personnel:', err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const data = {
      asset_id: assetId.trim(),
      personnel_id: personnelId.trim(),
      quantity: Number(quantity),
      date,
    };

    console.log('📦 Sending assignment data:', data);

    try {
      await createAssignment(data);
      alert('✅ Assignment done!');
    } catch (error) {
      console.error('Assignment error:', error?.response?.data || error.message);
      alert('Error assigning asset.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Assign Asset</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Asset</InputLabel>
        <Select value={assetId} onChange={(e) => setAssetId(e.target.value)} label="Asset">
          {assets.map((asset) => (
            <MenuItem key={asset._id} value={asset._id}>
              {asset.name} ({asset.type})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Personnel</InputLabel>
        <Select value={personnelId} onChange={(e) => setPersonnelId(e.target.value)} label="Personnel">
          {personnelList.map((person) => (
            <MenuItem key={person._id} value={person._id}>
              {person.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Quantity"
        fullWidth
        margin="normal"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit Assignment
      </Button>
    </Container>
  );
};

export default AssignmentPage;
