import React from 'react'
// Material Ui
// import { Typography, Grid, Paper, Divider, TextField } from '@mui/material'
// Components
import Director from './Director'
import Presupuesto from './Presupuesto'

import app from './Firebase'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(app)

function Home ({ user }) {
  return (
    <div>
      Home
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      {user.admin === 'director' ? <Director /> : <Presupuesto />}
    </div>
  )
}

export default Home
