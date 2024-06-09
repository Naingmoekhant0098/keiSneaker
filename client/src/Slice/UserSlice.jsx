import { createSlice,current } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
     currentUser : null,
     userCart : [],
     loading : false,
     error : null,
     orders : [],
  },
  reducers: {

    signUpStart : (state)=>{
        state.loading = true,
        state.error = null
    },
    signInStart : (state)=>{
      state.loading = true,
      state.error = null
  },
    signUpSuccess : (state,action)=>{
      state.currentUser = action.payload;
      state.loading=false,
      state.error=null
    },
    signUpFail : (state,action)=>{
      state.loading = false,
      state.error = action.payload
    },
    signOut : (state)=>{
      state.currentUser = null;
      state.loading=false,
      state.error=null
    },
    signInFail : (state,action)=>{
      state.loading = false,
      state.error = action.payload
    },

    addToCart : (state,action)=>{
     
       const isInCard =state.userCart?.find((item)=>item._id ===action.payload._id && item.color === action.payload.color && item.size === action.payload.size);
       
       
      
       if(isInCard){
        const prev=(current(isInCard).qty)
         state.userCart = state.userCart?.map((ct)=>ct._id=== action.payload._id ? {
          ...ct,
          qty : prev + action.payload.qty
         } : ct)
       
       }else{
          state.userCart?.unshift(action.payload)
         
         
       }
        
          
    },

    IncreaseCount : (state,action)=>{

      const isInCard =state.userCart?.find((item)=>item._id ===action.payload._id && item.color === action.payload.color && item.size === action.payload.size);
       
       
      if(isInCard){
        state.userCart = state.userCart?.map((ct)=>ct._id=== action.payload._id && ct.color === action.payload.color && ct.size === action.payload.size ? {
         ...ct,
         qty : action.payload.qty+1,
        } : ct)
      
      }
     
    },
    DecreaseCount : (state,action)=>{
       
      const isInCard =state.userCart?.find((item)=>item._id ===action.payload._id && item.color === action.payload.color && item.size === action.payload.size);
       
       
      if(isInCard && action.payload.qty >0){
        state.userCart = state.userCart?.map((ct)=>ct._id=== action.payload._id && ct.color === action.payload.color && ct.size === action.payload.size ? {
         ...ct,
         qty : action.payload.qty-1,
        } : ct)
      
      }
     
    },

    deleteItem : (state,action)=>{
      const isInCard =state.userCart?.find((item)=>item._id ===action.payload._id);
      if(isInCard){
        state.userCart = state.userCart?.filter((item)=>item._id!=action.payload._id)
      
      }
    },
    clearItems : (state,action)=>{
        state.userCart=[];
    },

    addOrder : (state,action)=>{

      const isInCard =state.orders?.find((item)=>item._id ===action.payload._id);
       
     if(!isInCard){
      state.orders?.unshift(action.payload._id)
     }
       
    }

    
  },
});

// Action creators are generated for each case reducer function
export const {clearItems,addOrder,deleteItem, IncreaseCount,DecreaseCount,signUpStart, signUpSuccess, signUpFail,signOut,signInFail,signInStart ,addToCart} = UserSlice.actions;

export default UserSlice.reducer;
