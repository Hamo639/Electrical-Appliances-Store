import { createSlice } from "@reduxjs/toolkit";

// use "useSelector" to get the array
const initialState = {
  selectedproduct: JSON.parse(localStorage.getItem("selectedproduct"))|| [],
  selectedproductid: JSON.parse(localStorage.getItem("selectedproductid"))|| [],
};
const Localstoragesave = (state) => {
  localStorage.setItem("selectedproduct",JSON.stringify(state.selectedproduct))
  localStorage.setItem("selectedproductid",JSON.stringify(state.selectedproductid))

}


export const counterSlice = createSlice({
  name: "cartt",
  initialState,
  // action.payload => product From API => القيمة التى بداخل الاقواس
  reducers: {
    addtocart: (state, action ) => {
      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedproduct.push(productWithQuantity);
      state.selectedproductid.push(action.payload.id);
    Localstoragesave(state)
    },

    increasequantity: (state, action) => {
      const increase = state.selectedproduct.find((item) => {
        return item.id === action.payload.id;
      });
      increase.quantity += 1;
    Localstoragesave(state)

    },

    decreasequantity: (state, action) => {
      const decrease = state.selectedproduct.find((item) => {
        return item.id === action.payload.id;
      });

      decrease.quantity -= 1;
    Localstoragesave(state)

      if (decrease.quantity <= 0) {
        const newarr = state.selectedproduct.filter((item) => {
          return item.id !== action.payload.id;
        });
        const newarrr = state.selectedproductid.filter((id) => {
          return id !== action.payload.id;
        });
        state.selectedproduct = newarr;
        state.selectedproductid = newarrr;
Localstoragesave(state)

      }
    },

    deleteproduct: (state, action) => {
      const newarr = state.selectedproduct.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newarr2 = state.selectedproductid.filter((id) => {
        return id !== action.payload.id;
      });
      state.selectedproduct = newarr;
      state.selectedproductid=newarr2;
Localstoragesave(state)
    },
  },
});

//  دائماً هتنساهااااااااااااااااااااااااااااااااااااااع
export const { addtocart, deleteproduct, decreasequantity, increasequantity } =
  counterSlice.actions;

export default counterSlice.reducer;
