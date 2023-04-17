import React, { useEffect, useState, Fragment } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

export function TabPanelForPage(props) {
    const { children, value, index, ...other } = props;
    return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && <div style={{ textAlign: "center" }}>{children}</div>}
        </div>
    );
}

export function LinkTab(props, component) {
    return (
        <Tab
            component='a'
            onClick={(event) => {
            event.preventDefault();
            }}
            {...props}
        />
    );
}