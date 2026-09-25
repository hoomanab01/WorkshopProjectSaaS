import * as React from "react"
import { cn } from "cn"
import { Slot } from "radix-ui"

import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/Button"

// ShadCN's button API, drawn with the Figma button (src/components/Button), so
// every ShadCN component that shows a button uses the Figma design.

// ShadCN variant → Figma type. Figma has no "ghost", so it maps to the closest
// borderless type, link-neutral.
const VARIANTS = {
  default: "primary",
  secondary: "secondary-grey",
  outline: "tertiary",
  destructive: "destructive",
  ghost: "link-neutral",
  link: "link-color",
} as const satisfies Record<string, ButtonVariant>

// ShadCN size → Figma size (l 40px, m 36px, s 32px) and whether it is icon only.
const SIZES = {
  xs: { size: "s", iconOnly: false },
  sm: { size: "s", iconOnly: false },
  default: { size: "m", iconOnly: false },
  lg: { size: "l", iconOnly: false },
  "icon-xs": { size: "s", iconOnly: true },
  "icon-sm": { size: "s", iconOnly: true },
  icon: { size: "m", iconOnly: true },
  "icon-lg": { size: "l", iconOnly: true },
} as const satisfies Record<string, { size: ButtonSize; iconOnly: boolean }>

type ButtonVariantProps = {
  variant?: keyof typeof VARIANTS | null
  size?: keyof typeof SIZES | null
}

function buttonVariants({
  variant,
  size,
  className,
}: ButtonVariantProps & { className?: string } = {}) {
  const v = VARIANTS[variant ?? "default"]
  const s = SIZES[size ?? "default"]
  return cn(
    buttonClassName({
      variant: v,
      size: s.size,
      layout: s.iconOnly ? "icon only" : "icon and label",
    }),
    "[&_svg]:pointer-events-none",
    // Link types have no padding; keep a 24px minimum so small icon buttons
    // (close, arrows) are still easy to hit.
    v.startsWith("link-") && "min-h-6",
    v.startsWith("link-") && s.iconOnly && "min-w-6",
    className
  )
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
