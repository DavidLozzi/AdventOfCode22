import { Typography, Container, TextField, Box, Grid, Button, Chip, List, ListItem } from '@mui/material';
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`)
  const [elves, setElves] = useState([])
  const [duration, setDuration] = useState()
  const [part2, setPart2] = useState()
  const getAnswer1 = () => {
    //get each unique elf totals
    //get max elf
    const startTime = new Date()
    const _elves = inputValue.split('\n\n')
    const newElves = []
    _elves.forEach((elf, index) => {
      const calories = elf.split('\n')
      newElves.push({ number: index+1, total: calories.reduce((a,b) => a + Number(b), 0)})
    })
    setElves(newElves.sort((a,b) => a.total < b.total ? 1 : -1))
    setDuration(new Date().getTime() - startTime.getTime())
  }
  const getAnswer2 = () => {
    setPart2(elves.filter((e,i) => i < 3).reduce((a,b) => a + b.total, 0))
  }
  return (
    <Container><Typography variant="h3" component="h1" >Day 1 - Calorie Counting</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField multiline label="Puzzle Input" maxRows={10} value={inputValue} onChange={e => setInputValue(e.target.value)}></TextField>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant='contained' onClick={getAnswer1}>Solve Part 1</Button>
          {elves.length > 0 && <Button variant='contained' onClick={getAnswer2}>Solve Part 2</Button>}
          </Grid>

        <Grid item xs={12} sm={4}>
          {elves.length > 0 && 
            <>
              <div>
                <Chip label={`Part 1: Top Elf has ${elves[0].total} Calories`} />
              </div>
              { part2 && <div>
                <Chip label={`Part 2: Top 3 Elves have ${part2} Calories`} />
              </div>}
              <Chip label={`${elves.length} Elves Total`} variant='outlined' />
              <div style={{paddingTop: '20px'}}>
                Top 10 Elf Calories
                <List>
                  {elves
                    .filter((e,i) => i < 10)
                    .map(elf => 
                    <ListItem key={elf.number}>{elf.total}</ListItem>
                    )}
                </List>
              </div>
              Completed in {duration}ms
            </>
          }
          </Grid>
      </Grid>
    </Container>
  );
}

export default App;
