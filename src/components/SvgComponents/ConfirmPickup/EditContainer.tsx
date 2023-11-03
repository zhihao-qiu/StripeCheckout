import Reveal from '@components/common/reveal'
import Edit from './Edit'

export default function EditContainer() {
  return (
    <div className="hidden justify-center sm:flex md:min-w-[40px]">
      <div className="mt-4 h-[28px] w-[28px]">
        <Reveal>
          <Edit />
        </Reveal>
      </div>
    </div>
  )
}
