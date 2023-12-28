// src/components/Orders/[id].tsx

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Order {
  orderId: string
  // Define other order properties here
}

const OrderDetailsPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Fetch order details based on orderId from your backend API
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`)
        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
        } else {
          console.error('Error fetching order details:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
      }
    }

    if (id) {
      fetchOrderDetails()
    }
  }, [id])

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
      })

      if (response.ok) {
        console.log('Order cancelled successfully')
        // Redirect to a confirmation page or handle as needed
      } else {
        console.error('Error cancelling order:', response.statusText)
      }
    } catch (error) {
      console.error('Error cancelling order:', error)
    }
  }

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.orderId}</p>
      {/* Display other order details here */}
      <button onClick={handleCancelOrder}>Cancel Order</button>
    </div>
  )
}

export default OrderDetailsPage
