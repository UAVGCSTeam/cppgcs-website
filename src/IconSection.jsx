import React from "react";
import { Box, Typography } from "@mui/material";

export default function IconRowsAndTextSection({
  title = "Title",
  text = "Your body text here.",
  icons = [],              // strings or {src, alt}
  iconSize = 70,
}) {
  const normalizedIcons = icons.map((it) =>
    typeof it === "string" ? { src: it, alt: "" } : it
  );

  const rowCounts = [4, 3, 4, 2];

  // Build rows of icons: [4], [3], [4], [2]
  const rows = [];
  let start = 0;
  for (const count of rowCounts) {
    rows.push(normalizedIcons.slice(start, start + count));
    start += count;
  }

  return (
    <Box sx={{ width: "100%", backgroundColor: "#0a0a0a" }}>
      <Box sx={{ height: "4vh", backgroundColor: "#0a0a0a" }} />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 4,
          px: { xs: 2, md: 6 },
          py: { xs: 3, md: 6 },
          color: "white",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        {/* LEFT: icon rows */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,                 // gap between rows
            alignItems: { xs: "center", md: "center" },
            justifyContent: "center",
          }}
        >
          {rows.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${row.length}, 1fr)`, // Changed from fixed px
                gap: { xs: 2, sm: 4, md: 6 }, // Responsive gap instead of fixed 8
                width: "100%",
                maxWidth: { xs: "100%", sm: "400px", md: `${row.length * (iconSize + 48)}px` },
                justifyItems: "center",
              }}
            >
              {row.map((icon, i) => (
                <Box
                  component="img"
                  src={icon.src}
                  alt={icon.alt || `icon-${rowIdx}-${i}`}
                  loading="lazy"
                  sx={{
                    width: { xs: "100%", sm: iconSize * 0.85, md: iconSize },
                    height: { xs: "auto", sm: iconSize * 0.85, md: iconSize },
                    maxWidth: { xs: "50px", sm: "60px", md: iconSize }, // Limit mobile size
                    objectFit: "contain",
                    opacity: 0.95,
                    aspectRatio: "1/1",
                  }}
                />
              ))}
            </Box>
          ))}

          {/* Optional warning */}
          {normalizedIcons.length !== 13 && (
            <Typography variant="caption" sx={{ opacity: 0.65 }}>
              Note: This layout expects 13 icons total (4+3+4+2). You provided{" "}
              {normalizedIcons.length}.
            </Typography>
          )}
        </Box>

        {/* RIGHT: text */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
            {title}
          </Typography>

          <Typography variant="body1" color="#b0b0b0">
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
