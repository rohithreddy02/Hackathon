import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Divider,
} from '@mui/material';
// components
import Label from '../components/label';
// sections
import { StudentListHead, StudentListToolbar } from '../sections/@dashboard/Student';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'rno', label: 'Roll No', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'branch', label: 'Branch', alignRight: false },
  { id: 'gpa', label: 'GPA', alignRight: false },
  { id: 'cc', label: 'Co Curricular Activities', alignRight: false },
  { id: 'ec', label: 'Club Position', alignRight: false },
  { id: 'bl', label: 'Backlogs', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StudentDetails() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reqData = await fetch('http://localhost:5000/api/student-performance');
      const details = await reqData.json();
      setStudentData(details);
    };
    fetchData();
  }, []);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = studentData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentData.length) : 0;

  const filteredUsers = applySortFilter(studentData, getComparator(order, orderBy), filterName);

  return (
    <>
      <Helmet>
        <title> Student Details </title>
      </Helmet>

      <Container>
        <Divider display="flex" alignItems="center">
          <Typography letterSpacing={1} wordSpacing={2}  variant='h3'>
            Student Details
          </Typography>
        </Divider>

        <Card>
          <StudentListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <StudentListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={studentData.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
            </Table>
          </TableContainer>

          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const { rno, name, branch, gpa, cocurricular, extracurricular, backlogs } = row;
              const selectedUser = selected.indexOf(rno) !== -1;
              return (
                <>
                  <TableRow
                    style={{ width: '100vw' }}
                    hover
                    key={rno}
                    tabIndex={-1}
                    role="checkbox"
                    selected={selectedUser}
                  >
                    <TableCell align="left">{rno}</TableCell>

                    <TableCell component="th" scope="row" padding="0">
                      <Stack direction="row" alignItems="center" spacing={0}>
                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{branch}</TableCell>
                    <TableCell align="left">{gpa}</TableCell>
                    <TableCell align="left">Participated in <b>{cocurricular}</b> Activities</TableCell>
                    <TableCell align="left">
                      <Label>
                      {extracurricular < 4
                        ? 'None'
                        : extracurricular < 7
                        ? 'Club Member'
                        : extracurricular < 10
                        ? 'Volunteer'
                        : extracurricular === 10
                        ? 'Board Member'
                        : ''}
                        </Label>
                    </TableCell>
                    <TableCell align="right">
                      <Label color={(backlogs > 0 && 'error') || 'success'}>
                        {backlogs === 0 ? sentenceCase('NO') : sentenceCase('YES')}
                      </Label>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={studentData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
