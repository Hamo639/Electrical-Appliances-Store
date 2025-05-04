import  { useState } from "react";
import { useGetoneproductByNameQuery } from "../../Redux/Productapi";
import { useParams } from "react-router-dom";
import "./Details.css";
import Detailsimg from "./Detailsimg";
import { useRef } from "react";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  decreasequantity,
  increasequantity,
} from "../../Redux/Productslice";
import { teal } from "@mui/material/colors";
import { motion } from "framer-motion";
const Details = () => {
  // @ts-ignore
  const { selectedproductid, selectedproduct } = useSelector(
    // @ts-ignore
    (state) => state.cartt
  );
  const dispatch = useDispatch();

  const quantityproduct = (itemApi) => {
    const product = selectedproduct.find((item) => item.id === itemApi.id);
    return product ? product.quantity : 0;
  };
  const [index, setindex] = useState(0);
  const myRef = useRef(null);
  let { id } = useParams();
  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const { data, error, isLoading } = useGetoneproductByNameQuery(id);
  if (error) {
    return <h1>errorrrrrrrrrrrrrrr</h1>
  }
  if (isLoading) {
    return(
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    )
  }
  if (data) {
    return (
        <motion.div
                    key={data.imageLink}
                      initial={{ y: -200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 50, duration: 4}}
                    >
      <div className="app">
        <div className="details" key={data.id}>
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>

            <p>{data.description}</p>

            <Detailsimg images={data.imageLink} tab={handleTab} myRef={myRef} />
            {selectedproductid.includes(data.id) ? (
              <Stack sx={{ alignItems: "center",mt:"20px" }} direction="row">
                <IconButton
                  onClick={() => {
                    dispatch(increasequantity(data));
                  }}
                  aria-label="add to favorites"
                >
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
                  {quantityproduct(data)}
                </Typography>
                <IconButton
                  onClick={() => {
                    dispatch(decreasequantity(data));
                  }}
                  aria-label="add to favorites"
                >
                  <Remove />
                </IconButton>
              </Stack>
            ) : (
              <Button
                onClick={() => {
                  dispatch(addtocart(data));
                }}
                sx={{ lineHeight: 1.1, p: 1, textTransform: "capitalize",mt:"20px" }}
                variant="contained"
              >
                <ShoppingCart sx={{ fontSize: "16px" }} /> Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
      </motion.div>
    );
  }
};

export default Details;
