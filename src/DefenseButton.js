import React from 'react';
import { Button } from '@mui/material';

/**
 * DefenseButton - Sleek button for defense/aerospace applications
 * 
 * Props:
 *  - onClick: function to call when clicked
 *  - children: button text/content
 *  - variant: 'cyan' | 'red' | 'green' | 'amber' | 'white' (default: 'cyan')
 *  - width: CSS width (default: '180px')
 *  - height: CSS height (default: '50px')
 *  - fullWidth: boolean (default: false)
 *  - disabled: boolean (default: false)
 *  - sx: additional MUI sx prop for custom styling
 */

export default function DefenseButton({
  onClick,
  children = 'Button',
  variant = 'cyan',
  width = '180px',
  height = '50px',
  fullWidth = false,
  disabled = false,
  sx = {},
  ...props
}) {
  // Color variants for different use cases
  const colorVariants = {
    cyan: '0, 200, 255',      // Default - operational/tech
    red: '255, 50, 50',       // Critical/alert
    green: '0, 255, 100',     // Go/success
    amber: '255, 160, 0',     // Warning/standby
    white: '255, 255, 255',   // Minimal/clean
  };

  const accentColor = colorVariants[variant] || colorVariants.cyan;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontWeight: 600,
        width: fullWidth ? '100%' : width,
        height: height,
        fontSize: '0.95rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        border: `1px solid rgba(${accentColor}, 0.3)`,
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        boxShadow: `0 0 20px rgba(${accentColor}, 0.1)`,
        
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(${accentColor}, 0.2), transparent)`,
          transition: 'left 0.5s ease',
        },
        
        '&:hover': {
          backgroundColor: `rgba(${accentColor}, 0.1)`,
          borderColor: `rgba(${accentColor}, 0.8)`,
          boxShadow: `0 0 30px rgba(${accentColor}, 0.3), inset 0 0 20px rgba(${accentColor}, 0.1)`,
          transform: 'translateY(-2px)',
          
          '&::before': {
            left: '100%',
          }
        },
        
        '&:active': {
          transform: 'translateY(0px)',
          boxShadow: `0 0 15px rgba(${accentColor}, 0.2)`,
        },

        '&:disabled': {
          backgroundColor: 'transparent',
          color: 'rgba(255, 255, 255, 0.3)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
        
        // Merge any additional custom styles
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}