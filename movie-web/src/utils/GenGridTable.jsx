import React from "react";
import { Grid, Typography } from "@mui/material";

export function genGridTable(list) {
    let html = [];

    list.forEach(item => {
        if (Object.values(item).length == 2) {
            return html.push(
                <Grid item container xs={12}>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(0)]}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(1)]}</Typography>
                    </Grid>
                </Grid>
            );
        } else if (Object.values(item).length == 3) {
            return html.push(
                <Grid item container xs={12}>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(0)]}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(1)]}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(2)]}</Typography>
                    </Grid>
                </Grid>
            );
        } else {
            return html.push(
                <Grid item container xs={12}>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(0)]}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(1)]}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(2)]}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{item[Object.keys(item).at(3)]}</Typography>
                    </Grid>
                </Grid>
            );
        }
    });

    return html;
}