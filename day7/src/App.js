import { useState } from 'react'
import { Typography, Layout, Row, Col, Input, Button, Badge, Space } from 'antd'

const { Title, Paragraph } = Typography
const { Header, Content } = Layout
const { TextArea } = Input

function App() {
  const [input, setInput] = useState(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)
  const [answer1, setAnswer1] = useState()
  const [answer2, setAnswer2] = useState()
  const [directoryStructure, setDirectoryStructure] = useState([])
  
  const getFolderSizes = (directory) => {
    const newDirectory = directory.map(dir => {
      if (dir.isFolder) {
        const size = directory.filter(d => d.path.indexOf(dir.path) === 0 && !d.isFolder).reduce((a, b) => a + b.size, 0)
        return {
          ...dir,
          size
        }
      } else {
        return dir
      }
    })
    return newDirectory
  }
  const getDirectoryStructure = () => {
    const lines = input.split('\n')
    let directory = [{ path: '', isFolder: true }]
    const root = ''
    let path = '/'
    let listFolder = ''
    lines.forEach(line => {
      const [first, second, third] = line.match(/(\S+)/g)     
      switch (first) {
        case '$': // its a command
          if (second === 'cd') {
            if (third === '/') {
              path = root
            } else if (third === '..') {
              path = path.substring(0, path.lastIndexOf('/'))
            } else {
              path = `${path}/${third}`
              directory.push({ path, isFolder: true })
            }
            console.log(path)
          }
          break;
        case 'dir':
          // listFolder = second
          break;
        case 'ls':
          listFolder = ''
          break;
        default: // is the file
          directory.push({path: `${path}/${listFolder}`, size: Number(first), fileName: second})
          break;
      }
    })

    directory = getFolderSizes(directory)
    return directory
  }


  const solvePart1 = () => {
    const directory = getDirectoryStructure()
    const folders = directory.filter(d => d.size < 100000 && d.isFolder)
    setDirectoryStructure(directory)
    setAnswer1(folders.reduce((a,b) => a + b.size, 0))
    console.log(directory, folders)
  }

  const totalSpace = 70000000
  const minimumSpaceAvail = 30000000
  const solvePart2 = () => {
    const sortedDirs = directoryStructure
      .filter(d => d.isFolder)
      .sort((a, b) => a.size > b.size ? 1 : -1)

    const spaceAvail = totalSpace - sortedDirs[sortedDirs.length - 1].size
    sortedDirs.some((dir, i) => {
      if (spaceAvail + dir.size >= minimumSpaceAvail) {
        console.log(dir.size)
        setAnswer2(dir.size)
        return true
      } else {
        return false
      }
    })
  }

  return (
    <Layout>
      <Content>
        <Row>
          <Col span={24}><Title level={1}>Day 7: No Space Left On Device</Title></Col>
        </Row>
        <Row>
          <Col span={8}>
            <TextArea rows={25} value={input} onChange={e => setInput(e.target.value)} style={{ fontFamily: 'courier' }} />
          </Col>
          <Col span={8}><Button type="primary" onClick={solvePart1}>Solve Part 1</Button>
            {answer1 && <Button type="primary" onClick={solvePart2}>Solve Part 2</Button>}</Col>
          <Col span={8}>
            {answer1 && <Space direction='vertical'>
                <Badge color='yellow' text={`${directoryStructure.filter(d => d.isFolder).length} Folders`} />
                <Badge color='yellow' text={`${directoryStructure.find(d => d.path === '').size} Total size`} />
              <Badge color='green' text={`Part 1 Answer: ${answer1} Total Size`} />
              {answer2 && <Badge color='green' text={`Part 2 Answer: ${answer2} Total Size`} />}
            </Space>}
            
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
