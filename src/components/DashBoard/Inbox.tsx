import React, { useState, useMemo } from 'react'
import DashBoardHeader from './DashBoardHeader'
import { RxCaretSort, RxDotsHorizontal } from 'react-icons/rx'
import { type ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useInboxMessage from '@/hooks/useInboxMessage'
import RemoveMessageDialog from '@/components/DashBoard/InboxMessagesDialog.tsx/RemoveMessageDialog'
import { type Mail } from '@/components/DashBoard/types'
import { mailData } from '@/components/DashBoard/dummyData'
import { Badge } from '@/components/ui/badge'
import InboxDataTable from '@/components/DashBoard/InboxDataTable'
import InboxMessagesDialog from './InboxMessagesDialog.tsx'
import dollarFormat from '@lib/utils'

function Inbox() {
  // TODO get data from Apollo Client cache intead of dummy data
  const data = useMemo(() => mailData, [])
  // TODO replace useState with useQuery or any other global state management
  const [mails, setMails] = useState<Mail[]>(data)

  // TODO replace handleRemoveMessage with a mutation and update the cache.
  const { handleRemoveMessage, handleRemoveSelectedMessages } = useInboxMessage(
    mails,
    setMails
  )

  const columns = useMemo<ColumnDef<Mail>[]>(() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
          <Badge className="bg-primary">{row.original.id}</Badge>
        ),
      },
      {
        accessorKey: 'shippingStatus',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-white"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Status
              <RxCaretSort className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue('shippingStatus')}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-white"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Email
              <RxCaretSort className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue('email')}</div>
        ),
      },
      {
        accessorKey: 'message',
        header: 'Message',
        cell: ({ row }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="max-h-6 cursor-pointer overflow-hidden lowercase">
                  {row.getValue('message')}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.getValue('message')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => {
          return (
            <Button
              className="hover:bg-transparent hover:text-white"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Amount
              <RxCaretSort className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const amount = dollarFormat(parseFloat(row.getValue('amount')))

          return <div className="text-center font-medium">{amount}</div>
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row, table }) => {
          const mail = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <RxDotsHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard
                      .writeText(mail.id)
                      .then(() => {
                        console.log('Copy message ID', mail.id)
                      })
                      .catch((error) => {
                        console.error('Failed to copy message ID', error)
                      })
                  }}
                >
                  Copy messasge ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <InboxMessagesDialog mailOriginal={mail} />
                {/* Components that handle confirmation modal when user click delete message button. */}
                <RemoveMessageDialog
                  removeMessageHook={handleRemoveMessage}
                  messageContainer={row}
                  getMessageTypeLabel="Row"
                />
                {/* Conditional render component, only render when there is row got selected */}
                {table.getIsSomeRowsSelected() ? (
                  <RemoveMessageDialog
                    removeMessageHook={handleRemoveSelectedMessages}
                    messageContainer={table}
                    getMessageTypeLabel="Table"
                  />
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  }, [handleRemoveMessage, handleRemoveSelectedMessages])

  return (
    <>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      <InboxDataTable data={mails} columns={columns} />
    </>
  )
}

export default Inbox

// const getStaticProps = async () => {
//   return {
//     props: {
//       data: mailData,
//     },
//   }
// }
