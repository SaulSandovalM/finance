import React, { useState } from 'react'
// Material Ui
import { Button, Grid, TextField, Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
// Firebase
import { getDatabase, ref, push } from "firebase/database"

// Functions
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

export default function Presupuesto (props) {
  // States
  const [state, setState] = useState({
    year: '',
    rm: '',
    ur: '',
    up: '',
    rubro: '',
    tg: '',
    ogasto: '',
    f: '',
    fu: '',
    sf: '',
    eje: '',
    s: '',
    prog: '',
    sp: '',
    obj: '',
    proy: '',
    est: '',
    obra: '',
    ben: '',
    eg: '',
    mi: '',
    pr: '',
    pd: '',
    itrans: '',
    min: '',
    igest: '',
    la: '',
    ods: '',
    et: '',
    ff: '',
    of: '',
    np: '',
    cpa: '',
    nombreProyecto: '',
    oficio: '',
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0
  })
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sever, setSever] = useState('')

  // Functions
  const handleChange = (event) => {
    const value = event.target.value
    setState({
      ...state, [event.target.name]: value
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  function writePresupuestoData () {
    const db = getDatabase()
    if (state.year && state.rm && state.ur && state.up && state.rubro && state.tg && state.ogasto && state.f && state.fu && state.sf && state.eje &&
    state.s && state.prog && state.sp && state.obj && state.proy && state.est && state.obra && state.ben && state.eg && state.mi && state.pr &&
    state.pd && state.itrans && state.min && state.igest && state.la && state.ods && state.et && state.ff && state.of && state.np && state.cpa &&
    state.nombreProyecto && state.oficio && state.enero && state.febrero && state.marzo && state.abril && state.mayo && state.junio && state.julio &&
    state.agosto && state.septiembre && state.octubre && state.noviembre && state.diciembre) {
      push(ref(db, 'presupuesto'), {
        year: state.year,
        rm: state.rm,
        ur: state.ur,
        up: state.up,
        rubro: state.rubro,
        tg: state.tg,
        ogasto: state.ogasto,
        f: state.f,
        fu: state.fu,
        sf: state.sf,
        eje: state.eje,
        s: state.s,
        prog: state.prog,
        sp: state.sp,
        obj: state.obj,
        proy: state.proy,
        est: state.est,
        obra: state.obra,
        ben: state.ben,
        eg: state.eg,
        mi: state.mi,
        pr: state.pr,
        pd: state.pd,
        itrans: state.itrans,
        min: state.min,
        igest: state.igest,
        la: state.la,
        ods: state.ods,
        et: state.et,
        ff: state.ff,
        of: state.of,
        np: state.np,
        cpa: state.cpa,
        nombreProyecto: state.nombreProyecto,
        oficio: state.oficio,
        enero: parseFloat(state.enero),
        febrero: parseFloat(state.febrero),
        marzo: parseFloat(state.marzo),
        abril: parseFloat(state.abril),
        mayo: parseFloat(state.mayo),
        junio: parseFloat(state.junio),
        julio: parseFloat(state.julio),
        agosto: parseFloat(state.agosto),
        septiembre: parseFloat(state.septiembre),
        octubre: parseFloat(state.octubre),
        noviembre: parseFloat(state.noviembre),
        diciembre: parseFloat(state.diciembre)
      }).then(() => {
        setSever('success')
        setMessage('Carga Exitosa')
        setOpen(true)
      }).catch(() => {
        setSever('error')
        setMessage('Error al cargar')
      })
    } else {
      setSever('info')
      setMessage('Por favor lleve todo los campos')
      setOpen(true)
    }
  }

  const cpa = state.year + '-' + state.rm + '-' + state.ur + '-' + state.up + '-' + state.rubro + '-' + state.tg + '-' + state.ogasto + '-' +
            state.f + '-' + state.fu + '-' + state.sf + '-' + state.eje + '-' + state.s + '-' + state.prog + '-' + state.sp + '-' + state.obj +
            '-' + state.proy + '-' + state.est + '-' + state.obra + '-' + state.ben + '-' + state.eg + '-' + state.mi + '-' + state.pr + '-' +
            state.pd + '-' + state.itrans + '-' + state.min + '-' +state.igest + '-' + state.la + '-' + state.ods + '-' + state.et + '-' +
            state.ff + '-' + state.of + '-' + state.np

  state.cpa = cpa

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleClose} severity={sever} variant="filled">
          {message}
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Año'
            fullWidth
            value={state.year}
            onChange={handleChange}
            name='year'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Rm'
            fullWidth
            value={state.rm}
            onChange={handleChange}
            name='rm'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Ur'
            fullWidth
            value={state.ur}
            onChange={handleChange}
            name='ur'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Up'
            fullWidth
            value={state.up}
            onChange={handleChange}
            name='up'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Rubro'
            fullWidth
            value={state.rubro}
            onChange={handleChange}
            name='rubro'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Tg'
            fullWidth
            value={state.tg}
            onChange={handleChange}
            name='tg'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Ogasto'
            fullWidth
            value={state.ogasto}
            onChange={handleChange}
            name='ogasto'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='F'
            fullWidth
            value={state.f}
            onChange={handleChange}
            name='f'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Fu'
            fullWidth
            value={state.fu}
            onChange={handleChange}
            name='fu'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Sf'
            fullWidth
            value={state.sf}
            onChange={handleChange}
            name='sf'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Eje'
            fullWidth
            value={state.eje}
            onChange={handleChange}
            name='eje'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='S'
            fullWidth
            value={state.s}
            onChange={handleChange}
            name='s'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Prog'
            fullWidth
            value={state.prog}
            onChange={handleChange}
            name='prog'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Sp'
            fullWidth
            value={state.sp}
            onChange={handleChange}
            name='sp'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Obj'
            fullWidth
            value={state.obj}
            onChange={handleChange}
            name='obj'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Proy'
            fullWidth
            value={state.proy}
            onChange={handleChange}
            name='proy'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Est'
            fullWidth
            value={state.est}
            onChange={handleChange}
            name='est'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Obra'
            fullWidth
            value={state.obra}
            onChange={handleChange}
            name='obra'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Ben'
            fullWidth
            value={state.ben}
            onChange={handleChange}
            name='ben'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Eg'
            fullWidth
            value={state.eg}
            onChange={handleChange}
            name='eg'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Mi'
            fullWidth
            value={state.mi}
            onChange={handleChange}
            name='mi'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Pr'
            fullWidth
            value={state.pr}
            onChange={handleChange}
            name='pr'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Pd'
            fullWidth
            value={state.pd}
            onChange={handleChange}
            name='pd'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Itrans'
            fullWidth
            value={state.itrans}
            onChange={handleChange}
            name='itrans'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Min'
            fullWidth
            value={state.min}
            onChange={handleChange}
            name='min'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Igest'
            fullWidth
            value={state.igest}
            onChange={handleChange}
            name='igest'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='La'
            fullWidth
            value={state.la}
            onChange={handleChange}
            name='la'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Ods'
            fullWidth
            value={state.ods}
            onChange={handleChange}
            name='ods'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Et'
            fullWidth
            value={state.et}
            onChange={handleChange}
            name='et'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Ff'
            fullWidth
            value={state.ff}
            onChange={handleChange}
            name='ff'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Of'
            fullWidth
            value={state.of}
            onChange={handleChange}
            name='of'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Np'
            fullWidth
            value={state.np}
            onChange={handleChange}
            name='np'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            label='Cpa'
            fullWidth
            value={cpa}
            name='cpa'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            label='Nombre proyecto'
            fullWidth
            value={state.nombreProyecto}
            onChange={handleChange}
            name='nombreProyecto'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            label='Oficio de autorización'
            fullWidth
            value={state.oficio}
            onChange={handleChange}
            name='oficio'
            required
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Enero'
            fullWidth
            required
            value={state.enero}
            name='enero'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Febrero'
            fullWidth
            required
            value={state.febrero}
            name='febrero'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Marzo'
            fullWidth
            required
            value={state.marzo}
            name='marzo'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Abril'
            fullWidth
            required
            value={state.abril}
            name='abril'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Mayo'
            fullWidth
            required
            value={state.mayo}
            name='mayo'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Junio'
            fullWidth
            required
            value={state.junio}
            name='junio'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Julio'
            fullWidth
            required
            value={state.julio}
            name='julio'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Agosto'
            fullWidth
            required
            value={state.agosto}
            name='agosto'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Septiembre'
            fullWidth
            required
            value={state.septiembre}
            name='septiembre'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Octubre'
            fullWidth
            required
            value={state.octubre}
            name='octubre'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Noviembre'
            fullWidth
            required
            value={state.noviembre}
            name='noviembre'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            label='Diciembre'
            fullWidth
            required
            value={state.diciembre}
            name='diciembre'
            onChange={handleChange}
            InputProps={{ inputComponent: NumberFormatCustom }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='standard'
            color='tertiary'
          />
        </Grid>
        <Grid container direction="row" justifyContent="flex-end" alignItems="center" sx={{ mt: '25px' }}>
          <Button variant='contained' onClick={writePresupuestoData} color='tertiary'>Enviar</Button>
        </Grid>
      </Grid>
    </div>
  )
}
