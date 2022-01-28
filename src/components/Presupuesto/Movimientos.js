import React, { useState, useEffect, Fragment } from 'react'
// Material Ui
import {
  CssBaseline,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material'
// Number Format
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
// Firebase
import { getDatabase, ref, child, get } from 'firebase/database'

// Fecha actual
const date = new Date().toLocaleDateString()

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA']
const payments = [
  { name: 'Fecha', detail: date },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' }
];

function NumberFormatCustom (props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      isNumericString
      prefix='$'
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

const steps = ['Partida inicial', 'Partida destino', 'Resumen']

// Table example
const columns = [
  { id: 'tipoDocuemnto', label: 'Tipo de Movimiento' },
  { id: 'importe', label: 'Importe', format: (value) => value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) },
  { id: 'oficioAutorizacion', label: 'Oficio de Autorización' },
  { id: 'mesAfectado', label: 'Mes Afectado' },
];

function createData(tipoDocuemnto, importe, oficioAutorizacion, mesAfectado) {
  return { tipoDocuemnto, importe, oficioAutorizacion, mesAfectado }
}

const rows = [
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
  createData('Ampliación', 1324171354, 'PGJH-2022', 'Enero'),
];

export default function Movimientos (props) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeStep, setActiveStep] = useState(0)
  const [presupuesto, setPresupuesto] = useState([])
  const [state, setState] = useState({
    tipoMovimiento: '',
    up: '',
    partida: '',
    rubro: '',
    cantidad: 0,
    oficioAutorizacion: '',
    mes: '',
    // States de Partida Destino
    upDestino: '',
    partidaDestino: '',
    rubroDestino: '',
    cantidadDestino: 0,
    mesDestino: ''
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setState({
      ...state, [event.target.name]: value
    })
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleReset = () => {
    setActiveStep(activeStep - activeStep)
  }

  useEffect(() => {
    // Get presupuesto
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto')).then((snapshot) => {
      if (snapshot.exists()) {
        var arrayPresupuesto = []
        snapshot.forEach((child) => {
          arrayPresupuesto.push({
            up: child.val().up,
            partida: child.val().ogasto,
            rubro: child.val().rubro
          })
        })
        setPresupuesto(arrayPresupuesto)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  return (
    <div>
      <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4.5}>
            <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 }, height: '88vh' }}>
              <Typography component='h1' variant='h4' align='center'>
                Movimientos
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Fragment>
                {activeStep === steps.length ? (
                  <Fragment>
                    <Typography variant='h5' gutterBottom>
                      Su orden ha sido realizada.
                    </Typography>
                    <Typography variant='subtitle1'>
                      Tu order es la numero #202200001. Hemos afectado la partida correspondiente, podra ver la afectación en el menu Disponible.
                    </Typography>
                    <Button variant='contained' onClick={handleReset} sx={{ mt: 3, ml: 1 }}>
                      Finalizar
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {activeStep === 0 &&
                      <Fragment>
                        <Typography variant='h6' gutterBottom>
                          Partida inicial
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Tipo de Movimiento</InputLabel>
                              <Select
                                value={state.tipoMovimiento}
                                label='Tipo de Movimiento'
                                name='tipoMovimiento'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value='Ampliacion'>Ampliación</MenuItem>
                                <MenuItem value='Reduccion'>Reducción</MenuItem>
                                <MenuItem value='Transferencia'>Transferencia</MenuItem>
                                <MenuItem value='Saldos'>Saldos</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Unidad presupuestal</InputLabel>
                              <Select
                                value={state.up}
                                label='Unidad presupuestal'
                                name='up'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                {presupuesto.map(item => <MenuItem value={item.up}>{item.up}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Partida</InputLabel>
                              <Select
                                value={state.partida}
                                label='Partida'
                                name='partida'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                {presupuesto.map(item => <MenuItem value={item.partida}>{item.partida}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Rubro</InputLabel>
                              <Select
                                value={state.rubro}
                                label='Rubro'
                                name='rubro'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                {presupuesto.map(item => <MenuItem value={item.rubro}>{item.rubro}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              name='cantidad'
                              label='Cantidad'
                              fullWidth
                              value={state.cantidad}
                              variant='standard'
                              onChange={handleChange}
                              InputProps={{ inputComponent: NumberFormatCustom }}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              color='tertiary'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              name='oficioAutorizacion'
                              label='Oficio de autorización'
                              fullWidth
                              value={state.oficioAutorizacion}
                              variant='standard'
                              onChange={handleChange}
                              color='tertiary'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Mes a afectar</InputLabel>
                              <Select
                                value={state.mes}
                                label='Mes a afectar'
                                name='mes'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value='Enero'>Enero</MenuItem>
                                <MenuItem value='Febrero'>Febrero</MenuItem>
                                <MenuItem value='Marzo'>Marzo</MenuItem>
                                <MenuItem value='Abril'>Abril</MenuItem>
                                <MenuItem value='Mayo'>Mayo</MenuItem>
                                <MenuItem value='Junio'>Junio</MenuItem>
                                <MenuItem value='Julio'>Julio</MenuItem>
                                <MenuItem value='Agosto'>Agosto</MenuItem>
                                <MenuItem value='Septiembre'>Septiembre</MenuItem>
                                <MenuItem value='Octubre'>Octubre</MenuItem>
                                <MenuItem value='Noviembre'>Noviembre</MenuItem>
                                <MenuItem value='Diciembre'>Diciembre</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Fragment>
                    }
                    {activeStep === 1 &&
                      <Fragment>
                        <Typography variant='h6' gutterBottom>
                          Partida destino
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Unidad presupuestal</InputLabel>
                              <Select
                                value={state.upDestino}
                                label='Unidad presupuestal'
                                name='upDestino'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                {presupuesto.map(item => <MenuItem value={item}>{item.up}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Partida</InputLabel>
                              <Select
                                value={state.partidaDestino}
                                label='Partida'
                                name='partidaDestino'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                {presupuesto.map(item => <MenuItem value={item}>{item.partida}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Rubro</InputLabel>
                              <Select
                                value={state.rubroDestino}
                                label='Rubro'
                                name='rubroDestino'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                {presupuesto.map(item => <MenuItem value={item}>{item.rubro}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              name='cantidadDestino'
                              label='Cantidad'
                              fullWidth
                              value={state.cantidadDestino}
                              variant='standard'
                              onChange={handleChange}
                              InputProps={{ inputComponent: NumberFormatCustom }}
                              InputLabelProps={{ shrink: true }}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                              color='tertiary'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Mes a afectar</InputLabel>
                              <Select
                                value={state.mesDestino}
                                label='Mes a afectar'
                                name='mesDestino'
                                onChange={handleChange}
                              >
                                <MenuItem value=''>
                                  <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value='Enero'>Enero</MenuItem>
                                <MenuItem value='Febrero'>Febrero</MenuItem>
                                <MenuItem value='Marzo'>Marzo</MenuItem>
                                <MenuItem value='Abril'>Abril</MenuItem>
                                <MenuItem value='Mayo'>Mayo</MenuItem>
                                <MenuItem value='Junio'>Junio</MenuItem>
                                <MenuItem value='Julio'>Julio</MenuItem>
                                <MenuItem value='Agosto'>Agosto</MenuItem>
                                <MenuItem value='Septiembre'>Septiembre</MenuItem>
                                <MenuItem value='Octubre'>Octubre</MenuItem>
                                <MenuItem value='Noviembre'>Noviembre</MenuItem>
                                <MenuItem value='Diciembre'>Diciembre</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Fragment>
                    }
                    {activeStep === 2 &&
                      <Fragment>
                        <Typography variant='h6' gutterBottom>
                          Resumen
                        </Typography>
                        <List disablePadding>
                          <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={'Partida inicial'} secondary={'Nombre de la partida'} />
                            <Typography variant='body2'>{state.cantidad}</Typography>
                          </ListItem>
                          <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={'Partida destino'} secondary={'Nombre de la partida'} />
                            <Typography variant='body2'>{state.cantidadDestino}</Typography>
                          </ListItem>
                          <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary='Total' />
                            <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                              $ {parseFloat(state.cantidad + state.cantidadDestino).toFixed(2)}
                            </Typography>
                          </ListItem>
                        </List>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                              Realizo
                            </Typography>
                            <Typography gutterBottom>{props.user.email}</Typography>
                            <Typography gutterBottom>{addresses.join(', ')}</Typography>
                          </Grid>
                          <Grid item container direction='column' xs={12} sm={6}>
                            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                              Detalles
                            </Typography>
                            <Grid container>
                              {payments.map((payment) => (
                                <Fragment key={payment.name}>
                                  <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                  </Grid>
                                </Fragment>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Fragment>
                    }
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {activeStep !== 0 && (
                        <Button variant='outlined' onClick={handleBack} sx={{ mt: 3, ml: 1 }} color='tertiary'>
                          Atras
                        </Button>
                      )}
                      <Button variant='contained' onClick={handleNext} sx={{ mt: 3, ml: 1 }} color='tertiary'>
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                      </Button>
                    </Box>
                  </Fragment>
                )}
              </Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={7.5}>
            <Paper variant='outlined' sx={{ p: { xs: 2, md: 3 }, height: '88vh' }}>
              <TableContainer sx={{ height: '95%' }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? '$ ' + column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
    </div>
  )
}
