import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from "@mui/material/Alert";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import RegistrationIcon from '@mui/icons-material/AppRegistration';
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signUpApi } from "../apis/userApi";
import * as yup from "yup";

const RegisterForm = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [openMessage, setOpenMessage] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenMessage(false);
    };

    const schema = yup.object().shape({
        username: yup.string().required("Vui lòng nhập tên đăng nhập"),
        password: yup
            .string()
            .required("Vui lòng nhập mật khẩu")
            .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự")
            .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
                message: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số",
                excludeEmptyString: true,
            }),
        confirmPassword: yup.string().required("Xác nhận lại mật khẩu").oneOf([yup.ref('password')], 'Nhập lại mật khẩu không trùng khớp!'),
    });

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const handleRegister = async () => {
        const username = getValues("username")
        const password = getValues("password")
        const response = await signUpApi({ username, password });
        if (response.status === 201) {
            setSuccessMessage("Đăng ký tài khoản thành công");
            setOpenMessage(true);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } else if (response.code === 400 || response.code === 500) {
            setSuccessMessage("");
            setErrorMessage(response.message);
            setOpenMessage(true);
        }
    };


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            sx={{ float: "right" }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box component="form" onSubmit={handleSubmit(handleRegister)}>
                <Container maxWidth="sm">
                    <Grid container>
                        <Grid item xs={12} sx={{ mt: 1.5 }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{ textAlign: "center", textTransform: "uppercase", color: "green" }}
                                mt={2}
                            >
                                Đăng ký
                            </Typography>
                            <Snackbar
                                autoHideDuration={2000}
                                open={openMessage}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                key={successMessage}
                            >
                                <Alert severity={successMessage !== "" ? "success" : "error"}>
                                    {successMessage !== "" ? successMessage : errorMessage}
                                </Alert>
                            </Snackbar>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2.5 }}>
                            <TextField
                                error={errors.username ? true : false}
                                id="username"
                                name="username"
                                label="Tên đăng nhập"
                                fullWidth
                                {...register("username")}
                                helperText={errors.username?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                error={errors.password ? true : false}
                                id="password"
                                name="password"
                                type="password"
                                label="Mật khẩu"
                                fullWidth
                                {...register("password")}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ my: 2 }}>
                            <TextField
                                error={errors.confirmPassword ? true : false}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Nhập lại mật khẩu"
                                fullWidth
                                {...register("confirmPassword")}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", justifyContent: "space-between" }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<RegistrationIcon />}
                                color="error"
                                size="medium"
                            >
                                Đăng ký
                            </Button>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    startIcon={<LoginIcon />}
                                    color="info"
                                    size="medium"

                                >
                                    Đăng nhập
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    );
};

export default RegisterForm;