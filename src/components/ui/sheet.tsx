import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Sheet presentation built on the project's shadcn Base UI Dialog primitives.
const Sheet = Dialog
const SheetTrigger = DialogTrigger
const SheetTitle = DialogTitle
const SheetDescription = DialogDescription

function SheetContent({ children, className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(90vw,24rem)] flex-col gap-4 overflow-y-auto border-l bg-background p-5 text-foreground shadow-xl outline-none",
          className,
        )}
        {...props}
      >
        <DialogClose render={<Button variant="ghost" className="h-10 self-end" />}>
          Закрыть
        </DialogClose>
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

export { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription }
