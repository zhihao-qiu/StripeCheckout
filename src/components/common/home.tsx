/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import { type ImageLoader } from 'next/dist/client/image-component'
import {
  type OnLoadingComplete,
  type PlaceholderValue,
  type StaticImport,
} from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const HomeSectionImageRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-4', className)} {...props} />
))
HomeSectionImageRoot.displayName = 'HomeSectionImageRoot'

const HomeSectionImage = React.forwardRef<HTMLImageElement, NextImageProps>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      className={cn('rounded-full border-8 border-primary', className)}
      ref={ref}
      {...props}
    />
  )
)
HomeSectionImage.displayName = 'HomeSectionImage'

const HomeSectionImageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col', className)} {...props} />
))
HomeSectionImageContent.displayName = 'HomeSectionImageContent'

const HomeSectionImageTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} {...props} />)
HomeSectionImageTitle.displayName = 'HomeSectionImageTitle'

const HomeSectionImageTitleHeader = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-lg font-bold', className)} {...props} />
))
HomeSectionImageTitleHeader.displayName = 'HomeSectionImageTitleHeader'

const HomeSectionImageTitleDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-base', className)} {...props} />
))
HomeSectionImageTitleDescription.displayName =
  'HomeSectionImageTitleDescription'

export {
  HomeSectionImageRoot,
  HomeSectionImage,
  HomeSectionImageContent,
  HomeSectionImageTitle,
  HomeSectionImageTitleHeader,
  HomeSectionImageTitleDescription,
}

type NextImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
  src: string | StaticImport
  alt: string
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
  fill?: boolean | undefined
  loader?: ImageLoader | undefined
  quality?: number | `${number}` | undefined
  priority?: boolean | undefined
  loading?: 'eager' | 'lazy' | undefined
  placeholder?: PlaceholderValue | undefined
  blurDataURL?: string | undefined
  unoptimized?: boolean | undefined
  onLoadingComplete?: OnLoadingComplete | undefined
  layout?: string | undefined
  objectFit?: string | undefined
  objectPosition?: string | undefined
  lazyBoundary?: string | undefined
  lazyRoot?: string | undefined
} & React.RefAttributes<HTMLImageElement | null>
