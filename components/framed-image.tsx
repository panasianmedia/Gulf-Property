import { cn } from "@/lib/utils"

interface FramedImageProps {
  src: string
  alt: string
  /** Sizing classes for the frame, e.g. "aspect-video w-full". */
  className?: string
  /** Extra classes for the foreground image (e.g. hover effects). */
  imageClassName?: string
  /** Overlays such as badges. */
  children?: React.ReactNode
}

/**
 * Shows the whole image (never cropped) and fills any leftover space
 * with a blurred copy of the same picture.
 */
export function FramedImage({ src, alt, className, imageClassName, children }: FramedImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover blur-md"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={cn("relative h-full w-full object-contain", imageClassName)} />
      {children}
    </div>
  )
}
