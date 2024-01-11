// components/Orders/OrderStatusNodes.tsx
import React from 'react'
interface OrderStatusNodeProps {
  label: string
  isActive: boolean
}
const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
  label,
  isActive,
}) => (
  <div className={`order-status-node ${isActive ? 'active' : ''}`}>
    {isActive && <img src="/blue-check.png" alt="Blue Check" />}
    <span>{label}</span>
  </div>
)
interface OrderStatusNodesProps {
  status: string | undefined
}
const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({ status }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Order Status</h2>
      <div className="order-status-nodes-container mt-4 flex">
        <OrderStatusNode
          label="Order Placed"
          isActive={status === 'OrderPlaced'}
        />
        <OrderStatusNode label="Picked Up" isActive={status === 'PickedUp'} />
        <OrderStatusNode label="In Transit" isActive={status === 'InTransit'} />
        <OrderStatusNode label="Returned" isActive={status === 'Returned'} />
        <OrderStatusNode
          label="Order Cancelled"
          isActive={status === 'OrderCancelled'}
        />
      </div>
    </div>
  )
}
export default OrderStatusNodes
