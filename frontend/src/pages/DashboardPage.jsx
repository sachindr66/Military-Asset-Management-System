
import { Container, Typography, Grid } from '@mui/material';
import Dashboard from '../components/Dashboard';  

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
