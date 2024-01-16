import React, { useEffect, useState } from 'react'
import OrderList from '@components/Orders/OrderList'
import axios from 'axios'
import { type Order, type PaginatedResponse } from '@components/DashBoard/types'
import { Button } from '@/components/ui/button'

interface OrdersProps {
  initialOrders: Order[]
}

const pageSize = 20
const Orders: React.FC<OrdersProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchOrders = async (page: number) => {
    try {
      const response = await axios.get<PaginatedResponse>(
        `/api/orders?page=${page}`
      )

      if (Array.isArray(response.data.paginatedOrders)) {
        setOrders(response.data.paginatedOrders)
        setCurrentPage(response.data.currentPage)

        setTotalPages(Math.ceil(response.data.totalOrders / pageSize))
      } else {
        console.error('Invalid data format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setLoading(true)

    fetchOrders(newPage)
      .then(() => setLoading(false))
      .catch((error) => console.error('Error fetching orders:', error))
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders(currentPage)
    }

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [currentPage])

  const canShowPagination = totalPages > 1

  return (
    <div className="min-h-screen bg-paleBlue p-16">
      <h1 className="mb-10 ml-3 bg-paleBlue text-3xl font-bold">
        Recent Orders
      </h1>
      <div className="overflow-hidden rounded-xl bg-white font-bold sm:flex-row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {orders.length > 0 ? (
              <OrderList orders={orders} />
            ) : (
              <p>No orders to display.</p>
            )}
            {canShowPagination && (
              <div className="pagination ml-10 p-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2"
                >
                  Previous
                </Button>
                <span className="mr-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mr-2"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Orders
