import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

// Custom Toaster component that wraps around Sonner with theme support
const Toaster = ({ ...props }: ToasterProps) => {
  // Get the current theme from next-themes, defaulting to "system"
  const { theme = "system" } = useTheme()

  // Pass down the theme prop correctly and spread other props to Sonner
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} // Cast the theme to the correct type
      className="toaster group" // Apply custom className for styling
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
        },
      }}
      {...props} // Spread the remaining props to Sonner
    />
  )
}

export { Toaster }
