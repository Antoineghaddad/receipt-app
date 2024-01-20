// src/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Toolbar, Button } from '@mui/material';
import User from './single-user';

const ListOfUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const updateUser = (updatedUser) => {
    axios.put(`http://localhost:3001/users/${updatedUser.id}`, updatedUser)
      .then(response => {
        setUsers(users.map(user => (user.id === updatedUser.id ? response.data : user)));
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:3001/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleAddUser = () => {
    // You can implement the logic to add a new user here
    console.log('Add user button clicked');
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Users</h2>
      <Paper>
        <Toolbar>
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                <User key={user.id} user={user} onUpdateUser={updateUser} onDeleteUser={deleteUser} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ListOfUsers;
