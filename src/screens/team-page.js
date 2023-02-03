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
    { id: 'position', lable: 'Position', minWidth: 100},
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'draw', label: 'Win', minWidth: 100 }, //change to wins
    { id: 'draw', label: 'Draw', minWidth: 100 },
    { id: 'loss', label: 'Loss', minWidth: 100 },
    { id: 'goals_scored', label: 'GF', minWidth: 100 },
    { id: 'goals_conceded', label: 'GA', minWidth: 100 },
    { id: 'position', label: 'Points', minWidth: 100 } //change to points
];

// function createData(name, code, population, size) {
//     const density = population / size;
//     return { name, code, population, size, density };
// }

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];


function Teampage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [showDetails, setShowDetails] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState({})
    const [rows, setRows] = React.useState([])
    const {data, error, isLoading} = useSWR('teams', getTeamData)
    if(data){
        data.sort((a,b) => {return a.position - b.position})
    }

    React.useEffect(() =>{
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

    const handelClose = () =>{
        setShowDetails(false)
        console.log('in handle modal close ',showDetails);
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
                                        <TableRow hover role="checkbox" tabIndex={-1} onClick={() => handleClick(row)} key={row.code}>
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
            <TeamDetails isOpen={showDetails} handleModalClose={handelClose} teamName={selectedRow}></TeamDetails>
        </>

    );
}


export default Teampage