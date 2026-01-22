import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert, IconButton } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon, InsertDriveFile as FileIcon } from '@mui/icons-material';
import { supabase } from './supabaseClient';
import DefenseButton from './DefenseButton';

function ResearchForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        year: '',
    });
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (selectedFile.size > maxSize) {
                setError('File size must be less than 5MB');
                return;
            }

            // Validate file type (PDF only)
            if (selectedFile.type !== 'application/pdf') {
                setError('Only PDF files are allowed');
                return;
            }

            setFile(selectedFile);
            setError(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Validate that a file is uploaded
        if (!file) {
            setError('Please upload your resume (PDF)');
            setIsSubmitting(false);
            return;
        }

        try {
            let resumeUrl = null;

            // Upload file to Supabase Storage
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `resumes/${fileName}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('research-form-uploads')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    throw new Error(`File upload failed: ${uploadError.message}`);
                }

                // Get public URL for the uploaded file
                const { data: { publicUrl } } = supabase.storage
                    .from('research-form-uploads')
                    .getPublicUrl(filePath);

                resumeUrl = publicUrl;
            }

            // Prepare data for Supabase
            const submissionData = {
                name: formData.name,
                email: formData.email,
                message: formData.message || null,
                academic_year: formData.interest,
                resume_url: resumeUrl,
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
            setFormData({ name: '', email: '', message: '', year: '' });
            setFile(null);
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
            <Typography variant="h4" sx={{ color: '#ffffff', mb: 2, textAlign: 'center', fontWeight: '' }}>
                Join Our Research Team
            </Typography>
            <Box
                sx={{
                    mb: 4,
                    width: "100%",
                    height: "2px",
                    mx: "auto",
                    background: "linear-gradient(to right, #1B1A1B, #D9D9D9, #1B1A1B)",
                }}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* File Upload Section */}
            <Box sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 1 }}>
                    Resume/CV <span style={{ color: '#b0b0b0' }}>*</span>
                </Typography>
                <Button
                    variant="outlined"
                    required
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{
                        borderColor: file ? '#4caf50' : '#666666',
                        color: '#ffffff',
                        py: 1.5,
                        justifyContent: 'center',
                        '&:hover': {
                            borderColor: file ? '#66bb6a' : '#999999',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                    }}
                >
                    {file ? 'Change File' : '(PDF only)'}
                    <input
                        type="file"
                        hidden
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                </Button>
                {file && (
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FileIcon sx={{ color: '#b0b0b0' }} />
                            <Box>
                                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                                    {file.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton
                            size="small"
                            onClick={handleRemoveFile}
                            sx={{ color: '#b0b0b0', '&:hover': { color: '#ffffff' } }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>

            <TextField
                fullWidth
                required
                name="name"
                label="Full Name"
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
                label="CPP email"
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
                required
                name="message"
                label="Why do you want to join? (around 20 words)"
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
                        value="1st year"
                        control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="1st year"
                        sx={{ color: '#ffffff' }}
                    />
                    <FormControlLabel
                        value="2nd year"
                        control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="2nd year"
                        sx={{ color: '#ffffff' }}
                    />
                    <FormControlLabel
                        value="3rd year"
                        control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="3rd year"
                        sx={{ color: '#ffffff' }}
                    />
                    <FormControlLabel
                        value="4th year"
                        control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="4th year"
                        sx={{ color: '#ffffff' }}
                    />
                    <FormControlLabel
                        value="5th year or higher"
                        control={<Radio sx={{ color: '#b0b0b0', '&.Mui-checked': { color: '#ffffff' } }} />}
                        label="5th year or higher"
                        sx={{ color: '#ffffff' }}
                    />
                </RadioGroup>
            </FormControl>
            <DefenseButton
                type="submit"
                children={isSubmitting ? 'Submitting...' : 'Submit'}
                variant='white'
                fullWidth
                disabled={isSubmitting}
                sx={{
                    my: '1.2rem'
                }}
            />
        </Box>
    );
}

export default ResearchForm;
