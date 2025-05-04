 
import {
  Toolbar,
  AppBar,
  Avatar,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const Appbar = ({ drawerWidth, showDrawer }) => {
  return (
    <AppBar
    elevation={7}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` }, backgroundColor: '#2c2c2c', 
        bgcolor: '#2c2c2c',
        boxShadow: '0 4px 20px rgba(255, 102, 0, 0.7)',
        transition: 'box-shadow 0.5s ease, transform 0.5s ease', // انيميشن ناعمة
        '&:hover': {
          boxShadow: '0 8px 30px rgba(255, 80, 0, 0.9), 0 12px 50px rgba(255, 0, 0, 0.5)', // لما ييجي الماوس عليه يولع أكتر
          transform: 'scale(1.01)',
    
      }}}
      position="static"
    >
      <Toolbar>
        <IconButton
          onClick={() => {
            showDrawer();
          }}
          sx={{ mr: "9px", display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Link
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            "&:hover": { fontSize: "16.5px" },
          }}
          color="inherit"
          href="/"
        >
          Store
        </Link>

        <Typography mr={2} variant="body1" color="inherit">
          Hamo
        </Typography>

        <Avatar alt="Remy Sharp" src="./imges/hamo.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
