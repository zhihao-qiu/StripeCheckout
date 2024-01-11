import React from 'react'
import { Button } from '@/components/ui/button'

interface ConfirmationDialogProps {
  message: string
  onCancel: () => void
  onConfirm: () => void
  orderId: string
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  message,
  onCancel,
  onConfirm,
  orderId,
}) => {
  const handleConfirm = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/orders/${String(orderId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Cancelled' }),
      })
      if (response.ok) {
        onConfirm()
      } else {
        console.error('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }
  const handleConfirmClick = (): void => {
    handleConfirm().catch((error) =>
      console.error('Error in handleConfirm:', error)
    )
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="rounded-lg bg-white p-8">
        <p className="text-gray-800">{message}</p>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            size="default"
            className="mr-2"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-3xl"
            size="default"
            onClick={handleConfirmClick}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog
