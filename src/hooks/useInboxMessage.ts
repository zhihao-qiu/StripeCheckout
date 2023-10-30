import { type Mail } from '@/components/DashBoard/types'
import { type Table, type Row } from '@tanstack/react-table'
import type React from 'react'
import { useToast } from '@/components/ui/use-toast'

// CUSTOM HOOK FOR INBOX MESSAGE
// TODO - add api call to delete messages
function useInboxMessage(
  mails: Mail[],
  setMails: React.Dispatch<React.SetStateAction<Mail[]>>
) {
  const { toast } = useToast()
  const handleRemoveMessage = (row: Row<Mail>) => {
    const mail = row.original
    const newMails = mails.filter((m: Mail) => m.id !== mail.id)
    row.toggleSelected(false)
    setMails(newMails)
    toast({
      title: 'Message deleted',
      description: `Message from ${mail.email} has been deleted`,
      duration: 2000,
    })
  }

  const handleRemoveSelectedMessages = (table: Table<Mail>) => {
    const selectedRowsData = table
      .getSelectedRowModel()
      .rows.map((row) => row.original)

    setMails((preV) => {
      return preV.filter((mail) => !selectedRowsData.includes(mail))
    })
    table.toggleAllRowsSelected(false)
    toast({
      title: 'Messages deleted',
      description: `Messages has been deleted`,
      duration: 2000,
    })
  }

  return {
    handleRemoveMessage,
    handleRemoveSelectedMessages,
  }
}

export default useInboxMessage
