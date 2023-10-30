import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

export default function Terms(props: {
  setAcceptance: (arg0: boolean) => void
}) {
  type termsSection = {
    subheading: string
    text: string[]
  }
  /*
  Just add useState for acceptance and pass it to prop.
  Add the future terms and conditions once it is made into the termsAndConditions array in sections.
  */
  const termsAndConditions: termsSection[] = [
    {
      subheading: 'YOUR ACCEPTANCE OF THIS AGREEMENT',
      text: [
        `This is an Agreement between you and all persons you represent (and for purposes of this Agreement, "person" includes natural persons and any type of incorporated or unincorporated entity) and 
        RETURNPAL COURIER SERVICE INC. ("ReturnPal") regarding your access to and use of ReturnPal's website and all content, information, products and services available on or through the website (collectively, the "Website"). This Agreement also provides benefits to ReturnPal affiliates, service providers, suppliers and other persons.`,
        `Each time you use the Website you signify your acceptance and agreement, and the acceptance and agreement of any person you purport to represent, to be bound by this Agreement as it then reads, and you represent and warrant that you have the legal authority to agree to and accept this Agreement on behalf of yourself and any person you purport to represent. If you do not agree with each provision of this Agreement, or you are not authorized to agree to and accept this Agreement on behalf of the person you purport to represent, you may not access or use the Website. The Website is for convenience and informational purposes only and is not intended to convey advice or recommendations, or an offer to sell any product or service.`,
        `This Agreement is in addition to any other agreement you may have with ReturnPal, including a transaction agreement.`,
      ],
    },
    {
      subheading: 'PERMISSION TO USE THE WEBSITE',
      text: [
        `You may use the Website only if you are a resident of Canada, have reached the age of majority where you live and you can form legally binding contracts under applicable law. You may not use the Website if you live in a jurisdiction where access to or use of the Website or any part of it may be illegal or prohibited. It is solely your responsibility to determine whether your use of the Website is lawful, and you must comply with all applicable laws. ReturnPal reserves the right to request proof of identification and age. ReturnPal returns products only to addresses in Canada.`,
      ],
    },
  ]

  const termsAndConditionsMapper = (array: termsSection[]) => {
    return array.map((section) => {
      return (
        <div key={array.indexOf(section)}>
          <div className="my-2 font-bold uppercase">
            {array.indexOf(section) + 1}. {section.subheading}
          </div>
          {section.text.map((paragraph) => {
            return (
              <div key={section.text.indexOf(paragraph)} className="my-2 ">
                {paragraph}
              </div>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger>
          <div className="self-center text-primary">Terms and Conditions</div>
        </DialogTrigger>
        <DialogContent className="bg-paleBlue">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-brand">
              Terms and Conditions
            </DialogTitle>
          </DialogHeader>
          <div className="text-brand">
            <ScrollArea className="h-[400px] rounded-md border p-4">
              {termsAndConditionsMapper(termsAndConditions)}
            </ScrollArea>
          </div>
          <DialogFooter className="flex flex-row justify-center">
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={() => void props?.setAcceptance(true)}
              >
                {' '}
                I understand
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
