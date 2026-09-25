import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

// Names match the Figma component set "button" (node 3:70).
// Figma's `type` property is called `variant` here, because `type` is already
// the HTML button attribute (button / submit / reset).
export const BUTTON_VARIANTS = [
  "primary",
  "secondary-grey",
  "brand",
  "tertiary",
  "destructive",
  "link-color",
  "link-neutral",
] as const;
export const BUTTON_SIZES = ["l", "m", "s"] as const;
export const BUTTON_STATES = ["default", "disabled", "hover", "pressed"] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type ButtonState = (typeof BUTTON_STATES)[number];

type BaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Forces a state's look, for previews and docs only.
   * Real screens leave this unset: hover and pressed come from the mouse,
   * disabled comes from the `disabled` prop.
   */
  state?: ButtonState;
};

type IconAndLabelProps = BaseProps & {
  layout?: "icon and label";
  label: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  icon?: never;
};

type IconOnlyProps = BaseProps & {
  layout: "icon only";
  icon: ReactNode;
  /** Icon-only buttons have no visible text, so they need a spoken name. */
  "aria-label": string;
  label?: never;
  leftIcon?: never;
  rightIcon?: never;
};

export type ButtonProps = IconAndLabelProps | IconOnlyProps;

export type ButtonLayout = NonNullable<ButtonProps["layout"]>;

/**
 * The class names that draw a button. Use it to make something that isn't a
 * <button> (a link, a calendar day) look like one.
 */
export function buttonClassName({
  variant = "primary",
  size = "l",
  layout = "icon and label",
}: { variant?: ButtonVariant; size?: ButtonSize; layout?: ButtonLayout } = {}) {
  return [
    styles.button,
    styles[variant],
    styles[`size-${size}`],
    variant.startsWith("link-") && styles.link,
    layout === "icon only" && styles.iconOnly,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "l",
  state = "default",
  layout = "icon and label",
  label,
  leftIcon,
  rightIcon,
  icon,
  disabled,
  type = "button",
  className,
  ...rest
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, layout });

  return (
    <button
      type={type}
      className={className ? `${classes} ${className}` : classes}
      disabled={disabled || state === "disabled"}
      data-state={state === "hover" || state === "pressed" ? state : undefined}
      {...rest}
    >
      {layout === "icon only" ? (
        <span className={styles.icon}>{icon}</span>
      ) : (
        <>
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
          <span className={styles.label}>{label}</span>
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
