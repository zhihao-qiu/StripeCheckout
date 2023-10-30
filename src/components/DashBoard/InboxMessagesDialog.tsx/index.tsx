import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { type Mail } from '@/components/DashBoard/types'
import dollarFormat from '@/utils/dollarFormat'
import Logo from '@/components/SvgComponents/Logo'
import { AiOutlineClose } from 'react-icons/ai'

function InboxMessagesDialog({ mailOriginal }: { mailOriginal: Mail }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          View Complete Message
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader className="relative my-4 space-y-4">
          <div className="flex justify-between">
            <Logo className="absolute -top-16 left-1/2 h-10 w-10 -translate-x-1/2" />
          </div>
          <DialogTitle className="mb-4">Message Details</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col space-y-4 p-4">
              <div className="mb-2 flex justify-between space-x-4">
                <label className="block">From:</label>

                <span>{mailOriginal.email}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <label className="block">Message:</label>

                <span className="max-w-[300px]">{mailOriginal.message}</span>
              </div>
              <div className="mb-2 flex justify-between space-x-4">
                <label className="block">Pickup Address:</label>

                <span>
                  {typeof mailOriginal.pickupAddress.apartmentUnitNumber ===
                  'string'
                    ? '# '
                    : ''}
                  {mailOriginal.pickupAddress.apartmentUnitNumber}{' '}
                  {typeof mailOriginal.pickupAddress.apartmentUnitNumber ===
                  'string'
                    ? '- '
                    : ''}
                  {mailOriginal.pickupAddress.streetNumber}{' '}
                  {mailOriginal.pickupAddress.streetName}
                  {', '}
                  {mailOriginal.pickupAddress.city}
                  {', '}
                  {mailOriginal.pickupAddress.province}
                  {', '} {mailOriginal.pickupAddress.postal}
                </span>
              </div>

              <div className="mb-2 flex justify-between space-x-4">
                <label className="block">Delivery Address:</label>

                <span>
                  {typeof mailOriginal.deliveryAddress.apartmentUnitNumber ===
                  'string'
                    ? '# '
                    : ''}
                  {mailOriginal.deliveryAddress.apartmentUnitNumber}{' '}
                  {typeof mailOriginal.deliveryAddress.apartmentUnitNumber ===
                  'string'
                    ? '- '
                    : ''}
                  {mailOriginal.deliveryAddress.streetNumber}{' '}
                  {mailOriginal.deliveryAddress.streetName}
                  {', '}
                  {mailOriginal.deliveryAddress.city}
                  {', '}
                  {mailOriginal.deliveryAddress.province}
                  {', '} {mailOriginal.deliveryAddress.postal}
                </span>
              </div>
              <div className="mb-2 flex justify-between space-x-4">
                <label className="block">Status:</label>

                <span
                  className={`${
                    mailOriginal.shippingStatus === 'Error'
                      ? 'text-red-500'
                      : ''
                  } ${
                    mailOriginal.shippingStatus === 'Pending'
                      ? 'text-yellow-500'
                      : ''
                  }
                    ${
                      mailOriginal.shippingStatus === 'Delivered'
                        ? 'text-green-500'
                        : ''
                    }
                    ${
                      mailOriginal.shippingStatus === 'In Transit'
                        ? 'text-primary'
                        : ''
                    }

                    `}
                >
                  {mailOriginal.shippingStatus}
                </span>
              </div>

              <div className="mb-2 flex justify-between space-x-4">
                <label className="block">Amount:</label>

                <span>{dollarFormat(mailOriginal.amount)}</span>
              </div>

              <div className="mb-2 flex justify-between space-x-4">
                <label className="block">Pickup Date:</label>

                <span>{mailOriginal.retrunDate}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter
          // className={`${
          //   mailOriginal.shippingStatus === 'Pending'
          //     ? 'justify-end sm:justify-between'
          //     : ''
          // }`}
          className="relative h-10"
        >
          {mailOriginal.shippingStatus === 'Pending' ? (
            <DialogClose asChild>
              <Button>Pay Bill</Button>
            </DialogClose>
          ) : null}
          <DialogClose
            asChild
            className="absolute -bottom-20 left-1/2 -translate-x-1/2"
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <AiOutlineClose />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InboxMessagesDialog
