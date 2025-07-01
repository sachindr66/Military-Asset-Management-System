
import { Container, Typography, Grid } from '@mui/material';
import Dashboard from '../components/Dashboard';  // Assuming Dashboard is a component that handles the display

const DashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Military Asset Dashboard
      </Typography>
      <Dashboard /> 
    </Container>
  );
};

export default DashboardPage;









// import React, { useEffect, useState } from 'react';
// import { fetchDashboardMetrics } from '../services/api';
// import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

// const DashboardPage = () => {
//   const [metrics, setMetrics] = useState({});
//   const [filter, setFilter] = useState({ base_id: '', date_range: '', equipment_type: '' });

//   useEffect(() => {
//     fetchDashboardMetrics(filter).then(response => setMetrics(response.data));
//   }, [filter]);

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Dashboard</Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Opening Balance</Typography>
//               <Typography variant="h4">{metrics.openingBalance}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Closing Balance</Typography>
//               <Typography variant="h4">{metrics.closingBalance}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Net Movement</Typography>
//               <Typography variant="h4">{metrics.netMovement}</Typography>
//               <Button onClick={() => { /* open pop-up for detailed view */ }}>View Details</Button>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Assigned Assets</Typography>
//               <Typography variant="h4">{metrics.assignedAssets}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default DashboardPage;
