import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

export function StyledModal(props) {
    const { children, innerDivId, title, width = { xs: "90vw", sm: "550px", lg: "550px" }, id = '',
        style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: width,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            maxHeight: "90vh",
            borderRadius: "5px"
        }
        , ...modal } = props;

    return (
        <Modal {...modal}>
            <Box sx={style} id={id}>
                <Typography id="modal-modal-title" variant="h6" color="primary" sx={{ mb: 1 }} textAlign="center">
                    {title}
                </Typography>
                <Divider />
                <div style={{ overflow: "auto", maxHeight: "80vh" }} id={innerDivId}>
                    {children}
                </div>
            </Box>
        </Modal>
    );
}
