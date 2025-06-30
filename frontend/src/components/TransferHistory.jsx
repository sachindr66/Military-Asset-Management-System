import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchTransfers } from '../services/api';  // Assuming you have a service to fetch transfers

const TransferHistory = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    fetchTransfers().then((response) => {
      setTransfers(response.data);  // Assuming the response contains transfer data
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>From Base</TableCell>
            <TableCell>To Base</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer._id}>
              <TableCell>{transfer.asset_name}</TableCell>
              <TableCell>{transfer.quantity}</TableCell>
              <TableCell>{transfer.from_base}</TableCell>
              <TableCell>{transfer.to_base}</TableCell>
              <TableCell>{new Date(transfer.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransferHistory;
