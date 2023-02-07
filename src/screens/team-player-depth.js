import * as React from "react";
import { Spinner } from 'components/lib';
import * as colors from 'styles/colors';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, } from '@mui/x-data-grid';

import useSWR from 'swr';
import { getPlayerDepthData } from 'utils/data-service';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}

function PlayerDepth({ team }) {
    const [playersData, setPlayersData] = React.useState({})
    const [pageSize, setPageSize] = React.useState(10);
    const { data, error, isLoading } = useSWR('teamPlayers', getPlayerDepthData)
    // const fetcher = (...team) => getPlayerDepthData(...team).then(res => res.data);
    // const { data, error, isLoading } = useSWR('teamPlayers', getPlayerDepthData('teamPlayers',team))

    const columns = [
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            valueGetter: (params) =>
                `${params.row.first_name || ''} ${params.row.second_name || ''}`,
            flex: 0.5,
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

    React.useEffect(() => {
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
                        <div style={{height: 700 }}>
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

export default PlayerDepth