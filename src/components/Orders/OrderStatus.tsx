//src/components/Orders/OrderStatus.tsx


import React, { useState } from 'react'
import OrderStatusNodes from '@components/Orders/OrderStatus'

const OrderStatus: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState('Order Placed')
  const [isCancelled, setIsCancelled] = useState(false)

  const handleCancelOrder = () => {
    // Logic for cancelling the order
    setIsCancelled(true)
  }

  const handleBackClick = () => {
    // Logic for going back to recent orders
    setIsCancelled(false)
  }

  return (
    <div style={{ padding: '20px' }}>
      <button style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Manage Order
      </button>
      <h1>Order Status Page</h1>
      <OrderStatusNodes
        orderStatus={orderStatus}
        isCancelled={isCancelled}
        onBackClick={handleBackClick}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  )
}

export default OrderStatus
