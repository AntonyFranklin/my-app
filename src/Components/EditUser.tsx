import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useParams from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IValues } from "../models/IValues";
import EditIcon from '@material-ui/icons/Edit';

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


const EditUser: React.FC<{ row: IValues, onEdit: (row:IValues) => void }> = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    (async () => {
      await axios.get<IValues>('https://localhost:44340/api/Students/StudentGetById?id=' + row.id).then((r)=>{
        setValues(r.data);
      })
    })()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  var defaultValues: IValues = {
    id: null,
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

  const handleEdit = () => {
    axios.put('https://localhost:44340/api/Students/UpdateStudent?id='+row.id, values).then((r)=>{
      props.onEdit(values);
    })
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<EditIcon />}>
        Edit
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Student"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-input"
            name="name"           
            type="text"
            value={values.name}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-input"
            name="rollno"         
            type="text"
            value={values.rollno}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-input"
            name="class"        
            type="text"
            value={values.class}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            id="outlined-input"
            name="address"
            type="text"
            value={values.address}
            className={classes.formInput}
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary" variant="contained">
            Close
          </Button>
          <Button onClick={(_) => { handleClose(); handleEdit(); }} color="primary" variant="contained" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditUser
