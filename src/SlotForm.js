import * as React from 'react'

import {
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'

import SlotViewer from './SlotViewer'

const SLOTS = [
  { slot: '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc', name: 'ERC1967 Implementation' },
  { slot: '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103', name: 'ERC1967 Admin'          },
  { slot: '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50', name: 'ERC1967 Beacon'         },
]

const SlotForm = (props) => {
  const [ slot,  setSlot  ] = React.useState('')
  const [ value, setValue ] = React.useState(null)

  React.useEffect(() => {
    props.provider.getStorageAt(props.address, slot).then(setValue).catch(() => setValue(null))
  }, [ props.provider, props.address, slot ])

  return (
    <>
      <hr/>
      Read slot:
      <InputGroup className={props.className}>
        <FormControl placeholder="Slot" value={slot} onChange={event => setSlot(event.target.value)} />
        <DropdownButton title='Common slots' variant='outline-secondary' align='end'>
          { SLOTS.map(({ slot, name }, i) => <Dropdown.Item key={i} onClick={() => setSlot(slot)}>{name}</Dropdown.Item>) }
        </DropdownButton>
      </InputGroup>
      {
        value &&
        <>
          Value:
          <SlotViewer value={value}/>
        </>
      }
    </>
  )
}

export default SlotForm
