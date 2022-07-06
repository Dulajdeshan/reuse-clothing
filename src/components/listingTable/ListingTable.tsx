import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import firebase from 'firebase/compat';

const formatGarmentType: any = (
  garmentType: string,
  otherGarmentType: string
) => {
  if (garmentType !== 'other') {
    return garmentType.replaceAll('-', ' ');
  }
  return otherGarmentType;
};

const formatGarmentCondition: any = (
  garmentCondition: string,
  otherGarmentCondition: string
) => {
  if (garmentCondition !== 'other') {
    return garmentCondition.replaceAll('-', ' ');
  }
  return otherGarmentCondition;
};

const mapGarmentUsage: any = {
  'less-6-months': 'Less than 6 months',
  '6-12-months': '6-12 months',
  '12-18-months': '12-18 months',
  '18-24-months': '18-24 months',
  'more-2-years': 'More than 2 years',
};

const mapGarmentWashPeriod: any = {
  daily: 'Daily',
  '1-per-2-days': '1 time per 2 days',
  '1-per-3-days': '1 time per 3 days',
  '1-per-4-days': '1 time per 4 days',
  '1-per-5-days': '1 time per 5 days',
  '1-per-6-days': '1 time per 6 days',
  weekly: 'Weekly',
  'more-weekly': 'More than weekly',
};

interface Data {
  id: string;
  garmentType: string;
  garmentCount: number;
  garmentUsage: string;
  otherGarmentType: string;
  garmentWashPeriod: string;
  garmentCondition: string;
  otherGarmentCondition: string;
  createdAt: firebase.firestore.Timestamp;
  name: string;
  mobile: string;
  district: string;
}

function createData({
  id,
  garmentType,
  garmentCount,
  garmentUsage,
  otherGarmentType,
  garmentWashPeriod,
  garmentCondition,
  otherGarmentCondition,
  createdAt,
  name,
  mobile,
  district,
}: Data) {
  return {
    id,
    garmentCount,
    garmentUsage: mapGarmentUsage[garmentUsage],
    garmentType: formatGarmentType(garmentType, otherGarmentType),
    garmentWashPeriod: mapGarmentWashPeriod[garmentWashPeriod],
    garmentCondition: formatGarmentCondition(
      garmentCondition,
      otherGarmentCondition
    ),
    createdAt: createdAt.toDate(),
    name,
    mobile,
    district,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'garmentType',
    numeric: false,
    disablePadding: false,
    label: 'Garment Type',
  },
  {
    id: 'garmentUsage',
    numeric: false,
    disablePadding: false,
    label: 'Garment Usage',
  },
  {
    id: 'garmentWashPeriod',
    numeric: false,
    disablePadding: false,
    label: 'Garment Wash Period',
  },
  {
    id: 'garmentCondition',
    numeric: false,
    disablePadding: false,
    label: 'Garment Condition',
  },
  {
    id: 'garmentCount',
    numeric: true,
    disablePadding: false,
    label: 'Garment Count',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Listed by',
  },
  {
    id: 'mobile',
    numeric: true,
    disablePadding: false,
    label: 'Contact No',
  },
  {
    id: 'district',
    numeric: true,
    disablePadding: false,
    label: 'Location',
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Listings
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default function ListingTable({ data }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows: Data[] = data.map((item: any) => createData(item));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort<Data>(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {row.garmentType}
                      </TableCell>

                      <TableCell align="left">{row.garmentUsage}</TableCell>
                      <TableCell align="left">
                        {row.garmentWashPeriod}
                      </TableCell>
                      <TableCell
                        style={{
                          textTransform: 'capitalize',
                        }}
                        align="left"
                      >
                        {row.garmentCondition}
                      </TableCell>
                      <TableCell align="right">{row.garmentCount}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.mobile}</TableCell>
                      <TableCell align="right">{row.district}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
