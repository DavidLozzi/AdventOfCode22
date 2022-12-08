import { Box, Button, Grid, Heading, Tag, TextArea } from 'grommet'
import { useState } from 'react';

function App() {
  const [input, setInput] = useState(`30373
25512
65332
33549
35390`)
  const [answer1, setAnswer1] = useState()
  const [answer2, setAnswer2] = useState()
  const [taggedTrees, setTaggedTrees] = useState([])

  const solvePart1 = () => {
    const trees = input.split('\n').map(r => r.split(''))
    const visible = []
    trees.forEach((treeRow, rowIndex) => {
      const taggedRow = []
      treeRow.some((treeVal, colIndex) => {
        const tree = Number(treeVal)
        const treeObj = { tree, row: rowIndex, col: colIndex }
        
        if (rowIndex === 0 || colIndex === 0 || rowIndex === treeRow.length - 1 || colIndex === treeRow.length - 1) {
          taggedRow.push({...treeObj, visible: true})
          return false;
        }
        // check up
        let visibleUp = true
        for (let r = rowIndex - 1; r >= 0; r--) {
          if (trees[r][colIndex] >= tree) {
            visibleUp = false
            break
          }
        }
        // check down
        let visibleDown = true
        for (let r = rowIndex + 1; r < trees.length; r++) {
          if (trees[r][colIndex] >= tree) {
            visibleDown = false
            break
          }
        }
        // check left
        let visibleLeft = true
        for (let c = colIndex - 1; c >= 0; c--) {
          if (trees[rowIndex][c] >= tree) {
            visibleLeft = false
            break
          }
        }
        // check right
        let visibleRight = true
        for (let c = colIndex + 1; c < treeRow.length; c++) {
          if (trees[rowIndex][c] >= tree) {
            visibleRight = false
            break
          }
        }
        taggedRow.push({ ...treeObj, visible: visibleUp || visibleDown || visibleLeft || visibleRight })
        return false
      })
      visible.push(taggedRow)
    })
    setAnswer1(visible.reduce((a,b) => a + b.filter(t => t.visible).length, 0))
    setTaggedTrees(visible)
    console.log(visible)
  }

  const solvePart2 = () => {
    const visible = []
    const views = []
    taggedTrees.forEach((treeRow, rowIndex) => {
      const taggedRow = []
      treeRow.some((treeObj, colIndex) => {
        if (rowIndex === 0 || colIndex === 0 || rowIndex === treeRow.length - 1 || colIndex === treeRow.length - 1) {
          taggedRow.push({...treeObj, view: 0})
          return false;
        }
        // if(rowIndex === 3 && colIndex === 2) debugger
        // check up
        let viewUp = 0
        for (let r = rowIndex - 1; r >= 0; r--) {
          if (taggedTrees[r][colIndex].tree < treeObj.tree) {
            viewUp++
          } else {
            if (taggedTrees[r][colIndex].tree >= treeObj.tree) {
              viewUp++
            }
            break;
          }
        }
        // check down
        let viewDown = 0
        for (let r = rowIndex + 1; r < taggedTrees.length; r++) {
          if (taggedTrees[r][colIndex].tree < treeObj.tree) {
            viewDown++
          } else {
            if (taggedTrees[r][colIndex].tree >= treeObj.tree) {
              viewDown++
            }
            break
          }
        }
        // check left
        let viewLeft = 0
        for (let c = colIndex - 1; c >= 0; c--) {
          if (taggedTrees[rowIndex][c].tree < treeObj.tree) {
            viewLeft++
          } else {
            if (taggedTrees[rowIndex][c].tree >= treeObj.tree) {
              viewLeft++
            }
            break
          }
        }
        // check right
        let viewRight = 0
        for (let c = colIndex + 1; c < treeRow.length; c++) {
          if (taggedTrees[rowIndex][c].tree < treeObj.tree) {
            viewRight++
          } else {
            if (taggedTrees[rowIndex][c].tree >= treeObj.tree) {
              viewRight++
            }
            break
          }
        }
        const view = viewUp * viewDown * viewLeft * viewRight
        taggedRow.push({ ...treeObj, view, viewVals: { viewUp, viewDown, viewLeft, viewRight } })
        views.push(view)
        return false
      })
      visible.push(taggedRow)
    })
    const scenicWin = views.sort((a, b) => a < b ? 1 : -1)[0]
    setAnswer2(scenicWin)
    const scenicObj = visible.map(r => r.find(t => t.view === scenicWin)).filter(r => !!r)[0]

    visible[scenicObj.row][scenicObj.col].inView = true

    for (let i = scenicObj.row - 1; i >= scenicObj.row - scenicObj.viewVals.viewUp; i--) {
      visible[i][scenicObj.col].inView = true
    }
    for (let i = scenicObj.row + 1; i <= scenicObj.row + scenicObj.viewVals.viewDown; i++) {
      visible[i][scenicObj.col].inView = true
    }
    for (let i = scenicObj.col - 1; i >= scenicObj.col - scenicObj.viewVals.viewLeft; i--) {
      visible[scenicObj.row][i].inView = true
    }
    for (let i = scenicObj.col + 1; i <= scenicObj.col + scenicObj.viewVals.viewRight; i++) {
      visible[scenicObj.row][i].inView = true
    }

    setTaggedTrees(visible)
    console.log(visible)
  }

  return (
    <Grid
      rows={['xsmall', 'auto']}
      columns={['auto', 'auto', 'auto']}
      gap="small"
      areas={[
        { name: 'header', start: [0, 0], end: [2, 0] },
        { name: 'nav', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
        { name: 'output', start: [2, 1], end: [2, 1] },
      ]}
    >
      <Box gridArea="header" background="brand">
        <Heading>Day 8: Treetop Tree House</Heading>
      </Box>
      <Box gridArea="nav">
        Puzzle Input
        <TextArea value={input} onChange={e => setInput(e.target.value)} rows={10} />
        {taggedTrees && <div style={{fontFamily: 'courier new', fontSize: '18px', fontWeight: 'bold', padding: '20px'}}>
          {taggedTrees.map((treeRow, rindex) => <div>
            {treeRow.map((tree, cindex) => <span key={`${tree.tree}-${rindex}-${cindex}`} style={{ color: `${tree.visible ? '#0D0' : ''}`, backgroundColor: `${tree.inView ? '#090' : ''}` }}>{tree.tree}</span>)}
          </div>
          )}
        </div>}
      </Box>
      <Box gridArea="main">
        <Button primary label="Solve Part 1" onClick={solvePart1} />
        {answer1 && <Button primary label="Solve Part 2" onClick={solvePart2} />}
      </Box>
      <Box gridArea="output">
        {answer1 && <Tag name="Part 1" value={`${answer1} Visible Trees`} size="small" />}
        {answer2 && <Tag name="Part 2" value={`${answer2} Scenic Score`} size="small" />}
      </Box>
    </Grid>
  );
}

export default App;
