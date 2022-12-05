import { Button } from '@blueprintjs/core'
import { useState } from 'react';

function App() {
  const [input, setInput] = useState(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)
  const [answer1, setAnswer1] = useState([])
  const [answer2, setAnswer2] = useState([])
  const [visual, setVisual] = useState([])

  const containsIt = (first, second) => {
    const [firstStart, firstEnd] = first.split('-')
    const [secondStart, secondEnd] = second.split('-')

    if(Number(firstStart) <= Number(secondStart) && Number(firstEnd) >= Number(secondEnd)) {
      return true
    }
    return false
  } 

  const overlaps = (first, second) => {
    const [firstStart, firstEnd] = first.split('-')
    const [secondStart] = second.split('-')

    if(containsIt(first, second)) {
      return true
    }
    if(Number(firstStart) <= Number(secondStart) && Number(firstEnd) >= Number(secondStart)) {
      return true
    }
    return false
  } 

  const visualizePair = (pair) => {
    const [start, end] = pair.split('-')
    const row = []
    for(let i = 1; i < 100; i++) {
      if(i >= start && i <= end) {
        row.push(i)
      } else {
        row.push('.')
      }
    }
    return row.join('')
  }

  const solvePart1 = () => {
    const newPairs = []
    const newVisual = []
    input.split('\n').forEach(pair => {
      const [first, second] = pair.split(',')
      if(containsIt(first, second)){
        newPairs.push({first, second})
      } else if (containsIt(second, first)) {
        newPairs.push({first, second})
      } else {
        console.log('nope', pair)
      }
      newVisual.push(visualizePair(first))
      newVisual.push(visualizePair(second))
      newVisual.push('')
    })
    setAnswer1(newPairs)
    setVisual(newVisual)
  }


  const solvePart2 = () => {
    const newPairs = []
    input.split('\n').forEach(pair => {
      const [first, second] = pair.split(',')
      if(overlaps(first, second)){
        newPairs.push({first, second})
      } else if (overlaps(second, first)) {
        newPairs.push({first, second})
      } else {
        console.log('nope', pair)
      }
    })
    setAnswer2(newPairs)
  }
  return (
    <div className='container'>
      <h1 className="bp4-heading">Day 4: Camp Cleanup</h1>
      <div className="row">
        <div style={{borderRight: '1px solid #ccc'}} className='col'>
          Puzzle Input
          <textarea class='b4-input' rows="10" value={input} onChange={e => setInput(e.target.value)}></textarea>
        </div>
        <div style={{borderRight: '1px solid #ccc'}} className='col'>
          <Button intent='success' text='Solve Part 1' onClick={solvePart1}/>
          <Button intent='success' text='Solve Part 2' onClick={solvePart2}/>
        </div>
        <div className='col'>
          {answer1.length > 0 && <p>
            {answer1.length} pairs contain each other
          </p>}
          {answer2.length > 0 && <p>
            {answer2.length} pairs overlap
          </p>}
        </div>
      </div>
      <div className="row">
        <div name='col' style={{width: '100%'}}>
          <code>{visual.map((v, i) => <span key={`${v}-${i}`}>{v}<br/></span>)}</code>
        </div>
      </div>
    </div>
  );
}

export default App;
