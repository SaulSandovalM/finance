import * as React from 'react'
// Material Ui
import {
  CssBaseline,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// Number Format
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
// Firebase
import { getDatabase, ref, child, get } from 'firebase/database'

const products = [
  {
    name: 'Partida 1',
    desc: 'Nombre de partida',
    price: '$9.99'
  },
  {
    name: 'Partida 2',
    desc: 'Nombre de partida',
    price: '$3.45'
  }
]

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' }
];

function Resumen (props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Realizo
          </Typography>
          <Typography gutterBottom>{props.user.email}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function PartidaDestino () {
  const [state, setState] = React.useState({
    up: '',
    partida: '',
    rubro: '',
    cantidad: 0,
    mes: ''
  })

  const handleChange = (event) => {
    const value = event.target.value
    setState({
      ...state, [event.target.name]: value
    })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Partida destino
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Unidad presupuestal</InputLabel>
            <Select
              value={state.up}
              label="Unidad presupuestal"
              name='up'
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value='01'>01</MenuItem>
              <MenuItem value='02'>02</MenuItem>
              <MenuItem value='03'>03</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Partida</InputLabel>
            <Select
              value={state.partida}
              label="Partida"
              name='partida'
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value='211001'>211001</MenuItem>
              <MenuItem value='211002'>211002</MenuItem>
              <MenuItem value='211003'>211003</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Rubro</InputLabel>
            <Select
              value={state.rubro}
              label="Rubro"
              name='rubro'
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value='321001'>321001</MenuItem>
              <MenuItem value='321002'>321002</MenuItem>
              <MenuItem value='321003'>321003</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="cantidad"
            label="Cantidad"
            fullWidth
            value={state.cantidad}
            variant="standard"
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Mes a afectar</InputLabel>
            <Select
              value={state.mes}
              label="Mes a afectar"
              name='mes'
              onChange={handleChange}
            >
              <MenuItem value="">
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
    </React.Fragment>
  )
}

function NumberFormatCustom(props) {
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

function PartidaInicial (props) {
  const [state, setState] = React.useState({
    tipoMovimiento: '',
    up: '',
    partida: '',
    rubro: '',
    cantidad: 0,
    oficioAutorizacion: '',
    mes: ''
  })

  const handleChange = (event) => {
    const value = event.target.value
    setState({
      ...state, [event.target.name]: value
    })
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Partida inicial
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Tipo de Movimiento</InputLabel>
            <Select
              value={state.tipoMovimiento}
              label="Tipo de Movimiento"
              name='tipoMovimiento'
              onChange={handleChange}
            >
              <MenuItem value="">
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
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Unidad presupuestal</InputLabel>
            <Select
              value={state.up}
              label="Unidad presupuestal"
              name='up'
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {props.presupuesto.map(item => <MenuItem value={item}>{item.up}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Partida</InputLabel>
            <Select
              value={state.partida}
              label="Partida"
              name='partida'
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {props.presupuesto.map(item => <MenuItem value={item}>{item.partida}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Rubro</InputLabel>
            <Select
              value={state.rubro}
              label="Rubro"
              name='rubro'
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {props.presupuesto.map(item => <MenuItem value={item}>{item.rubro}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="cantidad"
            label="Cantidad"
            fullWidth
            value={state.cantidad}
            variant="standard"
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="oficioAutorizacion"
            label="Oficio de autorización"
            fullWidth
            value={state.oficioAutorizacion}
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth variant='standard'>
            <InputLabel>Mes a afectar</InputLabel>
            <Select
              value={state.mes}
              label="Mes a afectar"
              name='mes'
              onChange={handleChange}
            >
              <MenuItem value="">
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
    </React.Fragment>
  )
}

const steps = ['Partida inicial', 'Partida destino', 'Resumen']

function getStepContent(step, user, presupuesto) {
  switch (step) {
    case 0:
      return <PartidaInicial presupuesto={presupuesto} />
    case 1:
      return <PartidaDestino />
    case 2:
      return <Resumen user={user} />
    default:
      throw new Error('Unknown step')
  }
}

const theme = createTheme()

export default function Movimientos (props) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [presupuesto, setPresupuesto] = React.useState([])

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleReset = () => {
    setActiveStep(activeStep - activeStep)
  }

  React.useEffect(() => {
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
        console.log("Datos no disponibles")
      }
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Movimientos
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Su orden ha sido realizada.
                </Typography>
                <Typography variant="subtitle1">
                  Tu order es la numero #202200001. Hemos afectado la partida correspondiente, podra ver la afectación en el menu Disponible.
                </Typography>
                <Button variant="contained" onClick={handleReset} sx={{ mt: 3, ml: 1 }}>
                  Finalizar
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, props.user, presupuesto)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Atras
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
