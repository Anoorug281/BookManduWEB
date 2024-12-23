import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import {Outlet} from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import MobileNav from '../components/MobileNav'

const Profile = () => {
  
  const [Profile, setProfile] = useState()
  const headers= {
    id: localStorage.getItem("id"),
    authorization : `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch =async()=>{
      const response = await axios.get(
        "http://localhost:1000/api/user/get-user-information",
        {headers}
      )
        setProfile(response.data)
    }
    fetch()
  },[])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white'>
      {!Profile && (<div className='w-full h-[100%] flex items-center justify-center'><Loading/>
      ("")</div>)}
      {Profile && (
        <>
        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
          <SideBar data={Profile}/>
          <MobileNav/>
        </div>
        <div className='w-full md:w-5/6'>
          <Outlet/>
        </div>
        </>
      )}
    </div>
  )
}

export default Profile