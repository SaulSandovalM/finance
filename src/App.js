import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
// Firebase
import app from './components/Firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
// Material Ui
import { styled } from '@mui/material/styles'
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
// Icons
import { AccountBalance, ImportExport } from '@mui/icons-material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
// Components
// import Home from './components/Home'
import Login from './components/Login'
import Presupuesto from './components/Presupuesto/Presupuesto'
import Movimientos from './components/Presupuesto/Movimientos'
// Material Ui Theme
import { createTheme, ThemeProvider } from '@mui/material/styles'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

// Firebase conf
const auth = getAuth(app)
const firestore = getFirestore(app)

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#6ac11e'
    },
    tertiary: {
      main: '#07131f',
      contrastText: '#ffffff'
    }
  }
})

export default function App () {
  // States
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

  // Functions
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  async function getRole (uid) {
    const docRef = doc(firestore, `users/${uid}`)
    const docSecret = await getDoc(docRef)
    const finalInfo = docSecret.data().role
    return finalInfo
  }

  function setUserWithFirebaseAndRole (firebaseUser) {
    getRole(firebaseUser.uid).then((role) => {
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: role
      }
      setUser(userData)
      console.log('final userData:', userData)
    })
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      if (!user) {
        setUserWithFirebaseAndRole(firebaseUser)
      }
    } else {
      setUser(null)
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {user ?
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open} color='tertiary'>
              <Toolbar>
                <IconButton
                  color='primary'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant='h6' noWrap component='div'>
                  Direccion General de Finanzas
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant='persistent'
              anchor='left'
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              {/* Director */}
              {user.role === 'director' ?
                <List>
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              : '' }
              {/* presupuesto */}
              {user.role === 'presupuesto' ?
                <div>
                  <Divider />
                  <List>
                    {['Presupuesto', 'Movimientos', 'Send email', 'Drafts'].map((text, index) => (
                      <Link to={text} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItem button key={text}>
                          <ListItemIcon>
                            {index % 2 === 0 ? <AccountBalance /> : <ImportExport />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </div>
              : '' }
              {user.role === 'tesoreria' ?
                <div>
                  <Divider />
                  <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              : '' }
              {user.role === 'fondos' ?
                <div>
                  <Divider />
                  <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              : '' }
            </Drawer>
            <Main open={open}>
              <DrawerHeader />
              {/* user && <Home user={user} /> */}
              <Routes>
                {/* Comun */}
                {/* <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/perfil' component={Perfil} />
                <Route exact path='/' component={Login} /> */}
                {/* Presupuesto */}
                <Route path='/Presupuesto' element={<Presupuesto />} />
                <Route path='/Movimientos' element={<Movimientos />} />
                {/* <Route exact path='/presupuesto/:id' component={EditarPresupuesto} />
                <Route exact path='/revolvente' component={Revolvente} />
                <Route exact path='/archivos' component={Archivos} />
                <Route exact path='/disponible' component={Disponible} />
                <Route exact path='/contrarecibo' component={Contrarecibo} />
                <Route exact path='/informe' component={Informe} />
                <Route exact path='/actualizar' component={Actualizar} /> */}
                {/* Tesoreria */}
                {/* <Route exact path='/caja' component={Caja} />
                <Route exact path='/arqueo' component={Arqueo} />
                <Route exact path='/cheques' component={Cheques} />
                <Route exact path='/contrarecibos' component={ContraVales} />
                <Route exact path='/valeslist' component={ValesList} />
                <Route exact path='/vales' component={Vales} />
                <Route exact path='/caratula' component={Caratula} /> */}
                {/* Validacion */}
                {/* <Route exact path='/validacion' component={Validacion} /> */}
                {/* Fondos */}
                {/* <Route exact path='/fondos' component={Fondos} />
                <Route exact path='/user' component={BoardFondo} />
                <Route exact path='/mod' component={BoardManager} />
                <Route exact path='/admin' component={BoardDirector} /> */}
              </Routes>
            </Main>
          </Box>
        : <Login />}
      </BrowserRouter>
    </ThemeProvider>
  )
}
