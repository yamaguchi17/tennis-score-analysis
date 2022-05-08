import { useState, useContext } from "react";
import { DisplayTypeContext } from "../providers/DisplayTypeProvider";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import { DISPLAY_TYPES,LANG_TYPES } from "../common/AppConst";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Divider from '@mui/material/Divider';

export const Header = () => {

  const [open, setOpne] = useState(false);
  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);

  const toggleDrawer =
    (state: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setOpne(state);
      };
  
  const displayChange = (newDisplay:number) => {
    setDisplayType(newDisplay);
  }

  const ListConpo = () => (
    <Box
      sx={{ width: '12rem' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key={"Home"} sx={{padding:0}}>
          <ListItemButton onClick={()=>{displayChange(DISPLAY_TYPES.MAIN)}}>
            <ListItemIcon sx={{minWidth:'2.5rem'}}>
              <HomeIcon color={"primary"}/>
            </ListItemIcon>
            <ListItemText primary={globalState.lang === LANG_TYPES.JP ? "ホーム" : "Home"} />
          </ListItemButton>
        </ListItem>
        <Divider light/>
        <ListItem key={"DataManage"} sx={{padding:0}}>
          <ListItemButton onClick={()=>{displayChange(DISPLAY_TYPES.DATA_MANAGE)}}>
            <ListItemIcon sx={{minWidth:'2.5rem'}}>
              <AdminPanelSettingsIcon color={"primary"}/>
            </ListItemIcon>
            <ListItemText primary={globalState.lang === LANG_TYPES.JP ? "データ管理" : "Data Manage"} />
          </ListItemButton>
        </ListItem>        
      </List>
    </Box>
  );


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              Tennis Score Analysis
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >
        <ListConpo />
      </Drawer>
    </>
  );
}