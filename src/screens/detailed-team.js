import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TeamDepth from "./team-depth";
import PlayerDepth from "./team-player-depth";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const navItems = ['Team Details', 'Player Details']

function TeamDetails({ isOpen, handleModalClose, teamData }) {
    const [page, setPage] = React.useState(navItems[0])
    const handleClose = () => {
        handleModalClose();
    };

    const handleOptionSelect = (item) =>{
        setPage(item)
    }

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
            <Dialog
                fullScreen
                open={isOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {teamData.name}
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            {navItems.map((item) => (
                                <Button onClick={() => handleOptionSelect(item)} key={item} sx={{ color: "#fff" }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                {page === 'Team Details' ? <TeamDepth team={teamData} /> : <PlayerDepth team={teamData}/>}
            </Dialog>
        </div>
    );
}

export default TeamDetails;
