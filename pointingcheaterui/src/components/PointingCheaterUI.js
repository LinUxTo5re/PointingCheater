import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pink } from '@mui/material/colors';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Checkbox, TextField } from '@mui/material';
import { PointingPokerAPI_URL } from '../constants/endpoints';
import FeedbackForm from  './FeedbackForm';
import CircularProgress from '@mui/material/CircularProgress';

function PointingCheaterUI() {
    const [cheaters, setCheaters] = useState(null);
    const [pointsStats, setPointsStats] = useState(null);
    const [averageVotes, setAverageVotes] = useState(null);
    const brandingName = 'Pointing Cheater Presented by Chaitanyaa_';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(PointingPokerAPI_URL);
                handleData(response);
            } catch (error) {
                console.error("Error fetching PointingPoker data:", error);
                handleData(false);
            }
        };
    
        const handleData = (response) => {
            if (!response){
                setCheaters(false);
                setPointsStats(false);
                setAverageVotes(0);
                console.log("Server down");
            }else{
                setCheaters(response.data.result.players);
                setPointsStats(response.data.result.total_votes);
                setAverageVotes(response.data.result.average_points);
                console.log(response.data.result); // Log the response data directly
            }

        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // Call fetchData every 3 seconds
        return () => clearInterval(intervalId);
    }, []); 

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Points');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedCheaters = Array.isArray(cheaters) ? [...cheaters].sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    }) : [];
    return (
        <>
            {cheaters && pointsStats ? (
                <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '80%', overflow: 'auto', margin: '20px 0' }}>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow >
                <TableCell style={{ width: '30%' }}>
                        <TableSortLabel
                            active={orderBy === 'PlayerId'}
                            direction={orderBy === 'PlayerId' ? order : 'asc'}
                            onClick={() => handleRequestSort('PlayerId')}
                        >
                            <strong>Player ID</strong>
                        </TableSortLabel>
                    </TableCell>

                    <TableCell style={{ width: '25%' }}>
                        <TableSortLabel
                            active={orderBy === 'Name'}
                            direction={orderBy === 'Name' ? order : 'asc'}
                            onClick={() => handleRequestSort('Name')}
                        >
                            <strong>Name</strong>
                        </TableSortLabel>
                    </TableCell>
            
                    <TableCell style={{ width: '20%' }}>
                        <TableSortLabel
                            active={orderBy === 'Points'}
                            direction={orderBy === 'Points' ? order : 'asc'}
                            onClick={() => handleRequestSort('Points')}
                        >
                            <strong>Points</strong>
                        </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ width: '10%' }}>
                        <strong>IsObserver</strong>
                    </TableCell>
                    <TableCell style={{ width: '15%' }}>
                        <strong>Vote Modify</strong>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {sortedCheaters.map((cheater) => (
                        <TableRow 
                            key={cheater.PlayerId} 
                            style={{ backgroundColor: cheater.Points > 0 ? 'lightgreen' : 'inherit' }} // Conditional styling
                        >
                            <TableCell style={{ width: '0%' }}>{cheater.PlayerId}</TableCell>
                            <TableCell style={{ width: '25%' }}>{cheater.Name}</TableCell>
                            <TableCell style={{ width: '20%' }}>
                                {cheater.Points ? cheater.Points : 0}
                                </TableCell>
                            <TableCell style={{ width: '10%' }}>
                                <Checkbox
                                sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                      color: pink[600],
                                    },
                                  }}
                                    checked={cheater.IsObserver ? true : false}
                                    readOnly
                                    color="primary"
                                />
                            </TableCell>  
                            <TableCell style={{ width: '15%' }}>
                                <TextField 
                                    value={cheater.IsObserver ? '-' : "read-only"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined" 
                                    fullWidth
                                />
                            </TableCell>               
                         </TableRow>
                    ))}
                </TableBody>
        </Table>
    </TableContainer>
    </div>
            <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '10px', margin: '20px 0' }}>

                <div style={{height: '55%'}}>
                    <h2 style={{ margin: '10px 0', textAlign: 'center' }}><i>Statistics</i></h2>
                    <h3 style={{ margin: '10px 0' }}>
                        Average: <i style={{color: 'red', margin:'0 10px'}}>{averageVotes}</i>
                    </h3>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell align="left"> <strong>Points</strong></TableCell>
                                <TableCell align="left"><strong>Votes</strong></TableCell>
            
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {pointsStats.map((ps) => (
                                <TableRow>                  
                                <TableCell align="left">{ps.Points}</TableCell>
                                <TableCell align="left">{ps.Votes}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div style={{height:'45%'}}>
                    <FeedbackForm/>
                </div>
           
            </div>
        </div>

                    ): 
                    (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h2>
        <i>
            {brandingName} 
        </i>
    </h2>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircularProgress color="secondary" />
        <span style={{ marginLeft: '10px', fontSize: '20px' }}>
            <i>
                Connecting With Server ...
            </i>
        </span>
    </div>
</div>
                    )}

        </>
    );
}

export default PointingCheaterUI;
