import axios from 'axios';
import { server } from '../store';

 
export const login =(email,password)=> async dispatch =>{
    try{
        dispatch({type:'loginRequest'});
        const config = {
            headers: {
              "Content-type": "application/json",
            },
      
            withCredentials: true,
          };
        const {data} =await axios.post(
            `${server}/login`,
            {email,password,config}
        )
       if(!data.status){
        dispatch({type:'loginFail',payload:data.msg});
       }
       else{
        dispatch({type:'loginSuccess',payload:data});
        localStorage.setItem('userAccessToken',JSON.stringify(data.token));
       }
        

    }
    catch(error){
        dispatch({type:'loginFail',payload:error.response.data.message});

    }


}

export const register= (formdata)=> async dispatch =>{
    try{
        dispatch({type:'registerRequest'});
        const config = {
            headers: {
              "Content-type": "application/json",
            },
      
            withCredentials: true,
          };
        const {data}=await axios.post(`${server}/register`,
          formdata,{config}
        )
        if(data.status){
            
            dispatch({type:'registerSuccess',payload:data});
            localStorage.setItem('userAccessToken',JSON.stringify(data.token));
        }
        else{
           
            dispatch({type:'registerFail',payload:data.msg});

        }
       
    }
    catch(error){
        dispatch({type:'registerFail',payload:error.response.data.message})
    }
}

export const verify=(otp)=> async dispatch =>{
    try {
        dispatch ({type:'verificationRequest'});
        const userAccessToken=localStorage.getItem('userAccessToken');
        const finItem=JSON.parse(userAccessToken);
        const config = {
            headers: {
              "Content-type": "application/json",
            },
      
            withCredentials: true,
          };
        const {data}= await axios.post(`${server}/verify`,{
            otp,finItem,config
        });
        if(!data.status){
            dispatch({type:'verificationFailure',payload:data.msg});
        }
        else{
            dispatch({type:'verificationSuccess',payload:data});
        }
        
    }
    catch(error){
        dispatch({
            type:'verificationFailure',payload:error.response.data.message
        })
    }
}


export const logout=()=>async dispatch =>{
    try{
        dispatch({type:'logoutRequest'});
        const {data}=await axios.get(`${server}/logout`);
        if(data.status){
            dispatch({type:'logoutSuccess',payload:data.msg});
            localStorage.removeItem('userAccessToken');
        }
    }
    catch(error){
        dispatch({type:'logoutFail',payload:error.response.data.message});
    }
}

export const loadUser=(finItem)=>async dispatch=>{
    try{
       dispatch({type:'loadUserRequest'});

       const {data}=await axios.post(`${server}/loaduser`,{finItem});
       if(data.status){
        dispatch({type:'loadUserSuccess',payload:data});
       }
       else{
        dispatch({type:'loadUserFail',payload:data.msg});
       }
       
    } 
    catch(error){
        dispatch({type:'loadUserFail',payload:error.response.data.message});
    }
}

export const forgetPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: "forgetPasswordRequest" });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
  
        withCredentials: true,
      };
  
      const { data } = await axios.post(
        `${server}/forgetpassword`,
        {
          email,
        },
        config
      );
      if(data.status){
        dispatch({ type: "forgetPasswordSuccess", payload: data.msg });
      }
      else{
        dispatch({ type: "forgetPasswordFail", payload: data.msg });
      }
  
      
    } catch (error) {
      dispatch({
        type: "forgetPasswordFail",
        payload: error.response.data.message,
      });
    }
  };
  
  export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({ type: "resetPasswordRequest" });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
  
        withCredentials: true,
      };
  
      const { data } = await axios.put(
        `${server}/resetpassword/${token}`,
        {
          password,
        },
        config
      );
      if(data.status){
        dispatch({ type: "resetPasswordSuccess", payload: data.msg });
      }
      else{
        dispatch({ type: "resetPasswordFail", payload: data.msg });
      }
  
      
    } catch (error) {
      dispatch({
        type: "resetPasswordFail",
        payload: error.response.data.message,
      });
    }
  };

  export const postCreater = (formData)=> async (dispatch)=>{
    try{
      dispatch({type:'postCreateRequest'});
      const config = {
        headers: {
          "Content-type": "application/json",
        },
  
        withCredentials: true,
      };
      const {data}=await axios.post(`${server}/createpost`,formData,{config});
       if(data.status){
        dispatch({type:"postCreateSuccess",payload:data});
       }
       else{
        dispatch({type:"postCreateFail",payload:data.msg})
       }

    }
    catch(error){
      dispatch({type:'postCreateFail',payload:error.response.data.message});
    }
  } 

  export const follow= (friendId,userID) => async (dispatch)=>{
    try{
      dispatch({type:'followRequest'});
      const config = {
        headers: {
          "Content-type": "application/json",
        },
  
        withCredentials: true,
      };
      const {data}=await axios.post(`${server}/follow`,{friendId,userID,config});

      if(data.status){
        dispatch({type:'followSuccess',payload:data})
      }
      else{
        dispatch({type:'followFail',payload:data.msg});
      }

    }
    catch(error){
      dispatch({type:'followFail',payload:error.response.data.message});

    }
  }
  
  