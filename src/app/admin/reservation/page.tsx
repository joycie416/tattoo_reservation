import { getUser } from '@/api/auth-api';
import { redirect } from 'next/navigation';
import React from 'react'

const ReservationPage = async () => {
  const user = getUser();

  if (!user) {
    redirect('/admin/login')
  }
  
  return (
    <div>ReservationPage</div>
  )
}

export default ReservationPage