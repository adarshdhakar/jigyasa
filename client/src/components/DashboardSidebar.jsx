import React, { useState } from 'react';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Collapse,
  TextField,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Search as SearchIcon,
  Schedule as ScheduleIcon,
  Assessment as AssessmentIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

import { Link, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    fontSize: '0.875rem',
  },
}));

const menuItems = [
  { text: 'Schedule', icon: <ScheduleIcon />, path: '/schedule' },
  { text: 'Evaluation Volunteer', icon: <AssessmentIcon />, path: '/evaluate-volunteer' },
  { text: 'Upload', icon: <UploadIcon />, path: '/upload' },
];

const DashboardSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [volunteerSearch, setVolunteerSearch] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSchoolClick = () => {
    setSchoolOpen(!schoolOpen);
  };

  const handleVolunteerClick = () => {
    setVolunteerOpen(!volunteerOpen);
  };

  const drawerContent = (
    <>
      <DrawerHeader>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === '/dashboard'}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.primary.main }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* School Section */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleSchoolClick}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.primary.main }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="School" />
            {schoolOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={schoolOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <SearchTextField
                size="small"
                fullWidth
                placeholder="Search schools..."
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/add-school"
                selected={location.pathname === '/add-school'}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.success.main }}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add School" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        <ListItem disablePadding>
  <ListItemButton
    sx={{ pl: 4 }}
    component={Link}
    to="/schools"
    selected={location.pathname === '/schools'}
  >
    <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.success.main }}>
      <SchoolIcon />
    </ListItemIcon>
    <ListItemText primary="School List" />
  </ListItemButton>
</ListItem>


        {/* Volunteer Section */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleVolunteerClick}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.primary.main }}>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Volunteer" />
            {volunteerOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={volunteerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <SearchTextField
                size="small"
                fullWidth
                placeholder="Search volunteers..."
                value={volunteerSearch}
                onChange={(e) => setVolunteerSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/add-volunteer"
                selected={location.pathname === '/add-volunteer'}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.success.main }}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Volunteer" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                to="/volunteers"
                selected={location.pathname === '/volunteers'}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.success.main }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Volunteer List" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Other menu items */}
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 3, color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile hamburger menu */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop permanent drawer
        <StyledDrawer variant="permanent" open>
          {drawerContent}
        </StyledDrawer>
      )}
    </Box>
  );
};

export default DashboardSidebar;
