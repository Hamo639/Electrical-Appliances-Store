import { Divider, Drawer, List, useTheme, IconButton, styled, Badge } from "@mui/material";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  Brightness4,
  Brightness7,
  Home,

  ShoppingCart,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    
    // @ts-ignore
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));
const Drawerr = ({
  drawerWidth,
  setmyMOde,
  noneORblock,
  drawerType,
  hideDrawer,
}) => {
  const currentLocation = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();
  // @ts-ignore
  const { selectedproduct } = useSelector((state) => state.cartt);

  const myList = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Cart", icon:  <IconButton aria-label="cart">
      <StyledBadge badgeContent={selectedproduct.length} color="secondary">
        <ShoppingCart />
      </StyledBadge>
    </IconButton>, path: "/cart" },
    
  ];

  return (
    <Drawer
      sx={{
        display: { xs: noneORblock, sm: "block" },

        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant={drawerType}
      anchor="left"
      open={true}
      onClose={() => {
        hideDrawer();
      }}
    >
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
          disablePadding
        >
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );

              setmyMOde(theme.palette.mode === "light" ? "dark" : "light");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7 sx={{ color: "orange" }} />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
        </ListItem>

        <Divider />

        {myList.map((item) => {
          return (
            <ListItem
            key={item.text}
              sx={{
                bgcolor:
                  currentLocation.pathname === item.path
                    ? // @ts-ignore
                      theme.palette.favColor.main
                    : null,
              }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}

      
      </List>
    </Drawer>
  );
};

export default Drawerr;
