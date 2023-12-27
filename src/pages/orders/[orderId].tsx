//Should include PUT Method 
// should do a call to the api to get the info -(when the order was placed , status based you must adjust ) on the individual order
//getting the order front the rout itself - because this is a dynamic rout.
//Need to import the componeents into this page.
// creating individual componeents 
//For example the button can be used in many locations
//Remove all Apis
//src/components/Orders/OrderStatus.tsx

import React, { useState } from 'react'
import OrderStatusNodes from '@components/Orders/OrderStatusNodes'

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
