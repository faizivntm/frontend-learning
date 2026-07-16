import { useState } from 'react'
import { FaMugHot, FaTimes } from 'react-icons/fa'
import trakteerImg from '@/assets/trakter-kodein.png'

// ponytail: ganti dengan handle Trakteer/Saweria asli kamu.
const TRAKTEER_URL = 'https://trakteer.id/faizivntm'

// Organism: tombol floating "traktir kopi" + modal, gaya brutalist.
export function TrakteerFab() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Traktir kopi di Trakteer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 border-2 border-line bg-tide px-4 py-3 text-sm font-bold text-foam shadow-brutal brutal-press"
      >
        <FaMugHot className="h-5 w-5" /> Traktir kopi
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm border-2 border-line bg-deep p-6 text-center shadow-brutal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="absolute right-3 top-3 border-2 border-line bg-surf p-1.5 text-foam brutal-press"
            >
              <FaTimes className="h-4 w-4" />
            </button>

            <img src={trakteerImg} alt="Trakteer kodein" className="mx-auto h-40 w-auto" />
            <p className="mt-4 text-lg font-bold text-foam">Materi ini gratis 🎉</p>
            <p className="mt-1 text-sm text-mist">Kalau kebantu, boleh traktir kopi ☕</p>

            <a
              href={TRAKTEER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 border-2 border-line bg-tide px-5 py-3 text-sm font-bold text-foam shadow-brutal brutal-press"
            >
              <FaMugHot className="h-4 w-4" /> Traktir di Trakteer
            </a>
          </div>
        </div>
      )}
    </>
  )
}
