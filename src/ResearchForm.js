import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { supabase } from './supabaseClient';

function ResearchForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    year: '',
    otherText: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare data for Supabase
      const submissionData = {
        name: formData.name,
        email: formData.email,
        message: formData.message || null,
        academic_year: formData.interest === 'other' ? formData.otherText : formData.interest,
        created_at: new Date().toISOString()
      };

      // Insert data into Supabase
      const { data, error: supabaseError } = await supabase
        .from('research_form_submissions')
        .insert([submissionData]);

      if (supabaseError) {
        throw supabaseError;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', year: '', otherText: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 2 }}>
          Thank you for your interest!
        </Typography>
        <Typography sx={{ color: '#b0b0b0', mb: 3 }}>
          We'll get back to you soon.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setSubmitted(false)}
          sx={{
            borderColor: '#ffffff',
            color: '#ffffff',
            '&:hover': {
              borderColor: '#e0e0e0',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Submit Another Response
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        mx: 'auto',
        p: 4
      }}
    >
      <Typography variant="h4" sx={{ color: '#ffffff', mb: 4, textAlign: 'center', fontWeight: '' }}>
        Join Our Research Team
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        required
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />

      <TextField
        fullWidth
        required
        name="email"
        label="Preferred email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />

      <TextField
        fullWidth
        // required
        name="message"
        label="Why do you want to join?"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />

      <FormControl
        component="fieldset"
        margin="normal"
        required
        sx={{
          mt: 3,
          width: '100%'
        }}
      >
        <FormLabel
          component="legend"
          sx={{
            color: '#b0b0b0',
            '&.Mui-focused': {
              color: '#ffffff'
            }
          }}
        >
          Academic year
        </FormLabel>
        <RadioGroup
          name="interest"
          value={formData.interest}
          onChange={handleChange}
        >
          <FormControlLabel
            value="freshman"
            control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
            label="Freshman"
            sx={{ color: '#ffffff' }}
          />
          <FormControlLabel
            value="sophomore"
            control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
            label="Sophomore"
            sx={{ color: '#ffffff' }}
          />
          <FormControlLabel
            value="junior"
            control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
            label="Junior"
            sx={{ color: '#ffffff' }}
          />
          <FormControlLabel
            value="senior"
            control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
            label="Senior"
            sx={{ color: '#ffffff' }}
          />
          <FormControlLabel
            value="other"
            control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
            label="Other"
            sx={{ color: '#ffffff' }}
          />
        </RadioGroup>
        {formData.interest === 'other' && (
          <TextField
            fullWidth
            required
            name="otherText"
            label="Please specify"
            value={formData.otherText}
            onChange={handleChange}
            margin="normal"
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                '& fieldset': {
                  borderColor: '#666666',
                },
                '&:hover fieldset': {
                  borderColor: '#999999',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffffff',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#b0b0b0',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ffffff',
              },
            }}
          />
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{
          mt: 3,
          py: 1.5,
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          fontWeight: 'bold',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
          '&:disabled': {
            backgroundColor: '#666666',
            color: '#999999',
          },
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
}

export default ResearchForm;
