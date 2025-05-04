import { Box, Stack } from "@mui/system";
import "./Home.css";
import {
  Typography,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import { Add, Remove,  ShoppingCart } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import { useGetproductsByNameQuery } from "../../Redux/Productapi";

import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, decreasequantity, increasequantity } from "../../Redux/Productslice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  // @ts-ignore
  const { selectedproductid,selectedproduct } = useSelector((state) => state.cartt);
  const quantityproduct = (itemApi) => {
    const product = selectedproduct.find((item) => item.id === itemApi.id);
    return product ? product.quantity : 0;
  }
  
  
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetproductsByNameQuery();
  const theme = useTheme();

  if (error) {
    return <h1>errrrrrrrrrrror</h1>
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (data) {
    return (
      <Box>
        <Stack
          sx={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent:"center",
            ml:"10px"
          }}
          gap={3.5}
          direction="row"
        >
          {data.map((item) => {
            return (
              <motion.div
              key={item.imageLink}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 2 }}
              >
                <Card
                  className="cardhover"
                  sx={{ maxWidth: 300, flexWrap: "wrap",alignItems:"center"}}
                >
                  <CardMedia sx={{minHeight:"300px"}} onClick={() => {
                    navigate(`/details/${item.id}`)
                  }
                  }
                    component="img"
                    
                    image={item.imageLink[0]}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography
                    
                      variant="body2"
                      sx={{ color: "text.secondary",direction:"rtl" }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                  {selectedproductid.includes(item.id)?  <Stack
                        sx={{ justifyContent: "center", alignItems: "center" }}
                        direction="row"
                      >
                        <IconButton onClick={() => {
                          dispatch(increasequantity(item))
                        }
                        } aria-label="add to favorites">
                          <Add />
                        </IconButton>
                        <Typography
                          sx={{
                            textAlign: "center",
                            bgcolor: teal[500],
                            borderRadius: "60%",
                            padding: "2px 6px",
                          }}
                          variant="body1"
                          color="initial"
                        >
                          {quantityproduct(item)}
                        </Typography>
                        <IconButton onClick={() => {
                                                    dispatch(decreasequantity(item))

                        }
                        } aria-label="add to favorites">
                          <Remove />
                        </IconButton>
                      </Stack>:
                      <Button  onClick={() => 
                      {
                        dispatch(addtocart(item))
                      }
                      }
                        sx={{ lineHeight: 1.1, p: 1,textTransform:"capitalize" ,backgroundColor:"#ff6600","&:hover":{backgroundColor:"#e65c00"}}}
                        variant="contained"
                      >
                        <ShoppingCart sx={{fontSize:"16px"}}/> Add to cart
                      </Button>
                }
                      
                    
                    

                    <Typography
                      // @ts-ignore
                      sx={{ color: theme.palette.primary }}
                      variant="body1"
                    >
                      ${item.price}
                    </Typography>
                  </CardActions>
                </Card>
              </motion.div>
            );
          })}
        </Stack>
      </Box>
    );
  }
};

export default Home;
