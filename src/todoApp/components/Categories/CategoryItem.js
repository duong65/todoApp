import PropTypes from "prop-types";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TaskItem = ({ category, index }) => {
    return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
                {index + 1}
            </TableCell>
            <TableCell align="center">{category.name}</TableCell>
        </TableRow>
    );
};

TaskItem.propTypes = {
    category: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default TaskItem;