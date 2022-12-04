import { Container, Grid, TextArea, Form, Button } from 'semantic-ui-react'
import { useState } from 'react';


function App() {
  const [input, setInput] = useState(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)
  const [answer1, setAnswer1] = useState([])
  const [answer2, setAnswer2] = useState([])

  const getPriority = (val) => {
    if(val.match(/[a-z]/)) {
      return val.charCodeAt(0) - 96
    }
    if(val.match(/[A-Z]/)) {
      return val.charCodeAt(0) - 38
    }
    console.error('val didn\'t match', val)
  }

  const getPart1 = () => {
    const newAnswer = []
    input.split('\n').forEach(ruck => {
      const comp1 = ruck.substring(0, ruck.length/2)
      const comp2 = ruck.substring(ruck.length/2)
      const itemsIn1 = comp1.split('')
      const itemsIn2 = comp2.split('')

      let inBoth = ''
      for(let i = 0; i < itemsIn1.length; i++){
        if(itemsIn2.some(a => a === itemsIn1[i])) {
          inBoth = itemsIn1[i]
        }
      }
      if(inBoth === '') {
        console.error('no match in either compartment for', ruck)
      } 

      const priority = getPriority(inBoth)
      newAnswer.push({
        letter: inBoth,
        priority
      })
    })
    setAnswer1(newAnswer)
    console.log(newAnswer)
  }

  const getPart2 = () => {
    const newAnswer = []
    const sacks = input.split('\n')
    for(let i = 0; i < sacks.length; i+=3) {
      const sack1 = sacks[i]
      const sack2 = sacks[i+1]
      const sack3 = sacks[i+2]
      const itemsIn1 = sack1.split('')

      itemsIn1.some(item => {
        if(sack2.indexOf(item) > -1 && sack3.indexOf(item) > -1) {
          const priority = getPriority(item)
          newAnswer.push({
            priority,
            letter: item
          })
          return true
        }
      })
    }
    setAnswer2(newAnswer)
    console.log(newAnswer)
  }

  return (
    <Container>
      <Grid divided>
        <Grid.Row columns={1}>
          <Grid.Column ><h1>Day 3: Rucksack Reorganization</h1></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            Puzzle Input
            <Form>
              <TextArea rows={10} value={input} onChange={e => setInput(e.target.value)} />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Button primary onClick={getPart1}>Solve Part 1</Button>
            <Button primary onClick={getPart2}>Solve Part 2</Button>
          </Grid.Column>
          <Grid.Column>
            {answer1.length > 0 && <p>
              {answer1.length} rucksacks<br/>
              {answer1.reduce((a,b) => a + b.priority, 0)} Total
            </p>}
            {answer2.length > 0 && <p>
              {answer1.length} rucksacks<br/>
              {answer2.length} sets of 3<br/>
              {answer2.reduce((a,b) => a + b.priority, 0)} Total
            </p>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
