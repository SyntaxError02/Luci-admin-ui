import classes from './User.module.scss';
import { userColumns } from '../../utils/columns';
import { lazy, useContext, useEffect, useState } from 'react';
import { getUsers } from '../../requests/UserRequest';
import { Context } from "../../store";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { EditOutlined } from '@material-ui/icons';

const ClientForm = lazy(() => import("../../components/ClientForm/ClientForm"));

const User = () => {
  const [users, setUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState({});
  const [page, setPage] = useState(1)
  const [pageDetails, setPageDetails] = useState({
    perPage: 1,
    page: 0,
    count: 0
  })
  const [showForm, setShowForm] = useState(false);
  const { state, dispatch } = useContext(Context);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageDetails({
      ...pageDetails,
      perPage: event.target.value,
      page: 0
    });
  };

  useEffect(() => {
    getUsers(dispatch, page).then(res => {
      const { rows, totalItems, currentPage } = res;
      console.log(currentPage)
      setUsers(rows);
      setPageDetails({
        ...pageDetails,
        page: currentPage - 1,
        count: totalItems,
      })
    })
  }, [state.User.user, page])

  return (
    <div className={classes.Container}>
      <div className={classes.User}>
        <h3 className={classes.User__heading}>manage users</h3>
        <div className={classes.User__tableContainer}>
          <Paper className={classes.User__root}>
            <TableContainer className={classes.User__container}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow>
                    {userColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: '900' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.map((user, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        {user.name}
                      </TableCell>
                      <TableCell>
                        {user.state ? 'Active' : 'InActive'}
                      </TableCell>
                      <TableCell>
                        {user.groups.toString()}
                      </TableCell>
                      <TableCell>
                        {user.features.toString()}
                      </TableCell>
                      <TableCell>
                        <EditOutlined
                          className={classes.User__tableIcon}
                          onClick={() => {
                            setShowForm(true)
                            setUpdateUser(user);
                          }} />
                      </TableCell>
                    </TableRow>)
                })}
              </TableBody>
              </Table>
            </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={pageDetails.count === -1 ? 1 * 10 + 1 : pageDetails.count}
                rowsPerPage={pageDetails.perPage}
                page={pageDetails.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </Paper>
        </div>
      </div>
      <div
        className={`${classes.Container__form} ${showForm && classes.Container__show}`}>
        <ClientForm onClose={setShowForm} userDetails={updateUser} />
      </div>
    </div>
  )
}

export default User;
