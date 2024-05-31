import { useEffect, useState } from 'react'

function App() {
  const [input, setInput] = useState(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`)
  // 8654 too high
  const [answer1, setAnswer1] = useState()

  const flatArray = (arr, depth) => {
    depth++
    let newArr = arr.flat()
    if (newArr.some(a => typeof a === 'object')) {
      newArr = newArr.map(a => {
        if (typeof a === 'object') {
          return flatArray(a)
        }
        return a
      })
    }
    return [newArr.flat(), depth]
  }

  const getValue = (arr, index) => {
    if (arr?.length > 0) {
      if (typeof arr[index] === 'object') {
        return getValue(arr[index], 0)
      } else {
        return arr[index]
      }
    }
    return null
  }

  const isRightOrder = (leftVal, rightVal) => {
    let match = 0
    if (rightVal) {
      if (leftVal < rightVal) {
        match = 1
      } else if (leftVal > rightVal) {
        match = 2
      }
    }
    return match
  }

  const processArr = (leftArr, rightArr) => {
    let match = 0
    for (let lIndex = 0; lIndex < leftArr.length; lIndex++) {
      let leftVal = leftArr[lIndex]
      if (typeof leftVal === 'object') {
        leftVal = getValue(leftVal, 0)
      }
      let rightVal = rightArr[lIndex] || null
      if (rightVal && typeof rightVal === 'object') {
        rightVal = getValue(rightVal, 0)
      }

      match = isRightOrder(leftVal, rightVal)
      if (match === 1) {
        break;
      }
    }
    return match
  }

  const solvePart1 = () => {
    const pairs = input.split('\n\n')
    const matching = []
    pairs.forEach((pair, index) => {
      // if(index === 6) debugger
      try {
        const [leftObj, rightObj] = pair.split('\n').map(p => flatArray(JSON.parse(p), 0))
        const [leftArr, leftDepth] = leftObj
        const [rightArr, rightDepth] = rightObj
        console.log(index + 1, leftArr, rightArr)

        let match = 0 // only 1 === match
        let subArrCnt = 0
        match = processArr(leftArr, rightArr)

        if (match === 0) {
          if (leftArr.length === 0 || leftArr.length < rightArr.length) {
            match = 1
          } else {

          }
        }
      
        if (match === 1) {
          matching.push({ pair: pair, originalIndex: index + 1 })
        }
      } catch (e) {
        console.error(e, pair, index)
      }
    })
    console.log('matches:', matching.map(m => ({ ...m, originalIndex: m.originalIndex })))
    console.log(matching.reduce((a,b) => a + b.originalIndex, 0))
  }

  useEffect(() => {
    solvePart1()
  }, [])

  return (
    <>Day 13</>
  );
}

export default App;
