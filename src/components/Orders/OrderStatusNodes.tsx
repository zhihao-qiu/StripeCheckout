// src/components/Orders/OrderStatusNodes.tsx
import React from 'react';

interface OrderStatusNodesProps {
  orderStatus: string;
  isCancelled: boolean;
  onBackClick: () => void;
  onCancelOrder: () => void;
}

const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({
  orderStatus,
  isCancelled,
  onBackClick,
  onCancelOrder,
}) => {
  // Adjust the components and styles based on the order status and cancellation status

  return (
    <div>
      {/* Display order status and related components */}
      <p>Order Status: {orderStatus}</p>

      {/* Adjust UI based on the cancellation status */}
      {isCancelled ? (
        <p>Order is Cancelled</p>
      ) : (
        <button onClick={onCancelOrder}>Cancel Order</button>
      )}

      <button onClick={onBackClick}>Back to Recent Orders</button>
    </div>
  );
};

export default OrderStatusNodes;
