// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import { type Order } from '@components/DashBoard/types'

// const OrderId: React.FC = () => {
//   const router = useRouter()
//   const { orderId } = router.query
//   const [order, setOrder] = useState<Order | null>(null)

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         if (orderId) {
//           console.log('orderId : ', orderId)
//           const orderIdString = Array.isArray(orderId) ? orderId[0] : orderId
//           const response = await fetch(`/api/orders/${orderIdString}`)
//           console.log('response is :: ', response)
//           if (response.ok) {
//             console.log('response is ok')
//             const data = (await response.json()) as Order
//             setOrder(data)
//           } else {
//             console.error('Error fetching order details', response.statusText)
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching order details', error)
//       }
//     }

//     ;(async () => {
//       await fetchOrderDetails()
//     })().catch((error) => {
//       console.error('Error in fetchOrderDetails:', error)
//     })
//   }, [orderId])

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Manage Order Page</h1>
//       {order ? (
//         <>
//           <h2>Order Details</h2>
//           <p>Order Number: {order.order_number}</p>
//           <p>Item Name: {order.itemName}</p>
//           <p>Quantity: {order.quantity}</p>
//           <p>Orders Status: {order.status}</p>
//           <p>
//             Orders Placed on: {order.order_date?.$dateFromString?.dateString}
//           </p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   )
// }

// export default OrderId
// pages/orders/[orderId].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { VscArchive, VscCreditCard } from 'react-icons/vsc'
import { IconContext } from 'react-icons'
import DefaultLayout from '@/layouts/DefaultLayout'
import OrderStatusNodes from '@/components/Orders/OrderStatusNodes'

import { type Order } from '@/components/DashBoard/types'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@components/Orders/ConfirmationDialog'
const OrderId = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
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
  const cancelCancellation = () => {
    setSelectedOrder(null)
  }
  const confirmCancellation = () => {
    if (selectedOrder) {
      console.log(
        `Cancel Order ${selectedOrder.order_number} (${selectedOrder._id})`
      )
      router
        .replace('/orders')
        .then(() => {
          setSelectedOrder(null)
        })
        .catch((error) => {
          console.error('Error navigating to dashboard:', error)
        })
    }
  }
  const handleCancelOrder = (_id: string, order_number: string) => {
    setSelectedOrder({ _id, order_number } as Order)
  }
  return (
    <div>
      <h1>In Progress</h1>
      {order ? (
        <>
          <div className="flex justify-center">
            <div
              className="border-thick flex-row space-x-7 border border-blue-950 bg-white "
              style={{
                width: '1000px',
                height: '540px',
                margin: '50px auto 0 auto', // Center the div vertically and horizontally
                borderRadius: '20px',
                border: '3px solid #blue-950',
                display: 'flex', // Use flexbox
                justifyContent: 'center', // Evenly distribute space between items
              }}
            >
              {/* Left side */}
              <div
                className="flex flex-col space-y-5 p-0 "
                style={{
                  marginRight: '50px',
                  marginLeft: '75px',
                  marginTop: '100px',
                }}
              >
                <div className="font-avenir-next text-2xl font-bold">
                  Order #{order.order_number}
                </div>
                {/* Add other order details as needed */}
                <div className="text-black-900 font-avenir-next flex items-center space-x-4 text-2xl font-bold">
                  Nike Return
                </div>
                <div className="w-{80} flex items-center space-x-4 text-smallText text-gray-900">
                  Order placed on
                  <span className="text-black-900 font-avenir-next with p-sm ml-1 flex items-center space-x-4 text-smallText font-bold">
                    Jan
                  </span>
                </div>
                <div className="w-{80} flex items-center space-x-4 text-smallText text-gray-900 ">
                  Pick up scheduled for
                  <span className="text-black-900 font-avenir-next with p-sm ml-1 flex items-center space-x-4 text-smallText font-bold">
                    Dec
                  </span>
                </div>
                <div className="text-black-900 font-avenir-next with flex items-center space-x-10 text-smallText font-bold">
                  6500 Boulevard de Rome, Brossard, QC, J4Y 0B6
                </div>
                <OrderStatusNodes status={order.status} />
              </div>
              {/* Right side */}
              <div
                className="flex flex-col space-y-7 "
                style={{
                  marginLeft: '50px',
                  marginRight: '75px',
                  marginTop: '200px',
                }}
              >
                {/* Total packages */}
                <div className=" flex items-center space-x-4">
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <VscArchive />
                  </IconContext.Provider>
                  <span className="w-{80} text-black-900 font-avenir-next with p-sm flex items-center text-smallText font-bold">
                    Total Packages:
                  </span>
                  <span className="w-{80} text-smallText text-gray-900">
                    {order.order_details.total_packages}
                  </span>
                </div>
                {/* Visa information */}
                <div className="flex items-center space-x-4">
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <VscCreditCard />
                  </IconContext.Provider>
                  <span className="text-black-900 font-avenir-next with flex items-center text-smallText font-bold">
                    Visa ending in:
                  </span>
                  <span className="w-{80} space-x-4 text-smallText text-gray-900">
                    4345
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-4 grid grid-cols-2 gap-4"
            style={{ gridTemplateColumns: '1fr auto', marginLeft: '800px' }}
          >
            <div>
              <Link href="/orders">
                <Button>Back</Button>
              </Link>
              <Button
                className="ring-offset-background focus-visible:ring-ring inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border-2 border-primary bg-white px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-slate-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 active:shadow-none active:ring-0 active:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                onClick={() => handleCancelOrder(order._id, order.order_number)}
                style={{
                  opacity:
                    order.status === 'Cancelled' || order.status === 'Delivered'
                      ? '2.0'
                      : '1',
                  cursor:
                    order.status === 'Cancelled' || order.status === 'Delivered'
                      ? 'not-allowed'
                      : 'pointer',
                }}
                disabled={
                  order.status === 'Cancelled' || order.status === 'Delivered'
                }
              >
                Cancel Order
              </Button>
            </div>
          </div>
          {selectedOrder && (
            <ConfirmationDialog
              message={`Are you sure you want to cancel Order #${selectedOrder.order_number}?`}
              onCancel={cancelCancellation}
              onConfirm={confirmCancellation}
              orderId={selectedOrder._id}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
OrderId.getLayout = (page: React.ReactElement) => (
  <DefaultLayout isHeaderShow={false} isFooterShow={false}>
    {page}
  </DefaultLayout>
)
export default OrderId
