import * as React from 'react'
import { ethers } from 'ethers'

import {
  Accordion,
  Container,
  Card,
} from 'react-bootstrap'

import AddressDetails from './AddressDetails'
import AddressForm    from './AddressForm'
import ChainForm      from './ChainForm'
import ChainDetails   from './ChainDetails'

const App = (props) => {
  const [ tab,      setTab      ] = React.useState()
  const [ provider, setProvider ] = React.useState()
  const [ address,  setAddress  ] = React.useState()

  React.useEffect(() => {
    if (props.routing.match.params.chain) {
      try {
        setProvider(ethers.getDefaultProvider(decodeURIComponent(props.routing.match.params.chain)))
      } catch {
        setProvider(null)
      }
    }
  }, [ props.routing.match.params.chain ])

  React.useEffect(() => {
    setAddress(props.routing.match.params.address)
  }, [ props.routing.match.params.address ])

  React.useEffect(() => {
    setTab(provider ? address ? 3 : 2 : 1)
  }, [provider, address])

  return (
    <Container className='my-5'>
      <Accordion activeKey={tab}>
        {
          true &&
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={1} onClick={() => setTab(1)}>Blockchain selection</Accordion.Toggle>
              <Accordion.Collapse eventKey={1}>
                <Card.Body>
                  <ChainForm {...props}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        }
        {
          provider &&
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={2} onClick={() => setTab(2)}>Blockchain details</Accordion.Toggle>
              <Accordion.Collapse eventKey={2}>
                <Card.Body>
                  <ChainDetails provider={provider} {...props}/>
                  <AddressForm provider={provider} {...props}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        }
        {
          provider && address &&
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={3} onClick={() => setTab(3)}>Address details</Accordion.Toggle>
              <Accordion.Collapse eventKey={3}>
                <Card.Body>
                  <AddressDetails provider={provider} address={address} {...props}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        }
      </Accordion>
    </Container>
  )
}

export default App
