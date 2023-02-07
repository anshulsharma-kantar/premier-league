/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/lib';
import * as colors from 'styles/colors';

import { getPlayers } from 'utils/data-service';
import useSWR from 'swr';

import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, } from '@mui/x-data-grid';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

function Playerspage() {
    const [playersData, setPlayersData] = useState([]);
    const { data, error, isLoading } = useSWR(`players?_limit=100`, getPlayers);
    const [pageSize, setPageSize] = React.useState(10);

    const columns = [
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            valueGetter: (params) =>
                `${params.row.first_name || ''} ${params.row.second_name || ''}`,
            flex: 1,
            minWidth: 100,
        },
        { field: 'team', headerName: 'Team', editable: true, width: 100, },
        {
            field: 'goals_scored',
            headerName: 'Goals',
            minWidth: 50,
        },
        {
            field: 'assists',
            headerName: 'Assists',
            minWidth: 50,
        },
        {
            field: 'yellow_cards',
            headerName: 'Yellow Card',
            minWidth: 50,
        },
        {
            field: 'red_cards',
            headerName: 'Red Card',
            minWidth: 50,
        },
        {
            field: 'clean_sheets',
            headerName: 'Clean Sheets',
            minWidth: 50,
        },
        {
            field: 'minutes',
            headerName: 'Minutes Played',
            minWidth: 50,
        },
        {
            field: 'influence',
            headerName: 'Influence',
            minWidth: 50,
        }
    ];

    useEffect(() => {
        setPlayersData(data);
    }, [data]);

    if (isLoading) return (<Spinner />)

    if (error) return (
        <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
        </div>
    )

    return (
        <div style={{ maxHeight: 'calc(85vh - 90px)', width: '100%' }}>
            {
                (playersData && playersData.length > 0) ?
                    (
                        <div style={{ display: 'flex', height: 600 }}>
                            <DataGrid
                                sx={{ maxHeight: '85vh' }}
                                rows={playersData}
                                columns={columns}
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20, 25, 50, 75, 100]}
                                pagination
                                components={{ Toolbar: CustomToolbar }}
                            />
                        </div>
                    )
                    :
                    (
                        <div>No Data Available...</div>
                    )

            }

        </div >
    )
}


export default Playerspage