import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export function Container(props) {
    const { children, ...common } = props;
    return (
        <Grid item xs={12} fullWidth {...common}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", bgcolor: 'inherit' }}>{children}</Paper>
        </Grid>
    );
}
