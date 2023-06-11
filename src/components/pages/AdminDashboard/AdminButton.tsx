import React, { useState } from 'react'
import { useAdminView } from '../../store/adminStore/useAdminView'

interface ButtonProps {
  buttonClick: () => void
}

const AdminButton = ({ buttonClick} : ButtonProps) => {
  const { toAdmin } = useAdminView()
  return (
    <button className="admin-button-main" onClick={buttonClick}>
      {!toAdmin ? "Go to Admin Dashboard" : "Back to Main Page" }
    </button>
  )
}

export default AdminButton