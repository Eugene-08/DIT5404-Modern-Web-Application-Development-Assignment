import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
import { TextSearch } from './FormUtil';

export function StyledAutocomplete(props) {
    const { list, label, setInputValue, inputValue, value, setValue, display, setDisplay, haveEndAdornment = true, sx, ...other } = props;

    return (
        <Autocomplete
            onChange={(event, newInputValue) => {
                setInputValue(newInputValue ? newInputValue : null);
            }}
            multiple
            id="tags-standard"
            options={list ? list.filter(item => !inputValue?.find(x => x.value == item.value)) : []}
            getOptionLabel={option => {
                return option ? option[display] : null;
            }}
            renderInput={(params) => (
                <TextSearch
                    {...params}
                    variant="outlined"
                    label={label}
                    sx={{ color: 'white' }}
                />
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option[display]} {...getTagProps({ index })} sx={{ color: 'white' }} />
                ))
            }
            sx={{ color: 'white' }}
        />
    );
}