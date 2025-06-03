import React from 'react'
import Image from 'next/image'
import { GraphState } from './playground/Playground'

const Logo = ({ setGraphState }: { setGraphState: (graphState: GraphState | null) => void }) => {
  return (
    <div className='fixed hover:cursor-pointer top-4 left-4 z-50' onClick={() => setGraphState(null)}>
      <Image src='Amazon_icon.svg.svg' alt='SmartVisData' width={120} height={40} priority />
    </div>
  )
}

export default Logo
