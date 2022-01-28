import React from 'react'
// Material Ui
import { Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material'
// Assets
import logo from '../assets/logo.png'
// Firebase
import app from './Firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' // createUserWithEmailAndPassword
// import { getFirestore, doc, setDoc } from 'firebase/firestore'

const auth = getAuth(app)
// const firestore = getFirestore(app)

export default function Login (props) {
  // const [isRegister, setIsRegister] = useState(false)

  // async function registerUser (email, password, role) {
  //   const infoUser = await createUserWithEmailAndPassword(auth, email, password).then((firebaseUser) => {
  //     return firebaseUser
  //   })
  //   console.log(infoUser.user.uid)
  //   const docRef = doc(firestore, `users/${infoUser.user.uid}`)
  //   setDoc(docRef, { email: email, role: role })
  // }

  function handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    const email = data.get('email')
    const password = data.get('password')
    // login
    signInWithEmailAndPassword(auth, email, password)
  }

  // const handleSubmit = (event) => {
    // e.preventDefault()
    // const email = e.target.elements.email.value
    // const password = e.target.elements.password.value
    // const role = e.target.elements.role.value
    // console.log(isRegister)
    // if (isRegister) {
    //   // register
    //   registerUser(email, password, role)
    // } else {
    //   // login
    //   signInWithEmailAndPassword(auth, email, password)
    // }
  // };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={9}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square sx={{ backgroundColor: '#07131f' }}>
        <Box sx={{ mt: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '93vh' }}>
          <Typography component="h1" variant="h3" align='center' color='white'>
            SISTEMA FINANCIEROS
          </Typography>
          <Typography color='white'
            sx={{
              marginTop: '30px'
            }}
          >
            Bienvenidos al Sistema Integral Informático de Administración y Finanzas.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                color='primary'
                variant="standard"
                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color='secondary'
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </div>
            <Typography variant="body2" align="center" {...props} color='gray'>
              {'© '}
              <Link color="inherit" href="https://procuraduria.hidalgo.gob.mx/">
                Gobierno del Estado de Hidalgo
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
