import { Button, Container, Grid, Text, Badge } from '@nextui-org/react'
import { useState } from 'react'

function App() {
  // counting upwards, 0 is on the bottom
  const [answer1, setAnswer1] = useState([])
  const [answer2, setAnswer2] = useState([])
  const [input, setInput] = useState(`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`)

  const parseStacks = (stackString) => {
    const rows = stackString.split('\n')
    const stackNums = rows[rows.length - 1].trim().split(/[\s]*/)
    const newStacks = []
    stackNums.forEach(s => {
      newStacks.push([])
    })
    for(let i = rows.length - 2; i >= 0; i--) {
      const row = rows[i]
      for(let c = 0; c < stackNums.length; c++) {
        const start = c * 4
        const val = row.substring(start,start+4).replace(/\[([A-Z\s])\]/, '$1').trim()
        console.log(c, start, val)
        if(val){
          newStacks[c].push(val)
        }
      }
    }
    console.log(newStacks)
    return newStacks
  }

  const moveOne = (instruction, rowIndex, stacks) => {
    const newStacks = [...stacks]
    const [qty, from, to] = instruction.match(/\s([0-9]+)/g).map(v => v.trim())
    console.log(qty, from, to)
    for(let i = 1; i <= qty; i++) {
      try {
        const container = newStacks[from-1].pop()
        console.log('moving',container,'from',from,'to',to)
        newStacks[to-1].push(container)
        console.log([...newStacks])
        if(!container) {
          debugger;
        }
      } catch (ex) {
        console.error(instruction, rowIndex, ex)
      }
    }
    return newStacks
  }

  const moveContainers = (stacks, instructions) => {
    const rows = instructions.split('\n')
    let newStacks = [...stacks]
    rows.forEach((row, ri) => {
      newStacks = moveOne(row, ri, newStacks)
    })
    console.log(newStacks)
    return newStacks
  }

  const solvePart1 = () => {
    const [stackString, instructions] = input.split('\n\n')
    const stacks = parseStacks(stackString)
    setAnswer1(moveContainers(stacks, instructions))
  }

  const [currentRow, setCurrentRow] = useState(0)
  const [slowStacks, setSlowStacks] = useState([])
  const [slowIns, setSlowIns] = useState([])
  const parseStacksSlow = () => {
    const [stackString, instructions] = input.split('\n\n')
    setSlowIns(instructions.split('\n'))
    setSlowStacks(parseStacks(stackString))
    setCurrentRow(0)
  }
  const solvePart1Slow = () => {
    let newStacks = [...slowStacks]
    newStacks = moveOne(slowIns[currentRow], currentRow, newStacks)
    console.log(newStacks)
    setAnswer1(newStacks)
    setSlowStacks(newStacks)
    setCurrentRow(currentRow + 1)
  }

  const moveMore = (instruction, rowIndex, stacks) => {
    const newStacks = [...stacks]
    const [qty, from, to] = instruction.match(/\s([0-9]+)/g).map(v => v.trim())
    console.log(qty, from, to)
    try {
      const containers = newStacks[from-1].splice(qty * -1)
      console.log('moving',containers,'from',from,'to',to)
      newStacks[to-1] = newStacks[to-1].concat(containers)
      if(!containers) {
        debugger;
      }
    } catch (ex) {
      console.error(instruction, rowIndex, ex)
    }
    return newStacks
  }
  const moveMoreContainers = (stacks, instructions) => {
    const rows = instructions.split('\n')
    let newStacks = [...stacks]
    rows.forEach((row, ri) => {
      newStacks = moveMore(row, ri, newStacks)
    })
    console.log(newStacks)
    return newStacks
  }

  const solvePart2 = () => {
    const [stackString, instructions] = input.split('\n\n')
    const stacks = parseStacks(stackString)
    setAnswer2(moveMoreContainers(stacks, instructions))

  }
  return (
    <Container>
    <Grid.Container gap={2} justify='center'>
      <Grid sm={12}><Text h1>Day 5: Supply Stacks</Text></Grid>
      <Grid sm={5}>
        <textarea label="Puzzle Input (the instructions)" rows={10} fullWidth value={input} onChange={e => setInput(e.target.value)} style={{fontFamily: 'courier new', color: '#000', width: '100%'}} />
      </Grid>
      <Grid sm={3}>
        <Button.Group vertical>
          <Button color='success' auto onClick={solvePart1}>Solve Part 1</Button>
          <Button color='success' auto onClick={parseStacksSlow}>Parse Stacks</Button>
          <Button color='success' auto onClick={solvePart1Slow} disabled={slowIns.length === 0 || currentRow === slowIns.length}>Move One</Button>
        </Button.Group>
        <Button.Group vertical>
          <Button color='success' auto onClick={solvePart2}>Solve Part 2</Button>
        </Button.Group>
      </Grid>
      <Grid sm={3}><div>
        {answer1.length > 0 && <Badge size="lg" color='success'>
        Part 1:&nbsp;
          {answer1.map(a => a[a.length -1])}
        </Badge>}
        <br/>
        {answer2.length > 0 && <Badge size="lg" color='success'>
        Part 2:&nbsp;
          {answer2.map(a => a[a.length -1])}
        </Badge>}
        </div>
      </Grid>
      <Grid sm={12} style={{fontFamily: 'courier', fontSize: '18px', display: 'flex', flexDirection: 'column'}}>
        {slowStacks.length > 0 && <>
          <div>#{currentRow} of {slowIns.length}<br/>Next Instruction: {currentRow < slowIns.length ? slowIns[currentRow] : 'completed'}</div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          {slowStacks.map((stack, i) => 
          <div key={i} style={{ width: '20px', display: 'flex', flexDirection: 'column-reverse'}}>
            <div style={{fontSize: '12px'}}>{stack.length}</div>
            {i+1}
            {stack.map((c, ci) => <div key={ci}>{c}</div>)}
            </div>)}
          </div>
        </>}
      </Grid>
    </Grid.Container>
    </Container>
  );
}

export default App;
