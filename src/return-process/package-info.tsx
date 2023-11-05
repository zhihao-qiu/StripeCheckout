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
import { useState, type ChangeEvent, useEffect } from 'react'
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
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import { SectionDescription, SectionHeader } from '@/components/common/section'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@components/ui/scroll-area'
import UploadIconSvg from '@components/SvgComponents/UploadIcon'
import Reveal from '@components/common/reveal'

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
      labelFileUploads: returnProcess.currentData.labelFileUploads ?? [],
    },
  })

  useEffect(() => {
    if (arrayOfLabels.length === 0) {
      form.setValue('labelFileUploads', [], { shouldValidate: true })
    }
  }, [arrayOfLabels, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values.labelFileUploads)

    returnProcess.setCurrentData({ labelFileUploads: values.labelFileUploads })
    returnProcess.forward()
  }

  console.log('currentData:', returnProcess.currentData.labelFileUploads)
  console.log('labelFileUploads:', form.getValues('labelFileUploads'))

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
        // using a variable as using state to hold / set value for the new description will close the dialog on change due to re-rendering thus newDescription is being held in a variable
        let newDescription: string
        return (
          <div className="flex justify-end space-x-3 md:space-x-2">
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
                      className="mx-2 w-1/5 scale-75 rounded-full xs:scale-100"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="mx-2 w-1/5 scale-75 xs:scale-100"
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
    // TODO: upload file to server after implementation
  }

  const addPhysicalLabel = () => {
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
    setArrayOfLabels([
      ...arrayOfLabels,
      {
        attachment: file?.name ?? 'N/A',
        labelType: 'Physical',
        description: labelDescription,
      },
    ])
    setLabelDescription(undefined)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
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
          <ReturnProcessRoot>
            <ReturnProcessSection>
              <Reveal>
                <SectionHeader>Pickup Details</SectionHeader>
              </Reveal>
              <SectionDescription className="flex w-full justify-between">
                <Reveal>
                  <p className="text-start">
                    Select label type and we&apos;ll handle the label printing
                    and repackaging. You can add multiple packages.
                  </p>
                </Reveal>

                <Dialog>
                  <DialogTrigger className="pr-5">
                    <Reveal>
                      <div className="font-bold text-primary">Tutorial</div>
                    </Reveal>
                  </DialogTrigger>
                  <DialogContent className="h-5/6 bg-paleBlue object-scale-down">
                    <DialogHeader>
                      <Reveal>
                        <DialogTitle className="text-center font-bold text-brand">
                          How to add a package label
                          <div className="text-xs font-normal xxs:invisible">
                            Please scroll/swipe down below for more information
                          </div>
                        </DialogTitle>
                      </Reveal>
                    </DialogHeader>
                    <ScrollArea>
                      <div className="px-5 text-brand">
                        <Reveal>
                          <div className="my-2">
                            Step 1: Click on the type of label you have.
                            <Image
                              height={300}
                              width={500}
                              src="/images/Step1.png"
                              alt="Step 1 example Image"
                            />
                          </div>
                        </Reveal>
                        <Reveal width="100%">
                          <Separator className="bg-brand" />
                        </Reveal>
                        <Reveal>
                          <div className="my-2">
                            Step 2: Drag your file over the area or click to
                            browse your computer&apos;s files. If you are using
                            physical labels you can skip this step.
                            <Image
                              height={300}
                              width={500}
                              src="/images/Step2.png"
                              alt="Step 2 example image"
                            />
                          </div>
                        </Reveal>
                        <Reveal width="100%">
                          <Separator className="bg-brand" />
                        </Reveal>
                        <Reveal>
                          <div className="my-2">
                            Step 3: Fill in the description box
                            <Image
                              height={300}
                              width={500}
                              src="/images/Step3.png"
                              alt="Step 3 example image"
                            />
                          </div>
                        </Reveal>
                        <Reveal width="100%">
                          <Separator className="bg-brand" />
                        </Reveal>
                        <Reveal>
                          <div className="my-2">
                            Step 4: Click &quot;Add Package&quot; to add it to
                            the list.
                            <Image
                              height={300}
                              width={500}
                              src="/images/Step4.png"
                              alt="Step 4 example image"
                            />
                          </div>
                        </Reveal>
                      </div>
                    </ScrollArea>

                    <DialogFooter>
                      <Reveal width="100%">
                        <DialogClose asChild>
                          <Button className="w-full px-5">Got it!</Button>
                        </DialogClose>
                      </Reveal>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </SectionDescription>
            </ReturnProcessSection>

            <div className="flex w-full flex-col justify-between md:flex-row">
              <div className="relative w-full overflow-auto rounded-lg border-2 border-primary bg-white dark:border-gray-700 lg:w-1/2">
                <Reveal width="100%">
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
                </Reveal>
              </div>

              <div className="my-5 flex flex-row justify-between space-x-2 text-center sm:px-5 md:my-0 md:w-2/3 lg:w-1/2">
                <Dialog>
                  <DialogTrigger className={labelDialogClasses}>
                    <div className="flex h-full grow flex-col justify-center self-center">
                      <div className="h-3/4">
                        <div className="mt-2 flex scale-75 justify-center object-scale-down text-center sm:scale-100 md:scale-75 lg:scale-100">
                          <Reveal>
                            <Image
                              height={58}
                              width={65}
                              src="/images/physical.png"
                              alt="physical label icon"
                            />
                          </Reveal>
                        </div>
                        <Reveal>
                          <div className="3xl:mx-10  my-2 2xl:mx-5">
                            Physical Label
                          </div>
                        </Reveal>
                      </div>
                      <Reveal width="100%">
                        <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                          +
                        </div>
                      </Reveal>
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
                      <div className="font-bold text-brand">
                        <Label
                          htmlFor="description"
                          className="text-right font-bold"
                        >
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
                          onClick={() => void addPhysicalLabel()}
                        >
                          Add Package
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger className={labelDialogClasses}>
                    <div className="flex h-full grow flex-col justify-center self-center">
                      <div className="h-3/4">
                        <div className="mt-2 flex scale-75 justify-center object-scale-down text-center sm:scale-100 md:scale-75 lg:scale-100">
                          <Reveal>
                            <Image
                              height={58}
                              width={65}
                              src="/images/digital.png"
                              alt="digital label icon"
                            />
                          </Reveal>
                        </div>
                        <Reveal>
                          <div className="3xl:mx-15 my-2 md:mx-4 2xl:mx-10">
                            {' '}
                            Digital Label{' '}
                          </div>
                        </Reveal>
                      </div>
                      <Reveal width="100%">
                        <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                          +
                        </div>
                      </Reveal>
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
                              <UploadIconSvg />
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
                    <div className="flex h-full grow flex-col justify-center self-center">
                      <div className="h-3/4">
                        <div className="mt-2 flex scale-75 justify-center object-scale-down text-center sm:scale-100 md:scale-75 lg:scale-100">
                          <Reveal>
                            <Image
                              height={58}
                              width={65}
                              src="/images/qr.png"
                              alt="QR code image"
                            />
                          </Reveal>
                        </div>
                        <Reveal>
                          <div className="my-2">Amazon QR Code</div>
                        </Reveal>
                      </div>
                      <Reveal width="100%">
                        <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                          +
                        </div>
                      </Reveal>
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
                        Upload Amazon QR Code
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
                              <UploadIconSvg />
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
              <Reveal>
                <ReturnProcessBackButton />
              </Reveal>
              <Reveal>
                <ReturnProcessNextButton />
              </Reveal>
            </span>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
