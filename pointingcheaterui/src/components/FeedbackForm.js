import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', userName , feedback);
    //write logic here to store into db temp
    setFeedback(''); 
    setUserName('');
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
      <h2 style={{ margin: '10px 0', textAlign: 'center' }}>
        <i>
            Happy to hear your thoughts!
        </i>
        </h2>

      <form onSubmit={handleSubmit}>
      <Box mb={2}>
  <TextField
    label="User name"
    onChange={(e) => setUserName(e.target.value)}
    fullWidth
    value={userName}
    sx={{ mb: 2 }} 
  />
  <TextField
    label="Your Feedback"
    variant="outlined"
    fullWidth
    multiline
    rows={4}
    value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
    required
  />
</Box>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default FeedbackForm;
