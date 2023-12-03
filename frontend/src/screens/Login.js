import React, { useState } from "react";
import {Button, TextField, Typography, Container, CircularProgress, Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../apiCalls";
import "./styles.css";

const Login = () => {
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState("");
    const login = async () => {
        try {
            setLoading(true); // Start loading
            let result = await handleLogin(email, password);
            setLoading(false); // Stop loading
            if (result === 0) {
                navigate("/");
            }
            // Redirect or handle success as needed
        } catch (error) {
            console.error("login ERR", error.message);
            setErrorMessage(error.message);
            setLoading(false); // Stop loading on error
        }
    };
    const navigateToSignUp = async () => {
        navigate('/signup');
    };

    return (
        <div className="authWrapper">
            <Container maxWidth="sm">
                {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )}
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={login}
                    disabled={loading}
                    style={{ marginTop: 16 }}
                >
                    {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
                <Typography variant="body1" style={{ marginTop: 16, textAlign: "center" }}>
                    Don't have an account? <Button color="primary" onClick={navigateToSignUp}>Sign Up</Button>
                </Typography>
            </Container>
        </div>
    );
};

export default Login;
