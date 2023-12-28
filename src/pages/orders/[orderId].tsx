import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { type Order } from '@components/DashBoard/types'

const OrderStatus: React.FC = () => {
  const router = useRouter()
  const { orderId } = router.query
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          console.log('orderId : ', orderId)
          const orderIdString = Array.isArray(orderId) ? orderId[0] : orderId
          const response = await fetch(`/api/orders/${orderIdString}`)
          console.log('response is :: ', response)
          if (response.ok) {
            console.log('response is ok')
            const data = (await response.json()) as Order
            setOrder(data)
          } else {
            console.error('Error fetching order details', response.statusText)
          }
        }
      } catch (error) {
        console.error('Error fetching order details', error)
      }
    }

    ;(async () => {
      await fetchOrderDetails()
    })().catch((error) => {
      console.error('Error in fetchOrderDetails:', error)
    })
  }, [orderId])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Order Page</h1>
      {order ? (
        <>
          <h2>Order Details</h2>
          <p>Order Number: {order.order_number}</p>
          <p>Item Name: {order.itemName}</p>
          <p>Quantity: {order.quantity}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default OrderStatus
