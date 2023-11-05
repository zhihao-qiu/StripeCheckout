import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Reveal from '@components/common/reveal'

type DashBoardHeaderProps = {
  firstName: string
  lastName: string
  email: string
}

function DashBoardHeader({ firstName, lastName, email }: DashBoardHeaderProps) {
  return (
    <div className="relative h-[25vh] w-full bg-[url('/images/returnpal-gta.webp')]  bg-cover bg-center text-title text-white">
      <div className="absolute h-full w-full backdrop-blur-sm"></div>
      <div className="absolute bottom-0 flex items-end gap-20 pl-20">
        <Reveal>
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`https://robohash.org/${email}.png?set=set5&size=100x100`}
            />

            <AvatarFallback>RP</AvatarFallback>
          </Avatar>
        </Reveal>
        <Reveal>
          <span>
            {firstName} {lastName}
          </span>
        </Reveal>
      </div>
    </div>
  )
}

export default DashBoardHeader
