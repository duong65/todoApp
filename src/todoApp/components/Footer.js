import React from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
    return (
        <div className="footer">
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    color: "#ffffff",
                    textTransform: "uppercase",
                    fontSize: "24px",
                    textAlign: "center",
                    fontWeight: 600,
                    letterSpacing: "4px",
                }}
            >
                Copyright &copy; by PAD 2022
            </Typography>
        </div>
    );
};

export default React.memo(Footer);