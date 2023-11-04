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
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Terms(props: {
  setAcceptance: (arg0: boolean) => void
}) {
  type termsSection = {
    subheading: string
    text: string[]
  }
  /*
  Just add useState for acceptance and pass it to prop.
  Add the future terms and conditions once it is made by the legal team into the termsAndConditions array in sections.
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
    {
      subheading: 'Your Account',
      text: [
        `If you use the Services, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your devices. You agree to accept responsibility for all activities that occur under your account or password. ReturnPal reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.`,
      ],
    },
    {
      subheading: 'LIABILITY',
      text: [
        `You understand that there is inherent risk in delivery (and related services) and there is potential for returned goods, packages and related items to get lost or damaged. ReturnPal will do its best to ensure situations like this do not happen, and in the instances they do happen, will work with you to help rectify the situation, as long as you provide us with written notification identifying the concern within fourteen (14) days of you receiving notice. ReturnPal will help rectify damaged returns to the extent the damage was not caused due to inadequate padding, cushioning, wrapping and/or packaging by you. `,
        `In addition, the information, recommendations and/or services provided to you on or through the Services is for general information purposes only. The use of the Site or the Contents is at your own risk. The Contents in this Site could include technical inaccuracies or typographical errors. ReturnPal may make changes or improvements at any time`,
        `THE CONTENTS IN THIS SITE ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. Except as otherwise provided in these Terms, to the fullest extent permissible pursuant to applicable law, ReturnPal disclaims all warranties of merchantability or fitness for a particular purpose. ReturnPal does not warrant that the functions contained in the material will be uninterrupted or error-free, that defects will be corrected, or that this Site or the server that makes it available are free of viruses or other harmful components. ReturnPal does not warrant or make any representations regarding the use of, or the result of the use of, the contents in this Site in terms of their correctness, accuracy, reliability, or otherwise. To the fullest extent permissible pursuant to applicable law, ReturnPal assumes no liability, whether in contract or tort, for any direct, indirect, special, consequential, or punitive damages, including (without limitation) damages for loss of anticipated profits or revenue or other economic loss in connection with or arising from any act or omission by ReturnPal, its agents, affiliates, joint venture partners, independent contractors, or unaffiliated third parties as a result of any act or omission in fulfillment of or in breach of these Terms or the Privacy Policy`,
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
