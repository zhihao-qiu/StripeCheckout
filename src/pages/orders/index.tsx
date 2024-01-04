import React, { useEffect, useState } from 'react'
import OrderList from '@components/Orders/OrderList'
import axios from 'axios'
import { type Order } from '@components/DashBoard/types'

interface OrdersProps {
  initialOrders: Order[]
}

const Orders: React.FC<OrdersProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await axios.get<{ data: Order[] }>('/api/orders')

      if (Array.isArray(response.data)) {
        setOrders(response.data)
      } else {
        console.error('Invalid data format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders()
    }

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  return (
    <div className="min-h-screen bg-paleBlue p-16">
      <h1 className="mb-10 ml-3 bg-paleBlue text-3xl font-bold">
        Recent Orders
      </h1>
      <div className="overflow-hidden rounded-xl bg-white font-bold sm:flex-row">
        {loading ? <p>Loading...</p> : <OrderList orders={orders} />}
      </div>
    </div>
  )
}

export default Orders
