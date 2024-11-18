import React from 'react'
import Visualization from '../components/Visualization'
import Table from '../components/Table'
import Player from '../components/Player'

const Summary = () => {
  return (
    <div className='w-full max-w-[1200px] py-2 mx-auto'>
      <Player/>
      <Visualization/>
      <Table/>
    </div>
  )
}

export default Summary
