import React from 'react'
import Link from 'next/link'
import { type Order } from '@components/DashBoard/types'

interface OrderListProps {
  orders?: Order[]
}

const formatPickupDate = (date: Date | string | undefined): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

  if (date instanceof Date) {
    return date.toLocaleDateString(undefined, options)
  } else if (typeof date === 'string') {
    const parsedDate = new Date(date)
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString(undefined, options)
    }
  }

  return ''
}

const OrderList: React.FC<OrderListProps> = ({ orders = [] }) => {
  return (
    <div className="rounded-3xl p-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={String(order._id)}
            className="mb-4 flex items-center justify-between  border-b-2 border-b-gray-300 p-4"
          >
            <div className="flex items-center space-x-4 ">
              <div className="ml-3 mr-5 h-11 w-11 rounded bg-gray-300"></div>
              <div className="flex flex-col space-y-2">
                <div className="text-smallText font-bold text-gray-950">
                  Order #{order.order_number}
                </div>
                <div className="text-sm text-gray-900">
                  Pick up Scheduled for{' '}
                  {order.order_details.pickup_date
                    ? formatPickupDate(
                        order.order_details.pickup_details.pickup_date
                      )
                    : ''}
                </div>
              </div>
            </div>
            <div className="flex-grow"></div>
            {order.status === 'Cancelled' && (
              <div className="mr-4 h-6 w-24 rounded bg-gray-500 text-center">
                Cancelled
              </div>
            )}
            <Link href={`/orders/${String(order._id)}`} passHref>
              <button
                className={`ml-5 cursor-pointer text-gray-800 underline  focus:outline-none`}
              >
                Manage Order
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p>{orders.length === 0 ? 'No orders available' : 'Loading...'}</p>
      )}
    </div>
  )
}

export default OrderList
