import { cva } from "class-variance-authority"
import { cn } from "../../utils/utils.js";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-borderColor hover:bg-accent hover:text-accent-foreground",
        link: 
          "underline-offset-4 hover:underline text-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        hidden:
          "text-white font-bold font-manrope bg-transparent"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: 'h-9 px-2 rounded-md',
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ className, children, size, variant, href, isLoading = false, ...props }) {
  return href 
    ? <Link to={href} disabled={isLoading} className={cn(buttonVariants({ variant, size, className }))}>{children}</Link>
    : <button disabled={isLoading} className={cn(buttonVariants({ variant, size, className }))} {...props}>{children}</button>
}

export { Button, buttonVariants };