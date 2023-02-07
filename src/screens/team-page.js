import * as React from 'react';
import useSWR from 'swr';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TeamDetails from './detailed-team';
import { getTeamData } from 'utils/data-service';

const columns = [
    { id: 'position', lable: 'Position', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'win', label: 'Win', minWidth: 100 }, //change to wins
    { id: 'draw', label: 'Draw', minWidth: 100 },
    { id: 'loss', label: 'Loss', minWidth: 100 },
    { id: 'goals_scored', label: 'GF', minWidth: 100 },
    { id: 'goals_conceded', label: 'GA', minWidth: 100 },
    { id: 'points', label: 'Points', minWidth: 100 } //change to points
];


function Teampage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [showDetails, setShowDetails] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState({})
    const [rows, setRows] = React.useState([])
    const { data, error, isLoading } = useSWR('teams', getTeamData)
    if (data) {
        data.sort((a, b) => { return a.position - b.position })
    }

    React.useEffect(() => {
        setRows(data)
    }, [data])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (row) => {
        setShowDetails(true)
        setSelectedRow(row)
    }

    const handelClose = () => {
        setShowDetails(false)
        console.log('in handle modal close ', showDetails);
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} onClick={() => handleClick(row)} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <TeamDetails isOpen={showDetails} handleModalClose={handelClose} teamData={selectedRow}></TeamDetails>
        </>

    );
}


export default Teampage