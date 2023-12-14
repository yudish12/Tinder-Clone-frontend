import { Box, Button, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSlector } from "../redux/store";
import { loginUser } from "../redux/slices/AuthSlice";

const LoginModal = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const navigate = useNavigate();
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "16px",
		bgcolor: "black",
		border: "2px solid #000",
        maxWidth:"400px",
        width:"100%",
		boxShadow: 24,
		p: 4,
	};
    const dispatch = useAppDispatch();
    const state = useAppSlector((state)=>state.authSliceReducer);

    const handleSubmit = ()=>{
        dispatch(loginUser({email:email,password:password}))
    }

    useEffect(()=>{
        if(state.token){
            navigate('/')
        }
    },[state.token])

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title">
            <Box sx={style} >
                <Typography variant="h5" component="h2" className="text-[#2196f3] font-semibold" >
                    Login Modal
                </Typography>
                <div className="flex mt-12 flex-col w-full gap-12" >
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-transparent px-3 py-2 text-slate-500 placeholder:text-slate-500 border-b-2 border-slate-500 focus:outline-none" placeholder="Email" type="email" name="email" />
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-transparent  px-3 py-2 text-slate-500 placeholder:text-slate-500 border-b-2 border-slate-500 focus:outline-none" placeholder="Password" type="password" name="password" />
                </div>
                <div className="w-full flex justify-center mt-8" >
                    <Button onClick={handleSubmit} variant="contained" >Login</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default LoginModal