import {  Box, Button, Modal, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

const steps:ReactNode[] = [<Typography color={"white"} >Enter Auth details</Typography>, <Typography color={"white"} >Tell us about Yourself</Typography>, <Typography color={"white"} >Dating Information</Typography>];

const SignupModal = ({open,setOpen}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const style = {
        position: 'absolute' ,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius:"16px",
        minWidth: 800,
        bgcolor: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const [activeStep, setActiveStep] = React.useState(0);
    
      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      
    
      const handleReset = () => {
        setActiveStep(0);
      };

  return (
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-describedby="modal-modal-description"        
        aria-labelledby="modal-modal-title"

      >
        <Box sx={style}>
      <Stepper activeStep={activeStep}>
        {steps.map((label,index) => {

          return (
            <Step key={index}>
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep===0?<div className='bg-white h-12 w-full' ></div>:<></>}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
      </Modal>
  )
}

export default SignupModal