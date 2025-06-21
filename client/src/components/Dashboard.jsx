import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Container, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DRAWER_WIDTH = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  }),
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const AnalysisPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(3),
}));

const StyledListItem = styled(ListItem)({
  padding: '4px 0',
});

const ChartContainer = styled(Box)({
  width: '100%',
  height: '300px',
  marginTop: '1rem',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StatBox = ({ title, value, isLoading }) => (
  <StyledPaper>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    {isLoading ? (
      <Skeleton variant="text" height={60} />
    ) : (
      <Typography variant="h4" component="div" fontWeight="bold">
        {value}
      </Typography>
    )}
  </StyledPaper>
);

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool,
};

StatBox.defaultProps = {
  isLoading: false,
};

const MonthlyAnalysis = ({ 
  assessmentData, 
  attendanceData,
  isLoading 
}) => {
  // Pie chart data for school assessment
  const pieChartData = {
    labels: ['Improved Performance', 'Completed Assessments', 'Needs Improvement'],
    datasets: [{
      data: [85, 75, 15],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }],
  };

  // Line chart data for attendance tracking
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Average Attendance Rate (%)',
      data: [88, 92, 90, 94],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 80,
        max: 100,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <AnalysisPaper>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Monthly Analysis
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={3}>
        {/* Assessment Section */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Assessment Of Schools
            </Typography>
            {isLoading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <>
                <ChartContainer>
                  <Pie data={pieChartData} options={pieChartOptions} />
                </ChartContainer>
                <List dense>
                  {assessmentData.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        </Grid>

        {/* Attendance Section */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Live Attendance Tracking
            </Typography>
            {isLoading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <>
                <ChartContainer>
                  <Line data={lineChartData} options={lineChartOptions} />
                </ChartContainer>
                <List dense>
                  {attendanceData.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </AnalysisPaper>
  );
};

MonthlyAnalysis.propTypes = {
  assessmentData: PropTypes.arrayOf(PropTypes.string).isRequired,
  attendanceData: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
};

MonthlyAnalysis.defaultProps = {
  isLoading: false,
};

const Dashboard = () => {
  const dashboardData = {
    stats: {
      volunteers: 15,
      schools: 60,
      ongoingPrograms: 'Science Fair',
    },
    assessmentData: [
      '85% schools showing improved academic performance',
      '45 schools completed monthly assessments',
      'Key areas of improvement: Science and Mathematics',
    ],
    attendanceData: [
      'Average attendance rate: 92%',
      '52 schools reporting daily attendance',
      '15 schools achieved 95%+ attendance this month',
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Stats Boxes - Left Side */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <StatBox 
                  title="Total Volunteers" 
                  value={dashboardData.stats.volunteers} 
                />
              </Grid>
              <Grid item>
                <StatBox 
                  title="Total Schools" 
                  value={dashboardData.stats.schools} 
                />
              </Grid>
              <Grid item>
                <StatBox 
                  title="Ongoing Programs" 
                  value={dashboardData.stats.ongoingPrograms} 
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Monthly Analysis - Right Side */}
          <Grid item xs={12} md={8}>
            <MonthlyAnalysis 
              assessmentData={dashboardData.assessmentData}
              attendanceData={dashboardData.attendanceData}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;