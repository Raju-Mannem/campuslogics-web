import { Editor, Range } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import tippy, { Instance as TippyInstance, GetReferenceClientRect } from 'tippy.js'
import { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion'
import { CommandList, CommandListRef, CommandItem } from './CommandList'

export interface SuggestionItem extends CommandItem {
  command: (props: { editor: Editor; range: Range }) => void
}

const suggestionConfig = {
  items: ({ query }: { query: string }): SuggestionItem[] => {
    return [
      { 
        title: 'Text', 
        command: ({ editor, range }: { editor: Editor; range: Range }) => 
          editor.chain().focus().deleteRange(range).setNode('paragraph').run() 
      },
      { 
        title: 'Heading 1', 
        command: ({ editor, range }: { editor: Editor; range: Range }) => 
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run() 
      },
      { 
        title: 'Heading 2', 
        command: ({ editor, range }: { editor: Editor; range: Range }) => 
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run() 
      },
      { 
        title: 'Bullet List', 
        command: ({ editor, range }: { editor: Editor; range: Range }) => 
          editor.chain().focus().deleteRange(range).toggleBulletList().run() 
      },
      { 
        title: 'Image', 
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().deleteRange(range).run()
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.onchange = async () => {
            if (input.files?.[0]) {
              // Upload logic
            }
          }
          input.click()
        } 
      },
    ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()))
  },

  render: () => {
    let component: ReactRenderer<CommandListRef, SuggestionProps<SuggestionItem>> | null = null
    let popup: TippyInstance[] | null = null

    return {
      onStart: (props: SuggestionProps<SuggestionItem>) => {
        component = new ReactRenderer(CommandList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) return

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: SuggestionProps<SuggestionItem>) {
        component?.updateProps(props)

        if (!props.clientRect || !popup) return

        popup[0].setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        })
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event.key === 'Escape') {
          popup?.[0].hide()
          return true
        }
        return component?.ref?.onKeyDown(props) ?? false
      },

      onExit() {
        popup?.[0].destroy()
        component?.destroy()
      },
    }
  },
}

export default suggestionConfig