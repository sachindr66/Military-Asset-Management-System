import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const AssetCard = ({ asset }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h6">{asset.name}</Typography>
          <Typography variant="body1">Type: {asset.type}</Typography>
          <Typography variant="body1">Quantity: {asset.quantity}</Typography>
          <Typography variant="body2" color="textSecondary">
            Base: {asset.base_id}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AssetCard;
