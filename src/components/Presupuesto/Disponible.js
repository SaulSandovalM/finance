// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import { styled } from '@mui/material/styles';
// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';
// import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
//
// const AntDesignStyledDataGridPro = styled(DataGridPro)(({ theme }) => ({
//   border: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
//   color:
//     theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
//   fontFamily: [
//     '-apple-system',
//     'BlinkMacSystemFont',
//     '"Segoe UI"',
//     'Roboto',
//     '"Helvetica Neue"',
//     'Arial',
//     'sans-serif',
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(','),
//   WebkitFontSmoothing: 'auto',
//   letterSpacing: 'normal',
//   '& .MuiDataGrid-columnsContainer': {
//     backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
//   },
//   '& .MuiDataGrid-iconSeparator': {
//     display: 'none',
//   },
//   '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
//     borderRight: `1px solid ${
//       theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
//     }`,
//   },
//   '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
//     borderBottom: `1px solid ${
//       theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
//     }`,
//   },
//   '& .MuiDataGrid-cell': {
//     color:
//       theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     WebkitFontSmoothing: 'auto',
//     letterSpacing: 'normal',
//     '& .MuiDataGrid-columnsContainer': {
//       backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
//     },
//     '& .MuiDataGrid-iconSeparator': {
//       display: 'none',
//     },
//     '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
//       borderRight: `1px solid ${
//         theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
//       }`,
//     },
//     '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
//       borderBottom: `1px solid ${
//         theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
//       }`,
//     },
//     '& .MuiDataGrid-cell': {
//       color:
//         theme.palette.mode === 'light'
//           ? 'rgba(0,0,0,.85)'
//           : 'rgba(255,255,255,0.65)',
//     },
//     '& .MuiPaginationItem-root': {
//       borderRadius: 0,
//     },
//     '& .MuiCheckbox-root svg': {
//       width: 16,
//       height: 16,
//       backgroundColor: 'transparent',
//       border: `1px solid ${
//         theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
//       }`,
//       borderRadius: 2,
//     },
//     '& .MuiCheckbox-root svg path': {
//       display: 'none',
//     },
//     '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
//       backgroundColor: '#1890ff',
//       borderColor: '#1890ff',
//     },
//     '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
//       position: 'absolute',
//       display: 'table',
//       border: '2px solid #fff',
//       borderTop: 0,
//       borderLeft: 0,
//       transform: 'rotate(45deg) translate(-50%,-50%)',
//       opacity: 1,
//       transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
//       content: '""',
//       top: '50%',
//       left: '39%',
//       width: 5.71428571,
//       height: 9.14285714,
//     },
//     '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
//       width: 8,
//       height: 8,
//       backgroundColor: '#1890ff',
//       transform: 'none',
//       top: '39%',
//       border: 0,
//     },
//   },
// }));
//
// const StyledBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   height: 600,
//   width: '100%',
//   '& .MuiFormGroup-options': {
//     alignItems: 'center',
//     paddingBottom: theme.spacing(1),
//     '& > div': {
//       minWidth: 100,
//       margin: theme.spacing(2),
//       marginLeft: 0,
//     },
//   },
// }));
//
// function SettingsPanel(props) {
//   const { onApply, type, size, theme } = props;
//   const [sizeState, setSize] = React.useState(size);
//   const [typeState, setType] = React.useState(type);
//   const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);
//   const [activeTheme, setActiveTheme] = React.useState(theme);
//
//   const handleSizeChange = React.useCallback((event) => {
//     setSize(Number(event.target.value));
//   }, []);
//
//   const handleDatasetChange = React.useCallback((event) => {
//     setType(event.target.value);
//   }, []);
//
//   const handlePaginationChange = React.useCallback((event) => {
//     setSelectedPaginationValue(event.target.value);
//   }, []);
//
//   const handleThemeChange = React.useCallback((event) => {
//     setActiveTheme(event.target.value);
//   }, []);
//
//   const handleApplyChanges = React.useCallback(() => {
//     onApply({
//       size: sizeState,
//       type: typeState,
//       pagesize: selectedPaginationValue,
//       theme: activeTheme,
//     });
//   }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);
//
//   return (
//     <FormGroup className="MuiFormGroup-options" row>
//       <FormControl variant="standard">
//         <InputLabel>Dataset</InputLabel>
//         <Select value={typeState} onChange={handleDatasetChange}>
//           <MenuItem value="Employee">Employee</MenuItem>
//           <MenuItem value="Commodity">Commodity</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl variant="standard">
//         <InputLabel>Rows</InputLabel>
//         <Select value={sizeState} onChange={handleSizeChange}>
//           <MenuItem value={100}>100</MenuItem>
//           <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
//           <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
//           <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl variant="standard">
//         <InputLabel>Page Size</InputLabel>
//         <Select value={selectedPaginationValue} onChange={handlePaginationChange}>
//           <MenuItem value={-1}>off</MenuItem>
//           <MenuItem value={0}>auto</MenuItem>
//           <MenuItem value={25}>25</MenuItem>
//           <MenuItem value={100}>100</MenuItem>
//           <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl variant="standard">
//         <InputLabel>Theme</InputLabel>
//         <Select value={activeTheme} onChange={handleThemeChange}>
//           <MenuItem value="default">Default Theme</MenuItem>
//           <MenuItem value="ant">Ant Design</MenuItem>
//         </Select>
//       </FormControl>
//       <Button
//         size="small"
//         variant="outlined"
//         color="primary"
//         onClick={handleApplyChanges}
//       >
//         <KeyboardArrowRightIcon fontSize="small" /> Apply
//       </Button>
//     </FormGroup>
//   );
// }
//
// SettingsPanel.propTypes = {
//   onApply: PropTypes.func.isRequired,
//   size: PropTypes.number.isRequired,
//   theme: PropTypes.oneOf(['ant', 'default']).isRequired,
//   type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
// };
//
// export default function FullFeaturedDemo() {
//   const [isAntDesign, setIsAntDesign] = React.useState(false);
//   const [type, setType] = React.useState('Commodity');
//   const [size, setSize] = React.useState(100);
//   const { loading, data, setRowLength, loadNewData } = useDemoData({
//     dataSet: type,
//     rowLength: size,
//     maxColumns: 40,
//     editable: true,
//   });
//
//   const [pagination, setPagination] = React.useState({
//     pagination: false,
//     autoPageSize: false,
//     pageSize: undefined,
//   });
//
//   const getActiveTheme = () => {
//     return isAntDesign ? 'ant' : 'default';
//   };
//
//   const handleApplyClick = (settings) => {
//     if (size !== settings.size) {
//       setSize(settings.size);
//     }
//
//     if (type !== settings.type) {
//       setType(settings.type);
//     }
//
//     if (getActiveTheme() !== settings.theme) {
//       setIsAntDesign(!isAntDesign);
//     }
//
//     if (size !== settings.size || type !== settings.type) {
//       setRowLength(settings.size);
//       loadNewData();
//     }
//
//     const newPaginationSettings = {
//       pagination: settings.pagesize !== -1,
//       autoPageSize: settings.pagesize === 0,
//       pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
//     };
//
//     setPagination((currentPaginationSettings) => {
//       if (
//         currentPaginationSettings.pagination === newPaginationSettings.pagination &&
//         currentPaginationSettings.autoPageSize ===
//           newPaginationSettings.autoPageSize &&
//         currentPaginationSettings.pageSize === newPaginationSettings.pageSize
//       ) {
//         return currentPaginationSettings;
//       }
//       return newPaginationSettings;
//     });
//   };
//
//   const DataGridComponent = isAntDesign ? AntDesignStyledDataGridPro : DataGridPro;
//
//   return (
//     <StyledBox>
//       <SettingsPanel
//         onApply={handleApplyClick}
//         size={size}
//         type={type}
//         theme={getActiveTheme()}
//       />
//       <DataGridComponent
//         {...data}
//         components={{
//           Toolbar: GridToolbar,
//         }}
//         loading={loading}
//         checkboxSelection
//         disableSelectionOnClick
//         initialState={{
//           ...data.initialState,
//           pinnedColumns: { left: ['__check__', 'desk'] },
//         }}
//         {...pagination}
//       />
//     </StyledBox>
//   );
// }
//
//
// rowsPerPageOptions={[]}
// localeText={{
//   noResultsOverlayLabel: 'No hay resultados',
//   errorOverlayDefaultLabel: 'A ocurrido un error',
//   noRowsLabel: 'No hay datos cargados',
//   toolbarExport: 'Exportar',
//   toolbarExportLabel: 'Exportar',
//   toolbarExportCSV: 'Descargar como CSV',
//   columnMenuShowColumns: 'Ver columnas',
//   columnMenuFilter: 'Filtrar',
//   columnMenuHideColumn: 'Ocultar',
//   columnMenuUnsort: 'Desordenar',
//   columnMenuSortAsc: 'Ordenar Arriba',
//   columnMenuSortDesc: 'Ordenar Abajo',
//   filterPanelOperators: 'Operaciones',
//   filterPanelColumns: 'Columnas',
//   filterPanelInputLabel: 'Valor',
//   filterPanelInputPlaceholder: 'Valor a filtrar',
//   filterPanelDeleteIconLabel: 'Borrar',
//   filterOperatorContains: 'contiene',
//   filterOperatorEquals: 'igual',
//   filterOperatorStartsWith: 'empieza con',
//   filterOperatorEndsWith: 'termina con',
//   filterOperatorIsEmpty: 'esta vacio',
//   filterOperatorIsNotEmpty: 'no esta vacio',
//   filterOperatorIsAnyOf: 'es cualquiera de',
//   columnsPanelTextFieldLabel: 'Buscar columna',
//   columnsPanelTextFieldPlaceholder: 'Titulo',
//   columnsPanelShowAllButton: 'Ver todos',
//   columnsPanelHideAllButton: 'Ocultar todos'
// }}


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Disponible () {
  return (
    <div style={{ height: '88vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        pageSize={13}
      />
    </div>
  );
}
