import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { IValues } from "../models/IValues";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CreateUser from "../Components/CreateUser";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Delete from "../Components/DeleteUser";
import Edit from "../Components/EditUser";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        grid:{
            margin: theme.spacing(1)
,        },
    }),
)

const StudentTable = () => {

    const [student, setStudent] = useState<IValues[]>([]);
    const classes = useStyles();

    useEffect(GetStudents(),[student])

    function GetStudents(): React.EffectCallback {
        return () => {
            getStudentsAsync();
        }
    }

    function getStudentsAsync() {
        (async () => {
            const response = await axios.get<IValues[]>(`https://localhost:44340/api/Students/GetStudentDetails`);
            setStudent(response.data);
            console.log(response.data);
        })()
    }

    const handleSave = () => {
        getStudentsAsync();
    };
    const handleDelete = () => {
        getStudentsAsync();
    };
    const handleEdit=() => {
        getStudentsAsync();
    };
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" style={{marginTop:'-5%'}}>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={3}>
                        <CreateUser onSave={handleSave} />
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead style={{background:"black", color:"white"}}>
                            <TableRow >
                                <TableCell style={{color:'white'}}>ID</TableCell>
                                <TableCell align="left" style={{color:'white'}}>NAME</TableCell>
                                <TableCell align="left" style={{color:'white'}}>ROLL NO</TableCell>
                                <TableCell align="left" style={{color:'white'}}>CLASS</TableCell>
                                <TableCell align="left" style={{color:'white'}}>ADDRESS</TableCell>
                                <TableCell align="left" style={{color:'white'}}>ACTION</TableCell>
                                <TableCell align="left" style={{color:'white'}}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {student.map((U) => {
                                return (
                                    <TableRow key={U.id}>
                                        <TableCell align="left">{U.id}</TableCell>
                                        <TableCell align="left">{U.name}</TableCell>
                                        <TableCell align="left">{U.rollno}</TableCell>
                                        <TableCell align="left">{U.class}</TableCell>
                                        <TableCell align="left">{U.address}</TableCell>
                                        <TableCell>
                                            <Edit onEdit={handleEdit} row={U}/>
                                        </TableCell>
                                        <TableCell>
                                            <Delete onDelete={handleDelete} row={U}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </>
    );

}
export default StudentTable
