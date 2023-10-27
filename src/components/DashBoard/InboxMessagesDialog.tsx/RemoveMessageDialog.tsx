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
import { type Table, type Row } from '@tanstack/react-table'
import { type Mail } from '@/components/DashBoard/types'

function RemoveMessageDialog({
  removeMessageHook,
  messageContainer,
  getMessageTypeLabel,
}: {
  removeMessageHook:
    | ((container: Row<Mail>) => void)
    | ((container: Table<Mail>) => void)
  messageContainer: Table<Mail> | Row<Mail>
  getMessageTypeLabel: 'Table' | 'Row'
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {getMessageTypeLabel === 'Table'
            ? 'Delete All Selected'
            : 'Delete Message'}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="my-4 space-y-4">
          <DialogTitle>
            {' '}
            {getMessageTypeLabel === 'Row'
              ? 'Message'
              : 'Selected messages'}{' '}
            delete confirmation
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            {getMessageTypeLabel === 'Row'
              ? 'this message'
              : 'delete all selected messages'}{' '}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-8">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={() => {
                ;(
                  removeMessageHook as (
                    container: Row<Mail> | Table<Mail>
                  ) => void
                )(messageContainer)
              }}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RemoveMessageDialog
