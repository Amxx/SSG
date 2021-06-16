import * as React from 'react'

import {
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'

const AddressForm = (props) => {
  const [ address, setAddress ] = React.useState(props.routing.match.params.address ?? '')

  const lookup = () => {
    props.provider.resolveName(address)
      .then(() => props.routing.history.push(`/${props.routing.match.params.chain}/${address}`))
      .catch(() => {})
  }

  return (
    <InputGroup className={props.className}>
      <FormControl placeholder="Address" value={address} onChange={event => setAddress(event.target.value)} />
      <Button variant="outline-secondary" onClick={lookup}>
        Lookup
      </Button>
    </InputGroup>
  )
}

export default AddressForm
