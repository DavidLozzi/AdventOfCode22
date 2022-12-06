import { useState } from 'react'
import { PrimaryButton } from '@fluentui/react/lib/Button'
import { TextField } from '@fluentui/react/lib/TextField'
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar'

function App() {
  const [input, setInput] = useState('mjqjpqmgbljsphdztnvjfqwrcgsmlb')
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')

  const solvePart1 = () => {
    const packets = input.split('')
    const marker = []
    packets.some((p, i) => {
      if(marker.indexOf(p) > -1) {
        do {
          marker.shift()
        } while (marker.indexOf(p) > -1)
      }
      marker.push(p)
      if(marker.length === 4) {
        console.log('done', i+1, marker)
        setAnswer1(`Part 1 Answer: ${i+1}, with marker ${marker.join('')}`)
        return true
      }
      return false
    })
  }
  const solvePart2 = () => {
    const packets = input.split('')
    const marker = []
    packets.some((p, i) => {
      if(marker.indexOf(p) > -1) {
        do {
          marker.shift()
        } while (marker.indexOf(p) > -1)
      }
      marker.push(p)
      if(marker.length === 14) {
        console.log('done', i+1, marker)
        setAnswer2(`Part 2 Answer: ${i+1}, with marker ${marker.join('')}`)
        return true
      }
      return false
    })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'><h1>Day 6: Tuning Trouble</h1></div>
      </div>
      <div className='row'>
        <div className='col'><TextField label="Puzzle Input" multiline rows={10} value={input} onChange={e => setInput(e.target.value)} /></div>
        <div className='col'>
          <PrimaryButton onClick={solvePart1}>Solve Part 1</PrimaryButton>
          <PrimaryButton onClick={solvePart2}>Solve Part 2</PrimaryButton>
        </div>
        <div className='col'>
          <div>
            {answer1 && <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>{answer1}</MessageBar>}
            {answer2 && <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>{answer2}</MessageBar>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
