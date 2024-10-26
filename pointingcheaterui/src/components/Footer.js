import React from 'react';
import { GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import * as link from  '../constants/externalLinks';

function Footer() {
    return (
        <>
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '50px', 
                backgroundColor: '#efb967' 
            }}
        >
            {/* GitHub Icon */}
            <IconButton component="a" href={link.GitHub_URL} target="_blank">
                <GitHub fontSize="large" />
            </IconButton>

            {/* Instagram Icon */}
            <IconButton component="a" href={link.Instagram_URL} target="_blank">
                <Instagram fontSize="large" />
            </IconButton>

            {/* LinkedIn Icon */}
            <IconButton component="a" href={link.LinkedIn_URL} target="_blank">
                <LinkedIn fontSize="large" />
            </IconButton>

            {/* X (Twitter) Icon */}
            <IconButton component="a" href={link.Twitter_URL} target="_blank">
                <Twitter fontSize="large" />
            </IconButton>
        </Box>
        
        </>
    );
}

export default Footer;
