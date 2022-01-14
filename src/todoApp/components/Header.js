import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { getToken, removeToken } from "../apis/userApi";

const Header = () => {
    const navigate = useNavigate();
    const checkToken = () => {
        if (getToken()) {
            return true;
        }
        return false;
    }
    useEffect(() => {
        if (!checkToken()) {
            navigate("/login");
        }
    }, [])

    const pages = ['category', 'task'];
    const [auth, setAuth] = useState(true);
    const [message, setMessage] = useState("");
    const [openMessage, setOpenMessage] = useState(false);


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleClose = () => {
        setOpenMessage(false);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogOut = () => {
        if (auth === false) {
            setOpenMessage(true);
            setMessage("Bạn chưa đăng nhập!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
        else if (auth === true) {
            removeToken();
            setAuth(false);
            setOpenMessage(true);
            setMessage("Đăng xuất thành công!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
        else {
            setOpenMessage(true);
            setMessage("Đăng xuất lỗi!");
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography>
                    <Snackbar
                        autoHideDuration={2000}
                        open={openMessage}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        key={message}
                    >
                        <Alert severity={message == "Đăng xuất thành công!" ? "success" : "error"}>
                            {message}
                        </Alert>
                    </Snackbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                href={"/" + page}
                                sx={{ my: 2, color: 'white', textTransform: "uppercase", display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {auth && (<Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="logout" onClick={handleLogOut}>
                                <Typography textAlign="center">Log Out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>)}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;