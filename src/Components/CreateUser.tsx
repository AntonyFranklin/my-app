import React, { useState } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        display: "block"
      },
    },
    wrapper: {
      width: "100%",
    },
    formInput: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export interface IValues {
  name: string,
  rollno: string,
  class: string,
  address: string,
}


const CreateUser: React.FC<{ onSave: () => void }> = (props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  var defaultValues: IValues = {
    name: "",
    rollno: "",
    class: "",
    address: "",
  }

  const [values, setValues] = useState(defaultValues)


  const handleChange = (event: any) => {
    const name = event.target.name;
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    axios.post(`https://localhost:44340/api/Students/PostStudent`, values);
    props.onSave();
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Student
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Create Student"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-input"
            name="name"
            label="Name"
            type="text"
            defaultValue={values.name}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-input"
            name="rollno"
            label="Roll No"
            type="text"
            defaultValue={values.rollno}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-input"
            name="class"
            label="Class Name"
            type="text"
            defaultValue={values.class}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-input"
            name="address"
            label="Address"
            type="text"
            defaultValue={values.address}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            close
          </Button>
          <Button onClick={(_) => { handleClose(); handleSubmit(); }} color="primary" autoFocus>
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
export default CreateUser
