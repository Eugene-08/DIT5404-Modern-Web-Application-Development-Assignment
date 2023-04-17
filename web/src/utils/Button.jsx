import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export function StyledButton(props) {
    const { variant="contained", position = "right", label, sx, ...common } = props;
    return (
        <Grid item sx={{ textAlign: position }}>
            <Button {...common} variant={variant} sx={{ mb: 1, ...sx }}>
                {label}
            </Button>
        </Grid>
    );
}
