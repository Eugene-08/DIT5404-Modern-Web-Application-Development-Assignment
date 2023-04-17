import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
export function MessagePopup(props) {
    const { messagePopup, setMessagePopup, autoHideDuration = 2000, initMessagePop, ...popup } = props;

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Snackbar
            open={messagePopup?.open}
            onClose={() => initMessagePop()}
            autoHideDuration={messagePopup?.autoHideDuration || autoHideDuration}
            {...popup}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ "& .MuiAlert-action": { display: "none" } }}>
            <Alert onClose={() => initMessagePop()} severity={messagePopup?.severity}
                sx={{ width: "50vw" }}
            >
                {messagePopup?.title && <AlertTitle>{messagePopup?.title}</AlertTitle>}
                <div dangerouslySetInnerHTML={{ __html: messagePopup?.message }} />
            </Alert>
        </Snackbar>

    );
}