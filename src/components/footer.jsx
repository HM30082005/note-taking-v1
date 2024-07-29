import { Box, Button, Paper, Grid, BottomNavigation, BottomNavigationAction } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FolderIcon from '@mui/icons-material/Folder';


const Footer = () => {
    // const [btnText, setBtnText] = useState('Check Data')
    // const [dataOpen, setDataOpen] = useState(false)
    const [value, setValue] = useState('/')
    const navigate = useNavigate();
    // const handleClick = () => {
    //     setDataOpen(!dataOpen)
    //     if (dataOpen) {
    //         setBtnText('Close Data')
    //         navigate('/data')
    //     } else {
    //         setBtnText('Check Data')
    //         navigate('/')
    //     }
        
    // }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                navigate(newValue);
            }}
        >
            <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
            <BottomNavigationAction label="People" value="/data" icon={<FolderIcon />} />
            <BottomNavigationAction label="Check Person" value="/check" icon={<PersonSearchIcon />} />
        </BottomNavigation>
        </Paper>
    );
}

export default Footer;