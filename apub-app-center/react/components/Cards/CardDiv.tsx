import React from 'react'

const CardDiv = (props: any) => {
  return (
    <div className='w-100 flex flex-wrap bg-white ba br2 b--muted-4 pa6 card-hover pa6 h-100 flex flex-column justify-between'>
      {props.children}
    </div>
  )
}

export default CardDiv
