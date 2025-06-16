import Http from '@src/services/Http'
import React from 'react'
import apiGateway from './apiGateway'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@src/providers/AuthProvider.context'

const useLogout = () => {

    Http.post(apiGateway.user.logOut, {})
    useAuth().logout()

}

export default useLogout