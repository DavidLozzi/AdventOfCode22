import { useState } from "react";

function App() {
  const [input, setInput] = useState(`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`)
  const [answer1, setAnswer1] = useState()
  const [answer2, setAnswer2] = useState([])

  const solvePart1 = () => {
    const instructions = input.split('\n')
    const cycles = [{ x: 1}]
    instructions.forEach(inst => {
      const [cmd, size] = inst.trim().split(' ')
      const lastCycle = cycles[cycles.length-1]
      switch (cmd) {
        case 'addx':
          cycles.push({ x: lastCycle.x })
          cycles.push({ x: lastCycle.x + Number(size)})
          break;
        case 'noop':
          cycles.push({ x: lastCycle.x })
          break;
        default:
          console.error('no cmd', inst)
          break;
      }
    })
    let signal = cycles[19].x * 20
    for (let i = 59; i < cycles.length; i += 40) {
      signal += cycles[i].x * (i+1)
    }
    setAnswer1(signal)
  }

  const containsPixel = (cycle, crtNum) => {
    if (crtNum >= cycle - 1 && crtNum <= cycle + 1) {
      return true
    }
    return false
  }
  const solvePart2 = () => {
    const instructions = input.split('\n')
    const cycles = [{ x: 1 }]
    const crt = []
    let crtCnt = 0
    let lastCycle = cycles[0]
    instructions.forEach((inst, cycleNum) => {
      const [cmd, size] = inst.trim().split(' ')
      if (crt.length % 40 === 0) {
        crtCnt = 0
        debugger
      }

      switch (cmd) {
        case 'addx':
          // first cycle
          if (containsPixel(lastCycle.x, crtCnt)) {
            crt.push('#')
          } else {
            crt.push('.')
          }
          crtCnt++
          if (crt.length % 40 === 0) {
            crtCnt = 0
            debugger
          }
          cycles.push({ x: lastCycle.x })
          //second cycle
          if (containsPixel(lastCycle.x, crtCnt)) {
            crt.push('#')
          } else {
            crt.push('.')
          }
          crtCnt++
          cycles.push({ x: lastCycle.x + Number(size)})
          break;
        case 'noop':
          if (containsPixel(lastCycle.x, crtCnt)) {
            crt.push('#')
          } else {
            crt.push('.')
          }
          crtCnt++
          cycles.push({ x: lastCycle.x })
          break;
        default:
          console.error('no cmd', inst)
          break;
      }
      lastCycle = cycles[cycles.length - 1]
      console.log(crt)
    })

    console.log(crt)
    setAnswer2(crt)
  }
  
  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Day 10: Cathode-Ray Tube</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div>
            Puzzle input<br />
            <textarea rows={10} value={input} onChange={e => setInput(e.target.value)} />
          </div>
        </div>
        <div className="col">
          <div>
            <button onClick={solvePart1}>Solve Part 1</button>
            <button onClick={solvePart2}>Solve Part 2</button>
          </div>
        </div>
        <div className="col">
          <div>
            {answer1 && <div>{answer1}</div>}
          </div>
        </div>
      </div>
      {answer2.length > 0 && <div className="row">
        <div className="col">
          <div>
          <h2>Part 2 Answer</h2>
          <code>
            {/* {answer2.map((row, i) => <div key={i}>{row.map(c => c)}</div>)} */}
              {answer2.map((row, i) => <span key={i} style={{backgroundColor: row === '#' ? '#f22' : '#000'}}>{row}{(i+1) % 40 === 0 ? <br /> : null}</span>)}
            </code>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
