import React, { useState } from 'react'
import { Grid, List, Card, CardHeader, ListItem, ListItemText, ListItemIcon, Checkbox, Button, Divider } from '@mui/material'

function not (a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection (a, b) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union (a, b) {
  return [...a, ...not(b, a)]
}

export default function Comprometidos () {
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([0, 1, 2, 3])
  const [right, setRight] = useState([4, 5, 6, 7])

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  const numberOfChecked = (items) => intersection(checked, items).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            color='tertiary'
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionadas`}
      />
      <Divider />
      <List
        sx={{
          width: '100%',
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component='div'
        role='list'
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role='listitem'
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  color='tertiary'
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={12} md={12} lg={5.5}>{customList('Facturas', left)}</Grid>
      <Grid item xs={12} md={12} lg={1}>
        <Grid container direction='column' alignItems='center'>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
            color='tertiary'
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
            color='tertiary'
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={5.5}>{customList('Facturas', right)}</Grid>
    </Grid>
  );
}
