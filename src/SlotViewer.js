import * as React from 'react'
import { ethers } from 'ethers'

import {
  InputGroup,
  FormControl,
} from 'react-bootstrap'

const FORMAT = [
  { name: 'Bytes32', conversion: x => x },
  { name: 'Address', conversion: x => ethers.utils.getAddress(x.substring(26)) },
  { name: 'Uint256', conversion: x => ethers.BigNumber.from(x).toString() },
]

const SlotViewer = (props) => {
  const [ text,   setText   ] = React.useState('')
  const [ format, setFormat ] = React.useState(0)

  React.useEffect(() => {
    setText(FORMAT[format].conversion(props.value))
  }, [ props.value, format ])

  return (
    <>
      <InputGroup className={props.className}>
        <FormControl placeholder="Value" value={text} readOnly/>
        <FormControl as="select" onChange={event => setFormat(event.target.value)} style={{'flex': 0.15}}>
          { FORMAT.map(({ name }, i) => <option key={i} value={i}>{name}</option>) }
        </FormControl>
      </InputGroup>
    </>
  )
}

export default SlotViewer
