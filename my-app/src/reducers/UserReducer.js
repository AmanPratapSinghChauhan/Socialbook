  import {createReducer} from '@reduxjs/toolkit';
export const userReducer=createReducer(
    {},
    {
    loginRequest: state => {
        state.loading = true;
      },
      loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVarified = true;
        state.user = action.payload.user;
        state.message = action.payload.msg;
      },
      loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isVarified = false;
        state.error = action.payload;
      },
  
      registerRequest: state => {
        state.loading = true;
      },
      registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVarified = false;
        state.user = action.payload.user;
        state.message = action.payload.msg;
      },
      registerFail: (state, action) => {
        state.loading = false;
        state.isVarified = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      },
      verificationRequest: (state)=>{
        state.loading=true;
      },
      verificationSuccess: (state,action) =>{
        state.loading=false;
        state.isVarified=true;
        state.user=action.payload.user;
        state.message=action.payload.msg;

      },
      verificationFailure:(state,action )=>{
        state.loading=false;
        state.isVarified=false;
        state.error=action.payload;
      },
      loadUserRequest: state => {
        state.loading = true;
      },
      loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVarified = true;
        state.user = action.payload.user;
      },
      loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isVarified = false;
        state.error = action.payload;
      },
  
      logoutRequest: state => {
        state.loading = true;
      },
      logoutSuccess: (state, action) => {
        state.loading = false;
        state.isVarified = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
      },
      logoutFail: (state, action) => {
        state.loading = false;
        state.isVarified = true;
        state.isAuthenticated = true;
        state.error = action.payload;
      },
      forgetPasswordRequest: state => {
        state.loading = true;
      },
      forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      forgetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      resetPasswordRequest: state => {
        state.loading = true;
      },
      resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      resetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      postCreateRequest: state =>{
        state.loading=true;
      },
      postCreateSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.message=action.payload.msg;
      },
      postCreateFail: (state,action)=>{
        state.loading=false;
        state.error=action.payload;
      },
      followRequest: state=>{
        state.loading=true;
      },
      followSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload.value;
        state.message=action.payload.msg;
      },
      followFail: (state,action)=>{
        state.loading=false;
        state.error=action.payload;
      },
      clearError: state =>{
        state.error=null;
      },
      clearMessage: state =>{
        state.message=null;
      }
    }
)