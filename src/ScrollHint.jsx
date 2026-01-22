import { Box } from "@mui/material";

export default function ScrollHint({ imageSrc, alt = "Scroll down", onClick, sx }) {
    return (
        <Box
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            sx={{
                cursor: onClick ? "pointer" : "default",
                width: "100%",
                backgroundColor: "#0a0a0a", // match your page
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 2,
                ...sx, // height of the section
            }}
            aria-hidden="true"
        >
            <Box
                sx={{
                    fontSize: "28px",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.85)",
                    userSelect: "none",
                    animation: "scrollPulse 1.2s ease-in-out infinite",
                    "@keyframes scrollPulse": {
                        "0%": { transform: "translateY(-6px) scale(1)", opacity: 0.4 },
                        "50%": { transform: "translateY(4px) scale(1.15)", opacity: 1 },
                        "100%": { transform: "translateY(-6px) scale(1)", opacity: 0.4 },
                    },
                    "&:hover": {
                        animation: "none", // pause where it is...
                        transform: "translateY(4px) scale(1.15)",        // ...then force back to rest
                        opacity: 1,                   // optional: make it fully visible
                    },
                    // "&:hover img, &:focus-visible img": {
                    //     filter:
                    //         "drop-shadow(0 0 10px rgba(255,255,255,0.9)) drop-shadow(0 0 18px rgba(255,255,255,0.5))",
                    //     transform: "scale(1.06)",
                    // },
                    // Respect reduced motion preferences
                    "@media (prefers-reduced-motion: reduce)": {
                        animation: "none",
                        opacity: 0.85,
                    },
                }}
            >
                <img src={imageSrc} alt={alt} style={{ width: '40px', height: '40px' }} sx={{
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9)) drop-shadow(0 0 18px rgba(255,255,255,0.5))",
                }} />
            </Box>
        </Box>
    );
}