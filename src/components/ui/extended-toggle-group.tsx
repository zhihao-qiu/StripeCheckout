import React, { useEffect, useState } from 'react'
import { createContextScope } from '@radix-ui/react-context'
import { Primitive } from '@radix-ui/react-primitive'
import * as RovingFocusGroup from '@radix-ui/react-roving-focus'
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus'
import { Toggle } from '@radix-ui/react-toggle'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { useDirection } from '@radix-ui/react-direction'

import type * as Radix from '@radix-ui/react-primitive'
import type { Scope } from '@radix-ui/react-context'

/* -------------------------------------------------------------------------------------------------
 * ToggleGroup
 * -----------------------------------------------------------------------------------------------*/

const TOGGLE_GROUP_NAME = 'ExtendedToggleGroup'

type ScopedProps<P> = P & { __scopeToggleGroup?: Scope }
const [createToggleGroupContext, createToggleGroupScope] = createContextScope(
  TOGGLE_GROUP_NAME,
  [createRovingFocusGroupScope]
)
const useRovingFocusGroupScope = createRovingFocusGroupScope()

type ToggleGroupElement = ToggleGroupImplSingleElement

interface ToggleGroupSingleProps extends ToggleGroupImplSingleProps {
  type: 'single'
}
interface ToggleGroupMultipleProps extends ToggleGroupImplMultipleProps {
  type: 'multiple'
}

const ExtendedToggleGroup = React.forwardRef<
  ToggleGroupElement,
  ToggleGroupSingleProps | ToggleGroupMultipleProps
>((props, forwardedRef) => {
  const { type, ...toggleGroupProps } = props

  if (type === 'single') {
    const singleProps = toggleGroupProps as ToggleGroupImplSingleProps
    return <ToggleGroupImplSingle {...singleProps} ref={forwardedRef} />
  }

  if (type === 'multiple') {
    const multipleProps = toggleGroupProps as ToggleGroupImplMultipleProps
    return <ToggleGroupImplMultiple {...multipleProps} ref={forwardedRef} />
  }

  throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``)
})

ExtendedToggleGroup.displayName = TOGGLE_GROUP_NAME

/* -----------------------------------------------------------------------------------------------*/

type ToggleGroupValueContextValue = {
  type: 'single' | 'multiple'
  value: string[]
  onItemActivate(value: string): void
  onItemDeactivate(value: string): void
}

const [ToggleGroupValueProvider, useToggleGroupValueContext] =
  createToggleGroupContext<ToggleGroupValueContextValue>(TOGGLE_GROUP_NAME)

type ToggleGroupImplSingleElement = ToggleGroupImplElement
interface ToggleGroupImplSingleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  onValueChange?(value: string): void
}

// eslint-disable-next-line react/display-name
const ToggleGroupImplSingle = React.forwardRef<
  ToggleGroupImplSingleElement,
  ToggleGroupImplSingleProps
>((props: ScopedProps<ToggleGroupImplSingleProps>, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    ...toggleGroupSingleProps
  } = props

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  return (
    <ToggleGroupValueProvider
      scope={props.__scopeToggleGroup}
      type="single"
      value={value ? [value] : []}
      onItemActivate={setValue}
      onItemDeactivate={React.useCallback(() => setValue(''), [setValue])}
    >
      <ToggleGroupImpl {...toggleGroupSingleProps} ref={forwardedRef} />
    </ToggleGroupValueProvider>
  )
})

type ToggleGroupImplMultipleElement = ToggleGroupImplElement
interface ToggleGroupImplMultipleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  onValueChange?(value: string[]): void
}

// eslint-disable-next-line react/display-name
const ToggleGroupImplMultiple = React.forwardRef<
  ToggleGroupImplMultipleElement,
  ToggleGroupImplMultipleProps
>((props: ScopedProps<ToggleGroupImplMultipleProps>, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {},
    ...toggleGroupMultipleProps
  } = props

  const [value = [], setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const handleButtonActivate = React.useCallback(
    (itemValue: string) =>
      setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  )

  const handleButtonDeactivate = React.useCallback(
    (itemValue: string) =>
      setValue((prevValue = []) =>
        prevValue.filter((value) => value !== itemValue)
      ),
    [setValue]
  )

  return (
    <ToggleGroupValueProvider
      scope={props.__scopeToggleGroup}
      type="multiple"
      value={value}
      onItemActivate={handleButtonActivate}
      onItemDeactivate={handleButtonDeactivate}
    >
      <ToggleGroupImpl {...toggleGroupMultipleProps} ref={forwardedRef} />
    </ToggleGroupValueProvider>
  )
})

ExtendedToggleGroup.displayName = TOGGLE_GROUP_NAME

/* -----------------------------------------------------------------------------------------------*/

type ToggleGroupContextValue = {
  firstSelected: boolean
  onFirstSelectedValueChange(value: boolean): void
  rovingFocus: boolean
  disabled: boolean
}

const [ToggleGroupContext, useToggleGroupContext] =
  createToggleGroupContext<ToggleGroupContextValue>(TOGGLE_GROUP_NAME)

type RovingFocusGroupProps = Radix.ComponentPropsWithoutRef<
  typeof RovingFocusGroup.Root
