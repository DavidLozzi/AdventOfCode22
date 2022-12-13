import { useState } from 'react';
import { Container, Header, Content, FlexboxGrid, Button, Input, Tag, TagGroup } from 'rsuite'

function App() {
  const [input, setInput] = useState(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)
  const [answer1, setAnswer1] = useState()
  const [visual, setVisual] = useState([])
  const [offset, setOffset] = useState()
  const [answer2, setAnswer2] = useState()
  const [visual2, setVisual2] = useState([])
  
  const isTailNearHead = (head, tail) => {
    const xDiff = head.x - tail.x
    const yDiff = head.y - tail.y
    if (xDiff >= -1 && xDiff <= 1 && yDiff >= -1 && yDiff <= 1) {
      return true
    }
    return false
  }

  const solvePart1 = () => {
    const steps = input.split('\n').map(s => ({ direction: s.substring(0, 1), distance: Number(s.substring(2))}))
    console.log(steps)
    const head = { x: 0, y: 0 }
    const tail = { x: 0, y: 0 }
    const trail = new Map()
    trail.set(JSON.stringify(tail))
    steps.forEach((step) => {
      switch (step.direction) {
        case 'U':
          for (let i = 0; i < step.distance; i++) {
            head.y++
            if (!isTailNearHead(head, tail)) {
              tail.y++
              tail.x = head.x
              trail.set(JSON.stringify(tail))
            }
          }
          break
        case 'D':
          for (let i = 0; i < step.distance; i++) {
            head.y--
            if (!isTailNearHead(head, tail)) {
              tail.y--
              tail.x = head.x
              trail.set(JSON.stringify(tail))
            }
          }
          break
        case 'L':
          for (let i = 0; i < step.distance; i++) {
            head.x--
            if (!isTailNearHead(head, tail)) {
              tail.x--
              tail.y = head.y
              trail.set(JSON.stringify(tail))
            }
          }
          break
        case 'R':
          for (let i = 0; i < step.distance; i++) {
            head.x++
            if (!isTailNearHead(head, tail)) {
              tail.x++
              tail.y = head.y
              trail.set(JSON.stringify(tail))
            }
          }
          break
        default:
          console.error('no direction')
          break
      }
    })
    setAnswer1(trail.size)
    const _visual = []
    trail.forEach((val, key) => _visual.push(JSON.parse(key)))
    const lowX = _visual.sort((a,b) => a.x > b.x ? 1 : -1)[0].x
    const highX = _visual.sort((a,b) => a.x < b.x ? 1 : -1)[0].x
    const lowY = _visual.sort((a,b) => a.y > b.y ? 1 : -1)[0].y
    const highY = _visual.sort((a, b) => a.y < b.y ? 1 : -1)[0].y
    setOffset({ x: lowX, y: lowY})
    setVisual(_visual)
  }

  const moveRight = (knot) => {

  }
  const solvePart2 = () => {
    // I leveraged the code from https://github.com/mariom100o/Advent-of-Code-Solutions to find my answer, I did not update my code here
    const steps = input.split('\n').map(s => ({ direction: s.substring(0, 1), distance: Number(s.substring(2))}))
    const head = { x: 0, y: 0 }
    const tails = []
    for (let i = 0; i < 10; i++) {
      tails.push({ x: 0, y: 0 })
    }
    const trail = new Map()
    trail.set(JSON.stringify(tails[9]))
    steps.forEach((step) => {
      let lastMove = step.direction
      switch (step.direction) {
        case 'U':
          for (let a = 0; a < step.distance; a++) {
            head.y++
            let prevTail = head
            for (let i = 0; i < tails.length; i++) {
              if (!isTailNearHead(prevTail, tails[i])) {
                if (lastMove === 'U') {
                  tails[i].y++
                  const xDiff = tails[i].x - prevTail.x
                  if (xDiff < -1) {
                    tails[i].x = tails[i].x + 1
                    lastMove = 'R'
                  }
                  if (xDiff > 1) {
                    tails[i].x = tails[i].x - 1
                    lastMove = 'L'
                  }
                } else if (lastMove === 'R') {
                  tails[i].x++
                }
              }
              prevTail = tails[i]
            }
            trail.set(JSON.stringify(tails[9]))
          }
          break
        case 'D':
          for (let a = 0; a < step.distance; a++) {
            head.y--
            let prevTail = head
            for (let i = 0; i < tails.length; i++) {
              if (!isTailNearHead(prevTail, tails[i])) {
                tails[i].y--
                const xDiff = tails[i].x - prevTail.x
                if(xDiff < -1) {
                  tails[i].x = tails[i].x + 1
                }
                if(xDiff > 1) {
                  tails[i].x = tails[i].x - 1
                }
              }
              prevTail = tails[i]
            }
            trail.set(JSON.stringify(tails[9]))
          }
          break
        case 'L':
          for (let a = 0; a < step.distance; a++) {
            head.x--
            let prevTail = head
            for (let i = 0; i < tails.length; i++) {
              if (!isTailNearHead(prevTail, tails[i])) {
                tails[i].x--
                const yDiff = tails[i].y - prevTail.y
                if(yDiff < -1) {
                  tails[i].y = tails[i].y + 1
                }
                if(yDiff > 1) {
                  tails[i].y = tails[i].y - 1
                }
              }
              prevTail = tails[i]
            }
            trail.set(JSON.stringify(tails[9]))
          }
          break
        case 'R':
          for (let a = 0; a < step.distance; a++) {
            head.x++
            let prevTail = head
            for (let i = 0; i < tails.length; i++) {
              if (!isTailNearHead(prevTail, tails[i])) {
                tails[i].x++
                const yDiff = tails[i].y - prevTail.y
                if(yDiff < -1) {
                  tails[i].y = tails[i].y + 1
                }
                if(yDiff > 1) {
                  tails[i].y = tails[i].y - 1
                }
              }
              prevTail = tails[i]
            }
            trail.set(JSON.stringify(tails[9]))
          }
          break
        default:
          console.error('no direction')
          break
      }
      console.log(step, JSON.stringify(tails[9]))
    })
    setAnswer2(trail.size)
    const _visual = []
    trail.forEach((val, key) => _visual.push(JSON.parse(key)))
    setVisual2(tails)
  }

  // 8710 too high
  return (
    <Container>
      <Header>
        <h1>Day 9: Rope Bridge</h1>
      </Header>
      <Content>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={8}>
            Puzzle Input
            <Input as="textarea" rows={10} value={input} onChange={value => setInput(value)} />
            <div>
              {visual.length && <div style={{ fontFamily: 'courier', position: 'absolute'}}>
                {visual.map(step => <div key={`${step.x}-${step.y}`} style={{ backgroundColor: '#0b0', width: '5px', height: '5px', position: 'absolute', top: (step.y-offset.y)*5, left: (step.x-offset.x)*5}} title={`${step.x},${step.y}`}></div>)}
                {visual2.map(step => <div key={`${step.x}-${step.y}`} style={{ backgroundColor: '#b00', width: '15px', height: '15px', position: 'absolute', top: (step.y-offset.y)*15, left: (step.x-offset.x)*15}} title={`${step.x},${step.y}`}></div>)}
              
              </div>}
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <Button appearance="primary" onClick={solvePart1}>Solve Part 1</Button>
            <Button appearance="primary" onClick={solvePart2}>Solve Part 2</Button>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={8}>
            <TagGroup>
              {answer1 && <Tag color="green">Part 1: {answer1} positions</Tag>}
              {answer2 && <Tag color="red">Part 2: {answer2} positions</Tag>}
            </TagGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}

export default App;
