import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Order } from '@components/DashBoard/types'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@components/Orders/ConfirmationDialog'
import { useRouter } from 'next/router'

interface ApiResponse {
  paginatedOrders: Order[]
  currentPage: number
  totalPages: number
  totalOrders: number
}

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const router = useRouter()

  const fetchRecentOrders: (page: number) => Promise<void> = async (page) => {
    try {
      const response = await fetch(`/api/orders?page=${page}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`)
      }

      const responseData = (await response.json()) as ApiResponse

      setOrders(responseData.paginatedOrders)
      setCurrentPage(responseData.currentPage)
      setTotalPages(responseData.totalPages)
    } catch (error) {
      console.error('Error fetching recent orders:', error)
      throw error
    }
  }

  useEffect(() => {
    const fetchData = () => {
      fetchRecentOrders(currentPage).catch((error) => {
        console.error('Error fetching recent orders:', error)
      })
    }

    fetchData()
  }, [currentPage])

  const handleCancelOrder = (id: string, order_number: string) => {
    setSelectedOrder({ id, order_number } as Order)
  }

  const confirmCancellation = () => {
    if (selectedOrder) {
      console.log(
        `Cancel Order ${selectedOrder.order_number} (${selectedOrder.id})`
      )

      router
        .replace('/dashboard')
        .then(() => {
          setSelectedOrder(null)
        })
        .catch((error) => {
          console.error('Error navigating to dashboard:', error)
        })
    }
  }

  const cancelCancellation = () => {
    setSelectedOrder(null)
    window.location.reload()
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
              <p className="mb-2 text-base font-bold">
                Order #{order.order_number}
              </p>

              <div className="order-buttons mt-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleCancelOrder(order.id, order.order_number)
                  }
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
                <Link href={`/orders/${order.id}`}>
                  <Button className="ml-2">Manage Order</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <ConfirmationDialog
          message={`Are you sure you want to cancel Order #${selectedOrder.order_number}?`}
          onCancel={cancelCancellation}
          onConfirm={confirmCancellation}
          orderId={selectedOrder.id}
        />
      )}
    </div>
  )
}

export default RecentOrders
