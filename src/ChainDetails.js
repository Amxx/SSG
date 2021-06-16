import * as React from 'react'

import {
  Table,
} from 'react-bootstrap'

const ChainDetails = (props) => {
  const [ network,     setNetwork     ] = React.useState()
  const [ blockNumber, setBlockNumber ] = React.useState()

  React.useEffect(() => {
    props.provider.getNetwork().then(setNetwork).catch(() => setNetwork(null));
    props.provider.getBlockNumber().then(setBlockNumber).catch(() => setBlockNumber(null));
  }, [ props.provider ])

  return (
    <Table className={props.className}>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{network?.name}</td>
        </tr>
        <tr>
          <td>ChainId</td>
          <td>{network?.chainId}</td>
        </tr>
        <tr>
          <td>blockNumber</td>
          <td>{blockNumber}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ChainDetails
