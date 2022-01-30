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
import { getDatabase, ref, child, get, orderByChild } from 'firebase/database'

// Fecha actual
var today = new Date()
var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
var f = new Date()
today = diasSemana[f.getDay()] + ', ' + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()

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
  const [steps, setSteps] = useState(['Partida inicial', 'Partida destino', 'Resumen'])
  const [tipoMovimiento, setTipoMovimiento] = useState('')
  const [up, setUp] = useState('')
  const [partida, setPartida] = useState('')
  const [rubro, setRubro] = useState('')
  const [partidaList, setPartidaList] = useState([])
  const [rubroList, setRubroList] = useState([])
  const [inicialId, setInicialId] = useState([])
  // States de Partida Destino
  const [upDestino, setUpDestino] = useState('')
  const [partidaDestinoList, setPartidaDestinoList] = useState([])
  const [partidaDestino, setPartidaDestino] = useState('')
  const [rubroDestinoList, setRubroDestinoList] = useState([])
  const [rubroDestino, setRubroDestino] = useState('')
  const [destinoId, setDestinoId] = useState([])
  //
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(13)
  const [activeStep, setActiveStep] = useState(0)
  const [presupuesto, setPresupuesto] = useState([])
  const [state, setState] = useState({
    cantidad: 0,
    oficioAutorizacion: '',
    mes: '',
    // States de Partida Destino
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
    get(child(dbRef, 'presupuesto'), orderByChild('up')).then((snapshot) => {
      if (snapshot.exists()) {
        var arrayPresupuesto = []
        snapshot.forEach((child) => {
          arrayPresupuesto.push({
            up: child.val().up
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

  const handleChangeUp = (event) => {
    setUp(event.target.value)
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto'), orderByChild('ogasto')).then((snapshot) => {
      if (snapshot.exists()) {
        var arrayPartida = []
        snapshot.forEach((child) => {
          if (child.val().up === event.target.value) {
            arrayPartida.push({
              partida: child.val().ogasto,
            })
          }
        })
        let partidaFilter = arrayPartida.map(item => { return item.partida })
        let resultPartida = partidaFilter.filter((item, index) => { return partidaFilter.indexOf(item) === index })
        setPartidaList(resultPartida)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleChangePartida = (event) => {
    setPartida(event.target.value)
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto'), orderByChild('rubro')).then((snapshot) => {
      if (snapshot.exists()) {
        var arrayRubro = []
        snapshot.forEach((child) => {
          if (child.val().up === up && child.val().ogasto === event.target.value) {
            arrayRubro.push({
              rubro: child.val().rubro,
            })
          }
        })
        let partidaFilter = arrayRubro.map(item => { return item.rubro })
        let resultPartida = partidaFilter.filter((item, index) => { return partidaFilter.indexOf(item) === index })
        setRubroList(resultPartida)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleChangeRubro = (event) => {
    setRubro(event.target.value)
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto')).then((snapshot) => {
      if (snapshot.exists()) {
        var arraySelect = []
        snapshot.forEach((child) => {
          if (child.val().up === up && child.val().ogasto === partida && child.val().rubro === event.target.value) {
            arraySelect.push({
              id: child.key,
              nombreProyecto: child.val().nombreProyecto
            })
          }
        })
        setInicialId(arraySelect)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  // Group by up
  let upFilter = presupuesto.map(item => { return item.up })
  let resultUp = upFilter.filter((item, index) => { return upFilter.indexOf(item) === index })

  const handleChangeUpDestino = (event) => {
    setUpDestino(event.target.value)
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto'), orderByChild('ogasto')).then((snapshot) => {
      if (snapshot.exists()) {
        var arrayPartidaDestino = []
        snapshot.forEach((child) => {
          if (child.val().up === event.target.value) {
            arrayPartidaDestino.push({
              partida: child.val().ogasto,
            })
          }
        })
        let partidaDestinoFilter = arrayPartidaDestino.map(item => { return item.partida })
        let resultPartidaDestino = partidaDestinoFilter.filter((item, index) => { return partidaDestinoFilter.indexOf(item) === index })
        setPartidaDestinoList(resultPartidaDestino)
        console.log(resultPartidaDestino)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleChangePartidaDestino = (event) => {
    setPartidaDestino(event.target.value)
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto'), orderByChild('rubro')).then((snapshot) => {
      if (snapshot.exists()) {
        var arrayRubroDestino = []
        snapshot.forEach((child) => {
          if (child.val().up === upDestino && child.val().ogasto === event.target.value) {
            arrayRubroDestino.push({
              rubro: child.val().rubro,
            })
          }
        })
        let partidaDestinoFilter = arrayRubroDestino.map(item => { return item.rubro })
        let resultPartidaDestino = partidaDestinoFilter.filter((item, index) => { return partidaDestinoFilter.indexOf(item) === index })
        setRubroDestinoList(resultPartidaDestino)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleChangeRubroDestino = (event) => {
    setRubroDestino(event.target.value)
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'presupuesto')).then((snapshot) => {
      if (snapshot.exists()) {
        var arraySelectDestino = []
        snapshot.forEach((child) => {
          if (child.val().up === upDestino && child.val().ogasto === partidaDestino && child.val().rubro === event.target.value) {
            arraySelectDestino.push({
              id: child.key,
              nombreProyecto: child.val().nombreProyecto
            })
          }
        })
        setDestinoId(arraySelectDestino)
      } else {
        console.log('Datos no disponibles')
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleChangeTipoMovimiento = (event) => {
    setTipoMovimiento(event.target.value)
    if (event.target.value === 'Ampliación' || event.target.value === 'Reduccion') {
      setSteps(['Partida inicial', 'Resumen'])
    } else {
      setSteps(['Partida inicial', 'Partida destino', 'Resumen'])
    }
  }

  const handleSubmit = (event) => {
    const db = getDatabase()
    var saveInicial = {
      tipoMovimiento: tipoMovimiento,
      up: up,
      partida: partida,
      rubro: rubro,
      importe: state.cantidad,
      oficioAutorizacion: state.oficioAutorizacion,
      mesAfectado: state.mes,
      // Partida Destino
      upDestino: upDestino,
      partidaDestino: partidaDestino,
      rubroDestino: rubroDestino,
      cantidadDestino: state.cantidadDestino,
      mesDestino: state.mesDestino,
      // idPartidaAfectada
      idPartidaAfectada: inicialId[0].id
    }
    console.log(saveInicial)

    setTipoMovimiento('')
    setUp('')
    setPartida('')
    setRubro('')
    setPartidaList([])
    setRubroList([])
    setInicialId([])
    // States de Partida Destino
    setUpDestino('')
    setPartidaDestinoList([])
    setPartidaDestino('')
    setRubroDestinoList([])
    setRubroDestino('')
    setDestinoId([])
    setState({
      cantidad: 0,
      oficioAutorizacion: '',
      mes: '',
      // States de Partida Destino
      cantidadDestino: 0,
      mesDestino: ''
    })
    handleNext()
  }

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
                    <Button variant='contained' onClick={handleReset} sx={{ mt: 3, ml: 1 }} color='secondary'>
                      Volver
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
                                value={tipoMovimiento}
                                label='Tipo de Movimiento'
                                name='tipoMovimiento'
                                onChange={handleChangeTipoMovimiento}
                              >
                                <MenuItem value='Ampliación'>Ampliación</MenuItem>
                                <MenuItem value='Reduccion'>Reducción</MenuItem>
                                <MenuItem value='Transferencia'>Transferencia</MenuItem>
                                <MenuItem value='Saldos'>Saldos</MenuItem>
                                <MenuItem value='Fondo Revolvente'>Fondo Revolvente</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Unidad presupuestal</InputLabel>
                              <Select
                                value={up}
                                label='Unidad presupuestal'
                                name='up'
                                onChange={handleChangeUp}
                              >
                                {resultUp.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Partida</InputLabel>
                              <Select
                                value={partida}
                                label='Partida'
                                name='partida'
                                onChange={handleChangePartida}
                              >
                                {partidaList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Rubro</InputLabel>
                              <Select
                                value={rubro}
                                label='Rubro'
                                name='rubro'
                                onChange={handleChangeRubro}
                              >
                                {rubroList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
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
                                <MenuItem value='enero'>Enero</MenuItem>
                                <MenuItem value='febrero'>Febrero</MenuItem>
                                <MenuItem value='marzo'>Marzo</MenuItem>
                                <MenuItem value='abril'>Abril</MenuItem>
                                <MenuItem value='mayo'>Mayo</MenuItem>
                                <MenuItem value='junio'>Junio</MenuItem>
                                <MenuItem value='julio'>Julio</MenuItem>
                                <MenuItem value='agosto'>Agosto</MenuItem>
                                <MenuItem value='septiembre'>Septiembre</MenuItem>
                                <MenuItem value='octubre'>Octubre</MenuItem>
                                <MenuItem value='noviembre'>Noviembre</MenuItem>
                                <MenuItem value='diciembre'>Diciembre</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant='contained'
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                            color='tertiary'
                            disabled={!tipoMovimiento || !state.cantidad || !state.oficioAutorizacion || !state.mes || !up || !partida || !rubro}
                          >
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                          </Button>
                        </Box>
                      </Fragment>
                    }
                    {(tipoMovimiento === 'Ampliación' || tipoMovimiento === 'Reduccion')
                      ? activeStep === ''
                      : activeStep === 1 &&
                      <Fragment>
                        <Typography variant='h6' gutterBottom>
                          Partida destino
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Unidad presupuestal</InputLabel>
                              <Select
                                value={upDestino}
                                label='Unidad presupuestal'
                                name='upDestino'
                                onChange={handleChangeUpDestino}
                              >
                                {resultUp.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Partida</InputLabel>
                              <Select
                                value={partidaDestino}
                                label='Partida'
                                name='partidaDestino'
                                onChange={handleChangePartidaDestino}
                              >
                                {partidaDestinoList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth variant='standard' color='tertiary'>
                              <InputLabel>Rubro</InputLabel>
                              <Select
                                value={rubroDestino}
                                label='Rubro'
                                name='rubroDestino'
                                onChange={handleChangeRubroDestino}
                              >
                                {rubroDestinoList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {activeStep !== 0 && (
                            <Button variant='outlined' onClick={handleBack} sx={{ mt: 3, ml: 1 }} color='tertiary'>
                              Atras
                            </Button>
                          )}
                          <Button
                            variant='contained'
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                            color='tertiary'
                            disabled={!upDestino || !partidaDestino || !rubroDestino || !state.cantidadDestino || !state.mesDestino}
                          >
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                          </Button>
                        </Box>
                      </Fragment>
                    }
                    {((tipoMovimiento === 'Ampliación' || tipoMovimiento === 'Reduccion')
                      ? activeStep === 1
                      : activeStep === 2) &&
                      <Fragment>
                        <Typography variant='h6' gutterBottom>
                          Resumen
                        </Typography>
                        <List disablePadding>
                          <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={'Partida inicial'} secondary={inicialId[0].nombreProyecto} />
                            <Typography variant='body2'>$ {parseFloat(state.cantidad).toFixed(2)}</Typography>
                          </ListItem>
                          {(tipoMovimiento === 'Ampliación' || tipoMovimiento === 'Reduccion')
                            ? ''
                            : <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={'Partida destino'} secondary={destinoId[0].nombreProyecto} />
                                <Typography variant='body2'>$ {parseFloat(state.cantidadDestino).toFixed(2)}</Typography>
                              </ListItem>
                          }
                          <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary='Total' />
                            <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                              $ {(parseFloat(state.cantidad) + parseFloat(state.cantidadDestino)).toFixed(2)}
                            </Typography>
                          </ListItem>
                        </List>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                              Realizo
                            </Typography>
                            <Typography gutterBottom>{props.user.email}</Typography>
                            <Typography gutterBottom>{today}</Typography>
                          </Grid>
                          <Grid item container direction='column' xs={12} sm={6}>
                            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                              Detalles
                            </Typography>
                            <Grid container>
                              <Fragment>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>Tipo</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>{tipoMovimiento}</Typography>
                                </Grid>
                              </Fragment>
                              <Fragment>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>Up</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>{up}</Typography>
                                </Grid>
                              </Fragment>
                              <Fragment>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>Partida</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>{partida}</Typography>
                                </Grid>
                              </Fragment>
                              <Fragment>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>Rubro</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography gutterBottom>{rubro}</Typography>
                                </Grid>
                              </Fragment>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {activeStep !== 0 && (
                            <Button variant='outlined' onClick={handleBack} sx={{ mt: 3, ml: 1 }} color='tertiary'>
                              Atras
                            </Button>
                          )}
                          <Button
                            variant='contained'
                            sx={{ mt: 3, ml: 1 }}
                            color='tertiary'
                            onClick={handleSubmit}
                          >
                            Finalizar
                          </Button>
                        </Box>
                      </Fragment>
                    }
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
                rowsPerPageOptions={[]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              />
            </Paper>
          </Grid>
        </Grid>
    </div>
  )
}
