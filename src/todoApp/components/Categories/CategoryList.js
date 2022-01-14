import React from "react";
import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CategoryItem from "./CategoryItem";

const TaskList = ({ categories }) => {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="center">Tên</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.length !== 0
                        ? categories.map((category, index) => (
                            <CategoryItem
                                category={category}
                                index={index}
                                key={category.id}
                            />
                        ))
                        : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

TaskList.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default React.memo(TaskList);