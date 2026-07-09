import { useEffect, useRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Atom: textarea yang tingginya ikut isi (tanpa scrollbar dalam), biar menulis
// terasa mengalir seperti dokumen. Dipakai di editor materi.
export function AutoTextarea({
  className,
  value,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      rows={1}
      className={cn(
        'w-full resize-none overflow-hidden bg-transparent outline-none placeholder:text-mist/60',
        className,
      )}
      {...props}
    />
  )
}
