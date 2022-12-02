import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';


const winningHand = {
  rock: 1,
  paper: 2,
  scissors: 3
}
const myOptions = {
  rock: 'X',
  paper: 'Y',
  scissors: 'Z'
}
const myHand = {
  X: 1,
  Y: 2,
  Z: 3
}
const intendedOutcome = {
  lose: 'X',
  draw: 'Y',
  win: 'Z'
}
const outcome = {
  lose: 0,
  draw: 3,
  win: 6
}

function App() {
  const [input, setInput] = useState(`A Y
B X
C Z`)
  const [games, setGames] = useState([])
  const [finalScore, setFinalScore] = useState(0)
  const [games2, setGames2] = useState([])
  const [finalScore2, setFinalScore2] = useState(0)

  const play = (their, mine) => {
    if(their === 'A') { //ROCK
      if(mine === 'X') return outcome.draw
      if(mine === 'Y') return outcome.win
      if(mine === 'Z') return outcome.lose
    }
    if(their === 'B') { //PAPER
      if(mine === 'X') return outcome.lose
      if(mine === 'Y') return outcome.draw
      if(mine === 'Z') return outcome.win
    }
    if(their === 'C') { //SCISSORS
      if(mine === 'X') return outcome.win
      if(mine === 'Y') return outcome.lose
      if(mine === 'Z') return outcome.draw
    }
    console.error('no match was found')
  }
  const getMyHand = (their, outcome) => {
    if(their === 'A') { //ROCK
      if(outcome === intendedOutcome.lose) return myOptions.scissors
      if(outcome === intendedOutcome.draw) return myOptions.rock
      if(outcome ===  intendedOutcome.win) return myOptions.paper
    }
    if(their === 'B') { //PAPER
      if(outcome === intendedOutcome.lose) return myOptions.rock
      if(outcome === intendedOutcome.draw) return myOptions.paper
      if(outcome ===  intendedOutcome.win) return myOptions.scissors
    }
    if(their === 'C') { //SCISSORS
      if(outcome === intendedOutcome.lose) return myOptions.paper
      if(outcome === intendedOutcome.draw) return myOptions.scissors
      if(outcome ===  intendedOutcome.win) return myOptions.rock
    }
    console.error('no match was found')
  }
  const getPart1 = () => {
    const newGames = []
    input.split('\n').forEach(g => {
      const [their, mine] = g.trim().split(' ')
      const outcome = play(their, mine)
      const myPlay = myHand[mine]
      newGames.push({
        their,
        mine,
        outcome,
        score: outcome + myPlay
      })
    })
    setGames(newGames)
    setFinalScore(newGames.reduce((a,b) => a + b.score, 0))
    console.log('part 1', newGames)
  }

  const getPart2 = () => {
    const newGames = []
    input.split('\n').forEach(g => {
      const [their, desiredOutcome] = g.trim().split(' ')
      const mine = getMyHand(their, desiredOutcome)
      const outcome = play(their, mine)
      const myPlay = myHand[mine]
      newGames.push({
        their,
        mine,
        outcome,
        score: outcome + myPlay
      })
    })
    setGames2(newGames)
    setFinalScore2(newGames.reduce((a,b) => a + b.score, 0))
    console.log('part 2', newGames)

  }

  return (
    <Container>
      <Row>
        <Col><h1>Day 2: Rock Paper Scissors</h1></Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Puzzle Input</Form.Label>
          <Form.Control as="textarea" rows={10} value={input} onChange={e => setInput(e.target.value)} />
        </Col>
        <Col>
          <Stack gap={3} className="col-md-8 mx-auto">
            <Button variant="primary" onClick={getPart1}>Solve Part 1</Button>
            <Button variant="primary" onClick={getPart2}>Solve Part 2</Button>
          </Stack>
        </Col>
        <Col>
        { games.length > 0 && <>
          Part 1
          <Stack gap={3} className="col-md-8 mx-auto">
            <Badge bg="secondary">Games Played: {games.length}</Badge>
            <Badge bg="secondary">Games Won: {games.reduce((a,b) => { return b.outcome === 6 ? a += 1 : a }, 0)}</Badge>
            <Badge bg="secondary">Games Drawn: {games.reduce((a,b) => { return b.outcome === 3 ? a += 1 : a }, 0)}</Badge>
            <Badge bg="secondary">Games Lost: {games.reduce((a,b) => { return b.outcome === 0 ? a += 1 : a }, 0)}</Badge>
            <Badge bg="success">Final Score: {finalScore}</Badge>
          </Stack>
          </>}
          <hr />
        { games2.length > 0 && <>
          Part 2
          <Stack gap={3} className="col-md-8 mx-auto">
            <Badge bg="secondary">Games Played: {games2.length}</Badge>
            <Badge bg="secondary">Games Won: {games2.reduce((a,b) => { return b.outcome === 6 ? a += 1 : a }, 0)}</Badge>
            <Badge bg="secondary">Games Drawn: {games2.reduce((a,b) => { return b.outcome === 3 ? a += 1 : a }, 0)}</Badge>
            <Badge bg="secondary">Games Lost: {games2.reduce((a,b) => { return b.outcome === 0 ? a += 1 : a }, 0)}</Badge>
            <Badge bg="success">Final Score: {finalScore2}</Badge>
          </Stack>
          </>}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
