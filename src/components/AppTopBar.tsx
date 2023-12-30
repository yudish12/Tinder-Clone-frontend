import React from 'react'
import { FaUser } from 'react-icons/fa'
import {Box,Tab,Tabs} from '@mui/material'
import {  RiSettings2Fill } from 'react-icons/ri'
import ProfilePage from '../pages/ProfilePage';
import Photoscreen from '../pages/Photoscreen';
import ShowMatchReq from './ShowMatchReq';
import ShowMatched from './ShowMatched';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const AppTopBar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

  return (
    <>
    <div className='flex justify-between items-center py-6 px-6 bg-pink-600'>
        <div onClick={()=>setValue(3)} className='flex items-center hover:bg-[#31304D] px-1 cursor-pointer rounded-3xl py-2' >
            <FaUser className="text-white text-3xl" />
            <p className='text-lg text-white font-semibold capitalize' >username</p>
        </div>
        <div onClick={()=>setValue(2)} className='cursor-pointer' >
            <RiSettings2Fill className="text-white hover:text-[#31304D] text-4xl"  />
        </div>
    </div>
    <Box sx={{ width: '100%',height:"100%" }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs textColor='primary' value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab style={{color:"white",fontWeight:"600"}} label="Requests" {...a11yProps(0)} />
        <Tab style={{color:"white",fontWeight:"600"}} label="Messages" {...a11yProps(1)} />
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <ShowMatchReq/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
    <ShowMatched/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      <ProfilePage/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={3} >
      <Photoscreen/>
    </CustomTabPanel>

  </Box>
  </>
  )
}

export default AppTopBar