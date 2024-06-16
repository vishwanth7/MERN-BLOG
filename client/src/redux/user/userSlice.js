import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state) => {
            state.loading = true;
            state.error = null
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        clearErrorMessage: (state) => {
            state.error = null;
          },
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
          },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
          },
        updateFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
          },
          deleteUserStart:(state)=>{
            state.loading=true;
            state.error=null;
          },
          deleteUserSucccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
          },
          deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
          },
          signOutSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false
          }
    }
})

export 
const{
    signInStart,signInSuccess,signInFailure,clearErrorMessage,updateStart
    ,updateSuccess,updateFailure,deleteUserStart,deleteUserSucccess,deleteUserFailure,signOutSuccess
    }
    =userSlice.actions

export default userSlice.reducer