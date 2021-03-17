import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { IValues } from '../models/IValues';
import axios from 'axios';

const DeleteUser: React.FC<{ row: IValues, onDelete: () => void }> = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.delete('https://localhost:44340/api/Students/DeleteStudent?id='+row.id);
        props.onDelete();
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Delete
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Delete student"}</DialogTitle>
                <DialogContent>
                    Are you sure want to delete the student ?
        </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary" variant="contained">
                        Cancle
          </Button>
                    <Button onClick={(_)=>{handleClose(); handleDelete();}} color="primary" variant="contained" autoFocus>
                        OK
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default DeleteUser