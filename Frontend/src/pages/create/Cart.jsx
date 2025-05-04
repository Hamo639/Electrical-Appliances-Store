import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { decreasequantity, deleteproduct, increasequantity } from "../../Redux/Productslice";

const Cart = () => {
  // @ts-ignore
  const { selectedproduct } = useSelector((state) => state.cartt);
  const dispatch = useDispatch()

  let total=0
  return (
    <Box>
      {selectedproduct.map((item) => {
        
                  total+=item.price * item.quantity

        return(

<Stack
key={item.imageLink}
        className="cart"
        gap={3}
        sx={{
          p: 1,
          width: { md: "500px", xs: "300px" },
          alignItems: "center",
          borderRadius: "10px",
          justifyContent: "space-between",
          mb:"20px"
        }}
        direction="row"
      >
        <IconButton onClick={() => {
          dispatch(deleteproduct(item))
        }
        } color="error" sx={{ display: { xs: "block", md: "none" } }}>
          <Delete />
        </IconButton>
        <Button onClick={() => {
                    dispatch(deleteproduct(item))

        }
        }
          sx={{ display: { xs: "none", md: "block" } }}
          variant="text"
          color="error"
        >
          Delete
        </Button>
        <Typography variant="body1" color="initial">
          ${item.price*item.quantity}
        </Typography>
        <Stack
          sx={{ justifyContent: "center", alignItems: "center" }}
          direction="row"
        >
          <IconButton onClick={() => {
                                      dispatch(increasequantity(item))

          }
          } sx={{ color: "#1976d2" }} aria-label="add to favorites">
            <Add />
          </IconButton>
          <Typography
            sx={{
              color: "black",
              textAlign: "center",
              bgcolor: blue[200],
              borderRadius: "60%",
              padding: "2px 6px",
            }}
            variant="body1"
            color="initial"
          >
            {item.quantity}
          </Typography>
          <IconButton onClick={() => {
                                      dispatch(decreasequantity(item))

          }
          } sx={{ color: "#1976d2" }} aria-label="add to favorites">
            <Remove />
          </IconButton>
        </Stack>
        <Typography variant="body1" color="initial">
          T-shirt
        </Typography>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <img
            className="image"
            style={{ width: "70px", height: "70px" }}
            src={item.imageLink[1]}
            alt=""
          />
        </Box>
      </Stack>
        )
      }
      )}
      

      <Paper sx={{ mt: "40px", width: "200px", mx: "auto" }}>
        <Typography p={2} align="center" variant="body1">
          Cart Summary
        </Typography>
        <Divider />
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 1.1 }}>
          <Typography variant="body1">subTotal</Typography>
          <Typography variant="body1">${total}</Typography>
        </Stack>
        <Button variant="contained" fullWidth>
          Checked Out
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
