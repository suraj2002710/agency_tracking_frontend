import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Route, useLocation, useNavigate } from 'react-router-dom'
import { get_single_user, login_action } from './redux/slice/login'
import { useDispatch, useSelector } from 'react-redux'

function Private_route({componant,path}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const token=Cookies.get("token")
    const location=useLocation()
    const { jwt_error } = useSelector(state => state.login)
    const queryparams=new URLSearchParams(location.search)
    useEffect(()=>{
      console.log(queryparams.get("token"))
        if(!token && !queryparams.get("token")){
            navigate("/")
        }
        if(queryparams.get("token")){
          Cookies.set("token",queryparams.get("token"))
          dispatch(get_single_user({token:queryparams.get("token")}))
          navigate("/landing-page")
        }
        if(jwt_error==403){
          Cookies.remove("token")
            navigate("/")
            
            dispatch(login_action.stateblank())
        }

    },[queryparams.get("token"),jwt_error])
  return (
    componant
  )
}

export default Private_route
