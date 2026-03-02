import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Drawer, List, 
  ListItem, ListItemButton, ListItemIcon, ListItemText, Box, CssBaseline, IconButton, Divider, useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const drawerWidth = 260;

export default function Layout({ children }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navItems = [
    { label: 'Raw Materials', path: '/raw-materials', icon: <InventoryIcon /> },
    { label: 'Products and Formulas', path: '/products', icon: <CategoryIcon /> },
    { label: 'Production Suggestion', path: '/production', icon: <PrecisionManufacturingIcon /> }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar Superior */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.main
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Production Suggestion System
          </Typography>
        </Toolbar>
      </AppBar>

 
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main,
            color: '#ffffff',
            borderRight: 'none'
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
          <IconButton onClick={toggleDrawer} sx={{ color: '#ffffff' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Box sx={{ overflow: 'auto', mt: 1 }}>
          <List>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      backgroundColor: isActive ? 'rgba(3, 218, 198, 0.15)' : 'transparent',
                      borderRight: isActive ? `4px solid ${theme.palette.secondary.main}` : '4px solid transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? theme.palette.secondary.main : '#ffffff' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      sx={{ 
                        color: isActive ? theme.palette.secondary.main : '#ffffff',
                        fontWeight: isActive ? 'bold' : 'normal' 
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>


      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'stretch', 
          backgroundColor: theme.palette.background.default, 
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: open ? 0 : `-${drawerWidth}px`,
        }}
      >
        <Toolbar /> 
        
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {children}
        </Box>

        <Box 
          component="footer" 
          sx={{ 
            p: 2, 
            textAlign: 'center', 
            backgroundColor: theme.palette.primary.main,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 'auto'
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Production Suggestion System - Challenge (Plastics Industry). Developed by Alan Bezerra.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}