import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="main">{children}</main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(Layout);