>
type ToggleGroupImplElement = React.ElementRef<typeof Primitive.div>
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>
interface ToggleGroupImplProps extends PrimitiveDivProps {
  firstSelected?: boolean
  onFirstSelectedValueChange?(): void
  /**
   * Whether the group is disabled from user interaction.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Whether the group should maintain roving focus of its buttons.
   * @defaultValue true
   */
  rovingFocus?: boolean
  loop?: RovingFocusGroupProps['loop']
  orientation?: RovingFocusGroupProps['orientation']
  dir?: RovingFocusGroupProps['dir']
}

const ToggleGroupImpl = React.forwardRef<
  ToggleGroupImplElement,
  ToggleGroupImplProps
>((props: ScopedProps<ToggleGroupImplProps>, forwardedRef) => {
  const {
    __scopeToggleGroup,
    disabled = false,
    rovingFocus = true,
    orientation,
    dir,
    firstSelected,
    onFirstSelectedValueChange = () => {},
    loop = true,
    ...toggleGroupProps
  } = props
  const context = useToggleGroupValueContext(
    TOGGLE_GROUP_NAME,
    props.__scopeToggleGroup
  )
  const [value = false, setValue] = useControllableState({
    prop: firstSelected,
    defaultProp: false,
    onChange: onFirstSelectedValueChange,
  })

  console.log('NEW VALUE: ', value)

  useEffect(() => {
    if (!value) {
      setValue(context.value.length !== 0)
    } else {
      if(context.value.length === 0) {
        setValue(false)
      }
    }
  }, [context.value])

  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup)
  const direction = useDirection(dir)
  const commonProps = {
    role: 'group',
    test_addition: '',
    dir: direction,
    ...toggleGroupProps,
  }
  return (
    <ToggleGroupContext
      firstSelected={value}
      onFirstSelectedValueChange={setValue}
      scope={__scopeToggleGroup}
      rovingFocus={rovingFocus}
      disabled={disabled}
    >
      {rovingFocus ? (
        <RovingFocusGroup.Root
          asChild
          {...rovingFocusGroupScope}
          orientation={orientation}
          dir={direction}
          loop={loop}
        >
          <Primitive.div {...commonProps} ref={forwardedRef} />
        </RovingFocusGroup.Root>
      ) : (
        <Primitive.div {...commonProps} ref={forwardedRef} />
      )}
    </ToggleGroupContext>
  )
})

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'ExtendedToggleGroupItem'

type ToggleGroupItemElement = ToggleGroupItemImplElement
type ToggleGroupItemProps = Omit<ToggleGroupItemImplProps, 'pressed'>

const ExtendedToggleGroupItem = React.forwardRef<
  ToggleGroupItemElement,
  ToggleGroupItemProps
>((props: ScopedProps<ToggleGroupItemProps>, forwardedRef) => {
  const valueContext = useToggleGroupValueContext(
    ITEM_NAME,
    props.__scopeToggleGroup
  )
  const context = useToggleGroupContext(ITEM_NAME, props.__scopeToggleGroup)
  const rovingFocusGroupScope = useRovingFocusGroupScope(
    props.__scopeToggleGroup
  )
  const pressed = valueContext.value.includes(props.value)
  const disabled = context.disabled || props.disabled
  const commonProps = { ...props, pressed, disabled }
  const ref = React.useRef<HTMLDivElement>(null)
  return context.rovingFocus ? (
    <RovingFocusGroup.Item
      asChild
      data-state={context.firstSelected ? pressed ? 'on' : 'off' : "unselected"}
      {...rovingFocusGroupScope}
      focusable={!disabled}
      active={pressed}
      ref={ref}
    >
      <ToggleGroupItemImpl {...commonProps} ref={forwardedRef} />
    </RovingFocusGroup.Item>
  ) : (
    <ToggleGroupItemImpl {...commonProps} ref={forwardedRef} />
  )
})

ExtendedToggleGroupItem.displayName = ITEM_NAME

/* -----------------------------------------------------------------------------------------------*/

type ToggleGroupItemImplElement = React.ElementRef<typeof Toggle>
type ToggleProps = Radix.ComponentPropsWithoutRef<typeof Toggle>
interface ToggleGroupItemImplProps
  extends Omit<ToggleProps, 'defaultPressed' | 'onPressedChange'> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string
}

const ToggleGroupItemImpl = React.forwardRef<
  ToggleGroupItemImplElement,
  ToggleGroupItemImplProps
>((props: ScopedProps<ToggleGroupItemImplProps>, forwardedRef) => {
  const { __scopeToggleGroup, value, ...itemProps } = props
  const valueContext = useToggleGroupValueContext(ITEM_NAME, __scopeToggleGroup)
  const singleProps = {
    role: 'radio',
    'aria-checked': props.pressed,
    'aria-pressed': undefined,
  }
  const typeProps = valueContext.type === 'single' ? singleProps : undefined
  return (
    <Toggle
      {...typeProps}
      {...itemProps}
      ref={forwardedRef}
      onPressedChange={(pressed) => {
        if (pressed) {
          valueContext.onItemActivate(value)
        } else {
          valueContext.onItemDeactivate(value);
        }
      }}
    />
  )
})

/* -----------------------------------------------------------------------------------------------*/

const Root = ExtendedToggleGroup
const Item = ExtendedToggleGroupItem

export {
  createToggleGroupScope,
  //
  ExtendedToggleGroup,
  ExtendedToggleGroupItem,
  //
  Root,
  Item,
}
export type {
  ToggleGroupSingleProps,
  ToggleGroupMultipleProps,
  ToggleGroupItemProps,
}
