import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import type { ReactNode } from 'react'
import {
  FaBold,
  FaCode,
  FaFileCode,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaRotateLeft,
  FaRotateRight,
} from 'react-icons/fa6'

// Organism: editor rich-text ala Medium/Docs (TipTap/ProseMirror).
// Paste dari ChatGPT/Docs/Word otomatis jadi HTML terformat.
// Nilai keluar-masuk berupa string HTML.
export function RichEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({
        placeholder:
          placeholder ??
          'Mulai menulis… tempel dari mana saja, formatnya otomatis rapi.',
      }),
    ],
    content: value,
    editorProps: {
      attributes: { class: 'rich min-h-[50vh] max-w-none outline-none' },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const chain = () => editor.chain().focus()
  return (
    <div className="sticky top-[6.5rem] z-30 mb-4 flex flex-wrap items-center gap-0.5 rounded-xl border border-line bg-deep/90 p-1 backdrop-blur">
      <Btn active={editor.isActive('bold')} onClick={() => chain().toggleBold().run()} label="Tebal">
        <FaBold className="h-3.5 w-3.5" />
      </Btn>
      <Btn active={editor.isActive('italic')} onClick={() => chain().toggleItalic().run()} label="Miring">
        <FaItalic className="h-3.5 w-3.5" />
      </Btn>

      <Sep />

      <Btn
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => chain().toggleHeading({ level: 2 }).run()}
        label="Judul besar"
      >
        <span className="text-xs font-bold">H2</span>
      </Btn>
      <Btn
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => chain().toggleHeading({ level: 3 }).run()}
        label="Judul kecil"
      >
        <span className="text-xs font-bold">H3</span>
      </Btn>

      <Sep />

      <Btn active={editor.isActive('bulletList')} onClick={() => chain().toggleBulletList().run()} label="Daftar poin">
        <FaListUl className="h-3.5 w-3.5" />
      </Btn>
      <Btn active={editor.isActive('orderedList')} onClick={() => chain().toggleOrderedList().run()} label="Daftar bernomor">
        <FaListOl className="h-3.5 w-3.5" />
      </Btn>
      <Btn active={editor.isActive('blockquote')} onClick={() => chain().toggleBlockquote().run()} label="Kutipan">
        <FaQuoteRight className="h-3.5 w-3.5" />
      </Btn>

      <Sep />

      <Btn active={editor.isActive('code')} onClick={() => chain().toggleCode().run()} label="Kode sebaris">
        <FaCode className="h-3.5 w-3.5" />
      </Btn>
      <Btn active={editor.isActive('codeBlock')} onClick={() => chain().toggleCodeBlock().run()} label="Blok kode">
        <FaFileCode className="h-3.5 w-3.5" />
      </Btn>

      <Sep />

      <Btn onClick={() => chain().undo().run()} disabled={!editor.can().undo()} label="Urungkan">
        <FaRotateLeft className="h-3.5 w-3.5" />
      </Btn>
      <Btn onClick={() => chain().redo().run()} disabled={!editor.can().redo()} label="Ulangi">
        <FaRotateRight className="h-3.5 w-3.5" />
      </Btn>
    </div>
  )
}

function Btn({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`grid h-8 w-8 place-items-center rounded-lg transition-colors disabled:opacity-30 ${
        active ? 'bg-surf/15 text-surf' : 'text-mist hover:bg-white/5 hover:text-foam'
      }`}
    >
      {children}
    </button>
  )
}

const Sep = () => <span className="mx-1 h-5 w-px bg-line" />
