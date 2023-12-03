import React, {useState} from "react";
import {Button, TextField, Typography, Container, CircularProgress, Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {handleSignUp} from "../apiCalls";
import "./styles.css";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const signUp = async () => {
        try {
            setLoading(true);
            let result = await handleSignUp(email, password);
            setLoading(false);
            if (result === 0) {
                navigate("/");
            }
        } catch (error) {
            console.error("signUp ERR", error.message);
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    const navigateToLogin = async () => {
        navigate('/login');
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
                    onClick={signUp}
                    style={{marginTop: 16}}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24}/> : "Sign Up"}
                </Button>
                <Typography variant="body1" style={{ marginTop: 16, textAlign: "center" }}>
                    Already have an account? <Button color="primary" onClick={navigateToLogin}>Login</Button>
                </Typography>
            </Container>
        </div>
    );
};

export default SignUp;
