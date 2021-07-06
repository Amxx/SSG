import * as React from 'react'

import {
  Button,
  Row,
  InputGroup,
  FormControl,
} from 'react-bootstrap'

const CHAINS = {
  'mainnet':          'mainnet',
  'ropsten':          'ropsten',
  'rinkeby':          'rinkeby',
  'goerli':           'goerli',
  'kovan':            'kovan',
  'bsc':              'https://bsc-dataseed.binance.org/',
  'bsc-testnet':      'https://data-seed-prebsc-1-s1.binance.org:8545/',
  'xdai':             'https://dai.poa.network',
  'polygon':          'https://rpc-mainnet.maticvigil.com/',
  'arbitrum-testnet': 'https://rinkeby.arbitrum.io/rpc',
}

const DEFAULT_ENPOINT = 'http://localhost:8545'

const ChainForm = (props) => {
  const [ chain,    setProvider ] = React.useState(Object.keys(CHAINS).find(Boolean))
  const [ endpoint, setEndpoint ] = React.useState(DEFAULT_ENPOINT)

  const connect = () => {
    const path = encodeURIComponent(chain in CHAINS ? CHAINS[chain] : endpoint)
    props.routing.history.push(`/${path}`)
  }

  return (
    <>
      <InputGroup className='justify-content-md-center mb-3'>
        <FormControl as='select' onChange={event => setProvider(event.target.value)}>
          { Object.keys(CHAINS).map((chain, i) => <option key={i}>{chain}</option>) }
          <option key={CHAINS.length}>custom</option>) }
        </FormControl>
      </InputGroup>
      {
        chain === "custom" &&
          <InputGroup className='justify-content-md-center mb-3'>
            <FormControl placeholder='Endpoint' value={endpoint} onChange={event => setEndpoint(event.target.value)}/>
          </InputGroup>
      }
      <Row className="justify-content-md-center">
        <Button variant="outline-secondary" onClick={connect}>
          Connect
        </Button>
      </Row>
    </>
  )
}

export default ChainForm
