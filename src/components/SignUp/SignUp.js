import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleLogo from "../../assets/img/google.svg"
import auth from '../firebase.init';
import { toast } from 'react-toastify';
import { async } from '@firebase/util';
import { Spinner } from 'react-bootstrap';

const SignUp = () => {
    const [signInWithGoogle, googleUser, googleLoading, goolgeError] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [codeError, setCodeError] = useState('')
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [sendEmailVerification, sending, VerificationError] = useSendEmailVerification(auth);

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }
    const hanldePasswordChange = e => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = e => {
        setConfirmPass(e.target.value)
    }
    const handleSignup = async (e) => {
        e.preventDefault()

        if (password !== confirmPass) {

            setCodeError("two password mismatched")
            return
        }


        createUserWithEmailAndPassword(email, password)
        await sendEmailVerification();




    }
    const navigate = useNavigate()
    let location = useLocation();
    let from = location?.state?.from?.pathname || "/";
    if (user || googleUser) {
        navigate(from, { replace: true })
    }
    const handleGoogle = async e => {
        e.preventDefault()
        await signInWithGoogle()
    }
    if (user) {
        toast('Verification mail sent')
    }

    return (
        <div>
           
        </div>
    );
};

export default SignUp;