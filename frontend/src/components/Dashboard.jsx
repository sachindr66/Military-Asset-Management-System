import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AssetCard from './AssetCard';
import { fetchDashboardMetrics } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [filter, setFilter] = useState({
    base_id: '',
    date_range: '',
    equipment_type: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedBaseId = localStorage.getItem('base_id');
    if (!storedBaseId) {
      console.error('❌ base_id not found in localStorage');
      return;
    }

    const updatedFilter = {
      ...filter,
      base_id: storedBaseId,
    };

    setFilter(updatedFilter);

    fetchDashboardMetrics(updatedFilter)
      .then((data) => {
        setMetrics(data);
      })
      .catch((err) => {
        console.error('Error loading dashboard metrics:', err);
      });
  }, []);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Opening Balance</Typography>
              <Typography variant="h4">{metrics.openingBalance || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Closing Balance</Typography>
              <Typography variant="h4">{metrics.closingBalance || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Net Movement</Typography>
              <Typography variant="h4">{metrics.netMovement || 0}</Typography>
              <Button onClick={handleDialogOpen}>View Details</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Assigned Assets</Typography>
              <Typography variant="h4">{metrics.assignedAssets || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Optional: Asset list display */}
        {metrics.assets &&
          metrics.assets.map((asset) => (
            <Grid item xs={12} sm={6} md={3} key={asset._id}>
              <AssetCard asset={asset} />
            </Grid>
          ))}
      </Grid>

      {/* Dialog for Net Movement Details */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Net Movement Details</DialogTitle>
        <DialogContent dividers>
          <Typography>Purchases: {metrics.purchasesTotal || 0}</Typography>
          <Typography>Transfers In: {metrics.transfersInTotal || 0}</Typography>
          <Typography>Transfers Out: {metrics.transfersOutTotal || 0}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
