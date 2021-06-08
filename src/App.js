import * as React from 'react'
import { ethers } from 'ethers'
import {
  Container,
  Card,
  Table,
  Form,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

const CHAINS = [
  'mainnet',
  'ropsten',
  'rinkeby',
  'goerli',
  'kovan',
  'http://localhost:8545'
]

const SLOTS = [
  { slot: '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc', name: 'ERC1967 Implementation' },
  { slot: '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103', name: 'ERC1967 Admin'          },
  { slot: '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50', name: 'ERC1967 Beacon'         },
]

const FORMAT = [
  { name: 'Bytes32', conversion: x => x },
  { name: 'Address', conversion: x => ethers.utils.getAddress(x.substring(26)) },
  { name: 'Uint256', conversion: x => ethers.BigNumber.from(x).toString() },
]

export default (props) => {
  const [ chain,    setChain    ] = React.useState(CHAINS.find(Boolean))
  const [ provider, setProvider ] = React.useState()
  const [ address,  setAddress  ] = React.useState('')
  const [ slot,     setSlot     ] = React.useState('')
  const [ value,    setValue    ] = React.useState()

  React.useEffect(() => {
    try {
      setProvider(ethers.getDefaultProvider(chain))
    } catch {
      setProvider(null)
    }
  }, [chain])

  React.useEffect(() => {
    if (provider && ethers.utils.isAddress(address) && ethers.utils.isHexString(slot)) {
      provider.getStorageAt(address, slot)
        .then(setValue)
        .catch(() => setValue(null))
    }
  }, [provider, address, slot])

  return (
    <Container>
      <Card className='m-3'>
        <Card.Header as='h5'>Parameters</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control as='select' onChange={event => setChain(event.target.value)}>
                { CHAINS.map((chain, i) => <option key={i} value={chain}>{chain}</option>) }
              </Form.Control>
            </Form.Group>
            <InputGroup className='mb-3'>
              <FormControl placeholder='Address' value={address} onChange={event => setAddress(event.target.value)}/>
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl placeholder='Slot' value={slot} onChange={event => setSlot(event.target.value)}/>
              <DropdownButton title='Common slots' variant='outline-secondary' align='end'>
                { SLOTS.map(({ slot, name }, i) => <Dropdown.Item key={i} onClick={() => setSlot(slot)}>{name}</Dropdown.Item>) }
              </DropdownButton>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
      {
        value &&
        <Card className='m-3' bg='dark' text='light'>
          <Card.Header as='h5'>Value</Card.Header>
          <Card.Body>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>Format</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                { FORMAT.map(({ name, conversion }, i) => <tr key={i}><td>{name}</td><td>{conversion(value)}</td></tr>) }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      }
    </Container>
  )
}
