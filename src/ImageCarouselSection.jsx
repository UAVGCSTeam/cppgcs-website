import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/**
 * ImageCarouselSection
 *
 * Props:
 *  - images: array of image URLs (string) OR objects { src, alt }
 *  - title: string for left title
 *  - text: string or React node for left text
 *  - autoplay: boolean (default true)
 *  - interval: number in ms (default 4000)
 *  - height: CSS height for the carousel area (default '40vh')
 */


export default function ImageCarouselSection({
    images = [],
    title = "Your Title Here",
    text = "Some description goes here.",
    autoplay = true,
    interval = 4000,
    height = "45vh",
}) {
    const normalizedImages = images.map((it) =>
        typeof it === "string" ? { src: it, alt: "" } : it
    );

    const total = normalizedImages.length;
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    // For touch / swipe
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const go = useCallback(
        (next) => {
            setIndex((curr) => {
                const n = (curr + next + total) % total;
                return n;
            });
        },
        [total]
    );

    const goTo = (i) => {
        setIndex(((i % total) + total) % total);
    };

    // autoplay effect
    useEffect(() => {
        if (!autoplay || total <= 1) return undefined;
        if (isPaused) return undefined;

        timerRef.current = setInterval(() => {
            setIndex((curr) => (curr + 1) % total);
        }, interval);

        return () => clearInterval(timerRef.current);
    }, [autoplay, interval, isPaused, total]);

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    // keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

    // touch handlers
    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;
        const threshold = 40; // px
        if (delta > threshold) go(1);
        else if (delta < -threshold) go(-1);
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    // Pause on hover / focus
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handleFocus = () => setIsPaused(true);
    const handleBlur = () => setIsPaused(false);

    return (
        <Box>
            {/* Spacer */}
            <Box sx={{ height: "4vh", backgroundColor: "#0a0a0a" }} />

            {/* Main container: left text, right carousel */}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    minHeight: height,
                    backgroundColor: "#0a0a0a",
                    color: "white",
                    px: {xs: 2 },
                    gap: 2,
                    position: "relative",
                    overflow: "hidden",     // 👈 hides other slides
                    // stack on small screens:
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                {/* Left box – text */}
                <Box
                    sx={{
                        flex: 1,
                        px: { xs: 2, md: 13, l: 16},
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h7" sx={{ color: '#ffffff', mt: 5, mb: 1, fontWeight: 'Semi Bold', fontSize: '2rem' }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
                        {text}
                    </Typography>
                </Box>

                {/* Right box – carousel */}
                <Box
                    sx={{
                        flex: 1,
                        p: { xs: 1, md: 4 },
                        height: { xs: "400px", sm: "45vh", md: "50vh" }, // Fixed height on mobile
                        minHeight: { xs: "400px", md: "45vh" }, // Ensure minimum height
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 1,
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    tabIndex={0} // make focusable for keyboard pause
                    aria-roledescription="carousel"
                    aria-label="Image slideshow"
                >
                    {/* Slides wrapper */}
                    <Box
                        sx={{
                            display: "flex",
                            width: `${total * 100}%`,
                            height: "100%",
                            maxHeight: "100%",
                            transform: `translateX(-${index * 100}%)`,
                            transition: "transform 450ms ease",
                        }}
                    >
                        {normalizedImages.map((img, i) => (
                            <Box
                                key={i}
                                sx={{
                                    minWidth: "100%", // Each slide takes full container width
                                    width: "100%",
                                    height: "100%",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    px: { xs: 2, md: 3 }, // Padding for breathing room
                                }}
                                aria-hidden={i !== index}
                            >
                                <Box
                                    component="img"
                                    src={img.src}
                                    alt={img.alt || `Slide ${i + 1}`}
                                    sx={{
                                        objectFit: "contain",
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        width: "auto",
                                        height: "auto",
                                        borderRadius: 1,
                                        boxShadow: 3,
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>

                    {/* Left / Right arrows */}
                    {total > 1 && (
                        <>
                            <IconButton
                                aria-label="Previous image"
                                onClick={() => go(-1)}
                                sx={{
                                    position: "absolute",
                                    left: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    color: "white",
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                                }}
                            >
                                <ArrowBackIosNewIcon />
                            </IconButton>

                            <IconButton
                                aria-label="Next image"
                                onClick={() => go(1)}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    color: "white",
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                                }}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </>
                    )}

                    {/* Dots / pagination */}
                    {total > 1 && (
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 10,
                                left: "50%",
                                transform: "translateX(-50%)",
                                display: "flex",
                                gap: 1,
                            }}
                            role="tablist"
                            aria-label="Slide indicators"
                        >
                            {normalizedImages.map((_, i) => (
                                <Box
                                    key={i}
                                    component="button"
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    aria-current={i === index}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        border: "none",
                                        padding: 0,
                                        cursor: "pointer",
                                        backgroundColor: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)",
                                        transition: "transform 180ms",
                                        boxShadow: i === index ? 2 : "none",
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
