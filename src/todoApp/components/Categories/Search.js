import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="search">
            <TextField
                id="form-search"
                label="Nhập tên thể loại"
                variant="outlined"
                sx={{ mr: 1.25, width: "50%" }}
                size="small"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
                variant="contained"
                color="info"
                size="small"
                onClick={() => onSearch(keyword)}
            >
                <SearchIcon />
            </Button>
        </div>
    );
};

SearchComponent.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default React.memo(SearchComponent);