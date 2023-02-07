import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

import { getTeamDepthData } from 'utils/data-service';


function TeamDepth({ team }) {
    const [teamData, setTeamData] = React.useState({})

    React.useEffect(() => {
        getTeamDepthData('teamDetals', team)
            .then((res) => {
                setTeamData(res.data)
            })
            .catch(err => { throw new Error(err) })
    }, [team])

    return (
        <Grid container spacing={2} sx={{ marginTop: '5px' }}>
            <Grid item xs={6}>
                <Card sx={{ margin: '10px'}}>
                    <CardHeader title="Season Stats" />
                    <CardContent sx={{height: 516}}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 4,
                                mb: 0,
                                width: 160,
                                height: 140,
                            },
                        }}>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Matches Played
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.matches_played}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Wins
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.win}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Loses
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.loss}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Goals Scored
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.goals_scored}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Goals Conceded
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.goals_conceded}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Clean Sheets
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.clean_sheets}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Yellow Cards
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.yellow_cards}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Red Cards
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.red_cards}
                                </Typography>
                            </Paper>
                            <Paper elevation={2}>
                                <Typography sx={{ mt: 3, textAlign: 'center' }} variant="h7" component="div">
                                    Transfers In
                                </Typography>
                                <Typography variant="h4" color="text.secondary" sx={{ m: 2, textAlign: 'center' }}>
                                    {teamData.transfers_in}
                                </Typography>
                            </Paper>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card sx={{ margin: '10px'}}>
                    <CardHeader title="Matches" />
                    <CardContent sx={{height: 516, overflow: 'auto'}}>
                        {
                            (teamData && teamData.matches && teamData.matches.length > 0) ? (
                                <List>
                                    {teamData.matches.map((item, index) => (
                                        <>
                                            <ListItem key={`item-${index}-${item.date}`}>
                                                <ListItemText sx={{textAlign: 'center'}}>
                                                    <Typography variant="h6">
                                                        {item.completed ?  `${item.team1} ${item.team1_score} - ${item.team2_score} ${item.team2}` : `${item.team1} vs ${item.team2}`}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        {item.date}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                            <Divider />
                                        </>
                                    ))}
                                </List>
                            ) : (<div>Loading...</div>)
                        }

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TeamDepth