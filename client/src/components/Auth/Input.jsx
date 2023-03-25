import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const Input = ({
  label,
  half,
  name,
  handleOnChange,
  autoFocus,
  handleShowPassword,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="outlined"
        name={name}
        onChange={handleOnChange}
        required
        fullWidth
        label={label}
        type={type}
        autoFocus={autoFocus}
        sx={{ p: 0, m: 0 }}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} color="secondary">
                      {type === "password" ? (
                        <MdOutlineVisibility />
                      ) : (
                        <MdOutlineVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </Grid>
  );
};

export default Input;
