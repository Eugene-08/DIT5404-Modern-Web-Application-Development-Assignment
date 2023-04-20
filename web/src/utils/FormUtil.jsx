import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { StyledButton } from "./Button";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import { ColorPicker } from "material-ui-color";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Autocomplete from '@mui/material/Autocomplete';

export function SearchForm(props) {
  const {
    children,
    submitText,
    sx,
    buttonPosition = "center",
    fieldMargin = { m: 1 },
    cellWidth = { minWidth: "40ch" },
    disabledSubmit = false,
    hideButton = false,
    cancelBtn,
    cancelText,
    onCancel,
    excelBtn,
    excelText,
    onExcel,
    resetBtn,
    resetText,
    disabledResetBtn,
    onReset,
    customButton = null,
    reportOnlyExcel = false,
    title,
    ...other
  } = props;
  return (
    <Box
      component="form"
      noValidate
      {...other}
      sx={{
        mt: 1,
        "& .MuiTextField-root": { ...fieldMargin, ...cellWidth },
        ...sx,
      }}
    >
      <Typography sx={{ m: 1, fontSize: 20, fontFamily: 'Monospace' }}>{props.title ? props.title : null}</Typography>
      {props.children}
      <Grid container sx={{ justifyContent: buttonPosition }}>
        {cancelBtn ? <StyledButton label={cancelText} onClick={onCancel} sx={{ m: 1 }} color="error" type="submit" /> : ""}
        {excelBtn ? <StyledButton label={excelText} onClick={onExcel} sx={{ m: 1 }} color="error" /> : ""}
        {resetBtn ? <StyledButton label={resetText} disabled={disabledResetBtn} onClick={onReset} sx={{ m: 1 }} /> : ""}
        {hideButton == false ? <StyledButton label={submitText} type="submit" sx={{ m: 1 }} disabled={disabledSubmit} /> : <></>}
        {reportOnlyExcel == true ? <StyledButton label={"匯出"} color="error" type="submit" sx={{ m: 1 }} disabled={disabledSubmit} /> : <></>}
        {customButton}
      </Grid>
    </Box>
  );
}

export const TextSearch = (props) => {
  const { variant = "standard", prefix, InputProps, min = 0, max = null, handleNumber = false, onBlur = (e) => handleNumberCheck(e), ...common } = props;
  let inputProps = prefix
    ? {
      ...InputProps,
      startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
    }
    : { ...InputProps };
  function handleNumberCheck(e) {
    handleNumber == true
      ? e.target.value < 0 || isNaN(e.target.value)
        ? (e.target.value = null)
        : e.target.value
      : e.target.value < 0
        ? (e.target.value = null)
        : e.target.value;
  }
  return <TextField margin="normal" variant={variant} id={props.name} {...common} InputProps={inputProps} onBlur={onBlur} sx={{ input: { color: 'white' }, label: { color: 'grey' } }} />;
};

export const SelectSearch = (props) => {
  const { list, value, display, displayTimeStart, displayTimeEnd, defaultOption = true, selectedValue, style, ...common } = props;
  return (
    <TextField margin="normal" variant="standard" id={props.name} value={selectedValue} {...common} select style={style} >
      {defaultOption && <MenuItem value={""}>{"---"}</MenuItem>}
      {list?.length > 0 && list.map((e) => <MenuItem value={e[value]}>{e[display]}{displayTimeStart ? " " + e[displayTimeStart] : null}{displayTimeEnd ? "~" + e[displayTimeEnd] : null}</MenuItem>)}
    </TextField>
  );
};
