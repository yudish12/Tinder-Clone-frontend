import {
	Box,
	Button,
	Modal,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import StepForm from "./StepForm";
import {SearchBoxRetrieveResponse} from '@mapbox/search-js-core/dist/searchbox/SearchBoxCore'
import { useAppDispatch, useAppSlector } from "../redux/store";
import { signupUser } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const steps: ReactNode[] = [
	<Typography color={"white"}>Enter Auth details</Typography>,
	<Typography color={"white"}>Tell us about Yourself</Typography>,
	<Typography color={"white"}>Dating Information</Typography>,
];

export type formDataType = {
	name: string;
	email: string;
	password: string;
	height?: number|null;
	weight?: number | null;
	age: number | null;
	gender: "male" | "female" | "other" | null;
	preference: "male" | "female" | "other" | null;
	date_type: "long term" | "short term" | "casual" | null;
	location:SearchBoxRetrieveResponse|string;
};

const SignupModal = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "16px",
		bgcolor: "black",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};
	const [formData, setFormData] = useState<formDataType>({
		name: "",
		email: "",
		password: "",
		height: null,
		weight: null,
		age: null,
		gender: null,
		preference: null,
		date_type: null,
		location:""
	});
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		
		const { name, value } = e.target;
		if(name==="male" || name==="female" || name==="other"){
			if(value==="preference") setFormData((prev)=>({...prev,preference:name}));
			else setFormData((prev)=>({...prev,gender:name}));
			return;
		}

		if(name==="long term" || name==="short term" || name==="casual"){
			setFormData((prev)=>({...prev,date_type:name}))
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	}
	const dispatch =  useAppDispatch()
	const state = useAppSlector((state)=>state.authSliceReducer);
	const [activeStep, setActiveStep] = React.useState(0);

	useEffect(()=>{
		const user = localStorage.getItem('user')
		if(state.token || user){
			console.log(state.token,user)
			navigate('/')
		}
		console.log(user)
	},[ state.token])

	const handleNext = () => {
		if(activeStep===2){
			dispatch(signupUser(formData))
		}
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
			onClose={() => setOpen(false)}
			aria-describedby="modal-modal-description"
			aria-labelledby="modal-modal-title"
		>
			<Box sx={style}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						return (
							<Step key={index}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<StepForm setFormData={setFormData} formData={formData} handleChange={handleChange} activeStep={activeStep} />
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />

							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? "Finish" : "Next"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Box>
		</Modal>
	);
};

export default SignupModal;
