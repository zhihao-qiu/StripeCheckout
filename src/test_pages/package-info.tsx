import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, type ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { FileUploader } from 'react-drag-drop-files'
import Head from 'next/head'
import { z } from 'zod'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FileUploadType } from '@/context/ReturnProcessContext'
import { Form } from '@/components/ui/form'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
} from '@/components/ui/common'

const uploads: FileUploadType[] = [
  {
    attachment: 'INV001',
    labelType: 'Physical',
    description: 'nike shoes',
  },
  {
    attachment: 'INV002',
    labelType: 'Digital',
    description: 'nike shoes',
  },
  {
    attachment: 'supercalifragilisticexpialidocious',
    labelType: 'Amazon',
    description: 'The rain in Spain stays mainly in the plain',
  },
]

const ACCEPTED_FILE_TYPES = ['JPG', 'PNG', 'PDF']

const formSchema = z.object(
  {
    labelFileUploads: z
      .array(
        z.object(
          {
            attachment: z.string({
              invalid_type_error: 'attachment invalid',
              required_error: 'attachment req',
              description: 'des',
            }),
            labelType: z.union(
              [
                z.literal('Physical'),
                z.literal('Digital'),
                z.literal('Amazon'),
              ],
              {
                invalid_type_error: 'labelType invalid',
                required_error: 'labelType req',
                description: 'des',
              }
            ),
            description: z.string({
              invalid_type_error: 'description invalid',
              required_error: 'description req',
              description: 'des',
            }),
          },
          {
            invalid_type_error: '11 invalid',
            required_error: '11 req',
            description: 'des',
          }
        )
      )
      .min(1, {
        message: 'arr invalid',
      }),
  },
  {
    invalid_type_error: 'tt invalid',
    required_error: 'tt req',
  }
)

