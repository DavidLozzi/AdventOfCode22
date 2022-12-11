import { Badge, Button, Container, Grid, GridItem, Heading, Textarea } from '@chakra-ui/react'
import { useState } from 'react';


function App() {
  const [input, setInput] = useState(`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`)

  const [answer1, setAnswer1] = useState()
  const [answer2, setAnswer2] = useState()

  const parseMonkeys = () => {
    const myMonkeys = []
    const monkeys = input.split('\n\n')
    monkeys.forEach(monkey => {
      const [name, start, op, test, ifTrue, ifFalse] = monkey.split('\n').map(r => r.trim())
      myMonkeys.push({
        name,
        start: start.split(':')[1].split(',').map(s => Number(s.trim())),
        operation: op.split('=').map(o => o.trim())[1],
        test: Number(test.match(/[0-9]+/)[0]),
        ifTrue: Number(ifTrue.match(/[0-9]+/)[0]),
        ifFalse: Number(ifFalse.match(/[0-9]+/)[0]),
        inspects: 0
      })
    })
    return myMonkeys
  }

  const solvePart1 = () => {
    const monkeys = parseMonkeys()
    for (let r = 0; r < 20; r++) {
      for (let m = 0; m < monkeys.length; m++) {
        const monkey = monkeys[m]
        monkey.inspects = monkey.inspects + monkey.start.length
        let s = 0
        while (monkey.start.length > 0) {
          const item = monkey.start[s]
          let worry = eval(monkey.operation.replace(/old/g, item))
          worry = Math.floor(worry / 3)
          if (worry % monkey.test === 0) {
            monkeys[monkey.ifTrue].start.push(worry)
          } else {
            monkeys[monkey.ifFalse].start.push(worry)
          }
          monkey.start.shift()
        }
      }
    }

    const sortedMonkeys = monkeys.sort((a, b) => a.inspects < b.inspects ? 1 : -1)
    const answer = sortedMonkeys[0].inspects * sortedMonkeys[1].inspects
    setAnswer1(answer)
  }


  const solvePart2 = () => {
    const monkeys = parseMonkeys()
    const superModulo = monkeys.reduce((a,b) => a * b.test, 1)
    for (let r = 0; r < 10000; r++) {
      for (let m = 0; m < monkeys.length; m++) {
        const monkey = monkeys[m]
        monkey.inspects = monkey.inspects + monkey.start.length
        let s = 0
        while (monkey.start.length > 0) {
          const item = monkey.start[s] % superModulo
          let worry = eval(monkey.operation.replace(/old/g, item))
          if (worry % monkey.test === 0) {
            monkeys[monkey.ifTrue].start.push(worry)
          } else {
            monkeys[monkey.ifFalse].start.push(worry)
          }
          monkey.start.shift()
        }
      }
      console.log('')
      console.log('round',r)
      monkeys.forEach(m => {
        console.log(m.name, m.inspects)
      })
    }

    const sortedMonkeys = monkeys.sort((a, b) => a.inspects < b.inspects ? 1 : -1)
    const answer = sortedMonkeys[0].inspects * sortedMonkeys[1].inspects
    setAnswer2(answer)
  }

  return (
    <Container maxW='1200px'>
      <Grid 
        gap={4}>
        <GridItem colSpan={3} h='10'>
          <Heading as='h1'>Day 11: Monkey in the Middle</Heading>
        </GridItem>
        <GridItem>Puzzle Input
          <Textarea rows={10} value={input} onChange={e => setInput(e.target.value)} />
        </GridItem>
        <GridItem>
          <Button colorScheme='blue' onClick={solvePart1}>Solve Part 1</Button>
          <Button colorScheme='blue' onClick={solvePart2}>Solve Part 2</Button>
        </GridItem>
        <GridItem>
          {answer1 && <Badge variant='solid' colorScheme='green'>Answer Part 1: {answer1}</Badge>}
          {answer2 && <Badge variant='solid' colorScheme='green'>Answer Part 2: {answer2}</Badge>}
        </GridItem>
      </Grid>
    </Container>
  );
}

export default App;
