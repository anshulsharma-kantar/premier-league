import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getTeamDepthData } from 'utils/data-service';

function getTeamData(team) {
    getTeamDepthData('teamDetals', team)
        .then((res) =>{
            console.log('res',res);
            return res.data
        })
        .catch(err => {throw new Error(err)})
}

function TeamDepth({team}) {
    const [teamData, setTeamData] = React.useState({})
    
    React.useEffect(()=>{
        setTeamData(getTeamData(team))
        console.log('in effect',teamData);
    },[team])

    console.log('data',teamData);
    
    return (
        <Card>
            <CardContent>
                <Typography>{teamData.name}</Typography>
            </CardContent>
        </Card>
    );
}

export default TeamDepth