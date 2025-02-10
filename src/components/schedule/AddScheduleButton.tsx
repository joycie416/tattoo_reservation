import React from 'react'

type AddScheduleButtonProps = {onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;}

const AddScheduleButton = ({onClick}: AddScheduleButtonProps) => {
  return (
    <button className='mx-auto p-4 rounded-xl text-white bg-blue-500' onClick={onClick}>예약 가능 일정 추가</button>
  )
}

export default AddScheduleButton