// components/Orders/RecentOrders.tsx
// need to integrate the Order status component once available

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Order } from '@components/DashBoard/types'
import { Button } from '@/components/ui/button'

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch('/api/orders')
      .then((response) => response.json())
      .then((data: Order[]) => {
        setOrders(data)
      })
      .catch((error) => console.error('Error fetching orders', error))
  }, [])

  const handleCancelOrder = (orderNumber: string) => {
    // Implement cancel order logic here
    console.log(`Cancel Order ${orderNumber}`)
  }

  const recentOrders = orders.slice(0, 3)
  if (recentOrders.length === 0) {
    return null
  }

  return (
    <div className="recent-orders-container mt-14 flex flex-col items-start p-5">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="recent-order-header">
          <h2 className="mb-2 text-xl font-bold">Recent Orders</h2>
        </div>
        <div>
          <Link href="/orders">
            <Button variant="secondary">View More</Button>
          </Link>
        </div>
      </div>

      <div className="recent-orders-list flex flex-wrap">
        {recentOrders.map((order) => (
          <div
            key={order.order_number}
            className="order-box mb-4 mr-4 flex-shrink-0 overflow-hidden rounded-lg border"
          >
            <div className="rounded-xl bg-white p-4">
              <p className="mb-2 text-xl font-bold">
                Order #{order.order_number}
              </p>

              <div className="order-buttons mt-2">
                <Button
                  variant="secondary"
                  onClick={() => handleCancelOrder(order.order_number)}
                  style={{
                    opacity:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? '0.7'
                        : '1',
                    cursor:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  disabled={
                    order.status === 'Cancelled' || order.status === 'Delivered'
                  }
                >
                  Cancel Order
                </Button>
                <Link href={`/orders/${order._id}`}>
                  <Button className="ml-2">Manage Order</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentOrders
