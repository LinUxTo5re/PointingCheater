import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material';
import { StoreFeedbackForm } from '../constants/endpoints';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('');
  const [userName, setUserName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      
      const feedback_text_sliced = feedbackText.trim().slice(0, 50);
      const user_name_sliced =  userName.trim().slice(0, 10);

      // Create the feedback data object
      const feedbackData = {
        user_name: user_name_sliced,
        feedback_text: feedback_text_sliced,
      };
  
      try {
        const response = await axios.post(StoreFeedbackForm, feedbackData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        setResponseMessage({message: 'Feedback submitted successfully! Thank You,  ' + userName,
          status:  'success'});
          setShowAlert(true);
          console.log("Feedback saved successfully:  ", response.data);

      } catch (error) {
        setResponseMessage({message: 'Error submitting feedback',
          status: 'failed'
        });
        setShowAlert(true);

        console.error('There was an error!', error);
      } finally{
        setFeedbackText(''); 
        setUserName('');
      }
    }

    const [showAlert, setShowAlert] = useState(true);


    useEffect(() => {
      if (responseMessage.status === 'success' || responseMessage.status === 'failed') {
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 5000); // 3000 milliseconds = 3 seconds
  
        return () => clearTimeout(timer); // Cleanup the timer on component unmount
      }
    }, [responseMessage]);

  return (
    <>

{showAlert && responseMessage.status === 'success' && (
        <Alert variant="outlined" severity="success">
          {responseMessage.message}
        </Alert>
      )}

      {showAlert && responseMessage.status === 'failed' && (
        <Alert variant="outlined" severity="warning">
          {responseMessage.message}
        </Alert>
      )}

    <Paper elevation={3} style={{ padding: '10px', margin: '10px' }}>
      <h2 style={{ margin: '10px 0', textAlign: 'center' }}>
        <i>
            Happy to hear your thoughts!
        </i>
        </h2>

      <form onSubmit={handleSubmit}>
      <Box mb={2}>
  <TextField
    label="User name (10 char)"
    onChange={(e) => setUserName(e.target.value)}
    fullWidth
    value={userName}
    sx={{ mb: 2 }} 
  />
  <TextField
    label="Your Feedback (50 characters only)"
    variant="outlined"
    fullWidth
    multiline
    rows={4}
    value={feedbackText}
    onChange={(e) => setFeedbackText(e.target.value)}
    required
  />
</Box>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Paper>
    </>
  );
};

export default FeedbackForm;