export default function PackageInfo() {
  const returnProcess = useReturnProcess()
  const [arrayOfLabels, setArrayOfLabels] = useState<FileUploadType[]>(
    returnProcess.currentData.labelFileUploads ?? []
  )
  const [labelDescription, setLabelDescription] = useState<string | undefined>(
    undefined
  )
  const [file, setFile] = useState<File | undefined>(undefined)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // labelFileUploads: returnProcess.currentData.labelFileUploads ?? uploads,
      labelFileUploads: returnProcess.currentData.labelFileUploads ?? [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values.labelFileUploads)

    returnProcess.setCurrentData({ labelFileUploads: values.labelFileUploads })
    returnProcess.forward()
  }

  console.log('currentData:', returnProcess.currentData.labelFileUploads)
  console.log('Errors:', form.formState.errors)
  console.log('labelFileUploads:', form.getValues('labelFileUploads'))
  console.log('arrayOfLabels:', arrayOfLabels)
  console.log('isValid:', form.formState.isValid)

  const labelDialogClasses =
    'flex w-[30%] min-w-[30%] max-w-2xl flex-col justify-between rounded-lg border-4 border-brand bg-white font-bold text-brand lg:text-2xl'
  const columns: ColumnDef<FileUploadType>[] = [
    {
      accessorKey: 'attachment',
      header: 'Attachment',
      cell: ({ row }) => (
        <div className="break-all text-center">{row.original.attachment}</div>
      ),
    },
    {
      accessorKey: 'labelType',
      header: 'Label Type',
      cell: ({ row }) => (
        <Badge className="bg-green-200 text-primary hover:bg-brand hover:text-white">
          {row.original.labelType}
        </Badge>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: ' ',
      cell: (row) => {
        // using a variable as using state to hold / set value for the new description will close the dialog on change
        let newDescription: string
        return (
          <div className="flex justify-end space-x-1">
            <Dialog>
              <DialogTrigger>
                <FontAwesomeIcon
                  className="text-primary"
                  icon={faPen}
                  width={'15'}
                  height={'15'}
                />
              </DialogTrigger>
              <DialogContent className="bg-paleBlue">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold text-brand">
                    Edit Label Description
                  </DialogTitle>
                </DialogHeader>
                <div className="font-bold text-brand">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    onChange={(e) => {
                      newDescription = e.target.value
                    }}
                    className="col-span-3"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      className="w-full px-5"
                      onClick={() => {
                        const newArrayOfLabels = [...arrayOfLabels]
                        const rowId = Number(row.row.id)

                        if (newArrayOfLabels[rowId]) {
                          newArrayOfLabels[rowId]!.description = newDescription
                        }
                        setArrayOfLabels(newArrayOfLabels)
                      }}
                    >
                      {' '}
                      Update Package Description
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <FontAwesomeIcon
                  className="text-primary"
                  icon={faTrashCan}
                  width={'15'}
                  height={'15'}
                />
              </DialogTrigger>
              <DialogContent className="bg-paleBlue">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold text-brand">
                    Delete Label
                  </DialogTitle>
                </DialogHeader>
                <div className="font-bold text-brand">
                  This action cannot be undone. Are you sure you want to
                  permanently delete this file from our servers?
                </div>
                <DialogFooter className="flex flex-row justify-end">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="mx-2 w-1/5 rounded-full"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="mx-2 w-1/5"
                      onClick={() => {
                        const newArrayOfLabels = [...arrayOfLabels]
                        const rowId = Number(row.row.id)
                        newArrayOfLabels.splice(rowId, 1)
                        setArrayOfLabels(newArrayOfLabels)
                      }}
                    >
                      {' '}
                      Confirm
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      },
    },
  ]
  const handleChange = (loadedFile: File) => {
    setFile(loadedFile)
    // TODO: Change this later - this is only here to pass the validation step.
    form.setValue(
      'labelFileUploads',
      [
        {
          attachment: 'sad',
          description: 'df',
          labelType: 'Amazon',
        },
      ],
      { shouldValidate: true }
    )
  }
  const table = useReactTable({
    data: arrayOfLabels,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const addLabelToTable = (
    file: File | undefined,
    type: 'Physical' | 'Digital' | 'Amazon'
  ) => {
    console.log(file)
    if (file) {
      setArrayOfLabels([
        ...arrayOfLabels,
        {
          attachment: file?.name,
          labelType: type,
          description: labelDescription,
        },
      ])
      setLabelDescription(undefined)
      setFile(undefined)
    }
    // upload file to server after implementation
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabelDescription(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Return Process - Package Info</title>
      </Head>

      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="mx-5 my-10 flex flex-col flex-wrap justify-around lg:mx-10">
            <div className="my-5 text-mediumText font-bold text-brand">
              Package Details
            </div>
            <div className="mb-5 mr-5 flex justify-between text-brand">
              <div>
                Select label type and we&apos;ll handle the label printing and
                repackaging. You can add multiple packages.
              </div>
              <Dialog>
                <DialogTrigger>
                  <div className="font-bold text-primary">Tutorial</div>
                </DialogTrigger>
                <DialogContent className="bg-paleBlue">
                  <DialogHeader>
                    <DialogTitle className="text-center font-bold text-brand">
                      How to add a digital / Amazon QR package label
                    </DialogTitle>
                  </DialogHeader>
                  <div className="px-5 text-brand">
                    <div className="my-2">
                      Step 1: Click on the type of label you have.
                      <Image
                        height={300}
                        width={500}
                        src="/images/Step1.png"
                        alt="Step 1 example Image"
                      />
                    </div>
                    <div className="my-2">
                      Step 2: Drag your file over the area or click to browse
                      your computer&apos;s files
                      <Image
                        height={300}
                        width={500}
                        src="/images/Step2.png"
                        alt="Step 2 example image"
                      />
                    </div>
                    <div className="my-2">
                      Step 3: Fill in the description
                      <Image
                        height={300}
                        width={500}
                        src="/images/Step3.png"
                        alt="Step 3 example image"
                      />
                    </div>

                    <div className="my-2">
                      Step 4: Click &quot;Add Package&quot; to add it to the
                      list.
                      <Image
                        height={300}
                        width={500}
                        src="/images/Step4.png"
                        alt="Step 4 example image"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="w-full px-5">Got it!</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex w-full flex-col justify-between lg:flex-row">
              <div className="relative w-full overflow-auto rounded-lg border-2 border-primary bg-white dark:border-gray-700 lg:w-1/2">
                <Table>
                  <TableHeader className="border-b-2 border-primary bg-primary bg-opacity-20">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              className="text-center font-semibold text-primary"
                            >
                              {header.isPlaceholder
                                ? undefined
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                          className="bg-white"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No labels added.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="my-5 flex flex-row justify-between px-5 text-center lg:my-0 lg:w-1/2">
                <Dialog>
                  <DialogTrigger className={labelDialogClasses}>
                    <div className="mx-2 flex h-full grow flex-col justify-center self-center">
                      <div className="h-3/4">
                        <div className="mt-2 flex justify-center text-center">
                          <Image
                            height={58}
                            width={65}
                            src="/images/physical.png"
                            alt="physical label icon"
                          />
                        </div>
                        <div className="3xl:mx-10  my-2 2xl:mx-5">
                          Physical Label
                        </div>
                      </div>
                      <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                        +
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-paleBlue">
                    <DialogHeader>
                      <DialogTitle className="text-center font-bold text-brand">
                        Add Physical Label
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col px-5">
                      <div className="font-bold text-brand">Instructions</div>
                      <div className=" text-brand">
                        Please leave your physical label with your package.
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="w-full px-5">I understand</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger className={labelDialogClasses}>
                    <div className="mx-2 flex h-full grow flex-col justify-center self-center">
                      <div className="h-3/4">
                        <div className="mt-2 flex justify-center text-center">
                          <Image
                            height={58}
                            width={65}
                            src="/images/digital.png"
                            alt="digital label icon"
                          />
                        </div>
                        <div className="3xl:mx-15 my-2 md:mx-4 2xl:mx-10">
                          {' '}
                          Digital Label{' '}
                        </div>
                      </div>
                      <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                        +
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-paleBlue">
                    <DialogHeader>
                      <DialogTitle className="text-center font-bold text-brand">
                        Add Digital Label
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col px-5">
                      <div className="font-bold text-brand">
                        Upload Return Label
                      </div>
                      <div className="align-center min-h-20 flex h-20 flex-col justify-center rounded-lg border-2 bg-blue-200 text-center">
                        <FileUploader
                          handleChange={handleChange}
                          name="file"
                          types={ACCEPTED_FILE_TYPES}
                        >
                          {' '}
                          <p className="flex h-20 flex-col justify-around text-gray-500">
                            <div className="flex justify-center">
                              <svg
                                width="50px"
                                height="50px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 10V16M12 10L10 12M12 10L14 12M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274Z"
                                  stroke="#008BE7"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className="self-center">
                              Drag label here or
                              <Input
                                type="file"
                                id="files"
                                className="hidden"
                              />
                              <Label
                                className="text-mediumText text-primary"
                                htmlFor="files"
                              >
                                {' '}
                                browse files
                              </Label>
                            </div>
                          </p>
                        </FileUploader>
                      </div>
                      <div className="font-bold text-brand">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          placeholder='Label the item(s) inside: e.g. "laptop covers"'
                          onChange={handleDescriptionChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="w-full px-5"
                          onClick={() => void addLabelToTable(file, 'Digital')}
                        >
                          {' '}
                          Add Package
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger className={labelDialogClasses}>
                    <div className="mx-2 flex h-full grow flex-col justify-center self-center">
                      <div className="h-3/4">
                        <div className="mt-2 flex justify-center text-center">
                          <Image
                            height={58}
                            width={65}
                            src="/images/qr.png"
                            alt="QR code image"
                          />
                        </div>
                        <div className="my-2">Amazon QR Code</div>
                      </div>
                      <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                        +
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-paleBlue">
                    <DialogHeader>
                      <DialogTitle className="text-center font-bold text-brand">
                        Add Amazon QR Code
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col px-5">
                      <div className="font-bold text-brand">
                        Upload Return Label
                      </div>
                      <div className="align-center min-h-20 flex h-20 flex-col justify-center rounded-lg border-2 bg-blue-200 text-center">
                        <FileUploader
                          className="flex-grow"
                          handleChange={handleChange}
                          name="file"
                          types={ACCEPTED_FILE_TYPES}
                        >
                          {' '}
                          <p className="flex h-20 flex-col justify-around text-gray-500">
                            <div className="flex justify-center">
                              <svg
                                width="50px"
                                height="50px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 10V16M12 10L10 12M12 10L14 12M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274Z"
                                  stroke="#008BE7"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className="self-center">
                              Drag label here or
                              <Input
                                type="file"
                                id="files"
                                className="hidden"
                              />
                              <Label
                                className="text-mediumText text-primary"
                                htmlFor="files"
                              >
                                {' '}
                                browse files
                              </Label>
                            </div>
                          </p>
                        </FileUploader>
                      </div>
                      <div className="font-bold text-brand">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          placeholder='Label the item(s) inside: e.g. "laptop covers"'
                          onChange={handleDescriptionChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="w-full px-5"
                          onClick={() => void addLabelToTable(file, 'Amazon')}
                        >
                          {' '}
                          Add Package
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <span className="mt-5 flex justify-between">
              <ReturnProcessBackButton onClick={() => returnProcess.back()} />

              <ReturnProcessNextButton formState={form.formState} />
            </span>
          </div>
        </form>
      </Form>
    </>
  )
}
