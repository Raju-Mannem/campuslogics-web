'use client'

import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Heading1, Heading2, List, Image as ImageIcon, Text } from 'lucide-react'
import { SuggestionProps } from '@tiptap/suggestion'

export interface CommandItem {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  command: (props: { editor: any; range: any }) => void
}

export interface CommandListProps extends SuggestionProps<CommandItem> {
  items: CommandItem[]
}

export interface CommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

export const CommandList = forwardRef<CommandListRef, CommandListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
        return true
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length)
        return true
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex)
        return true
      }
      return false
    },
  }))

  return (
    <div className="z-50 h-auto min-w-[200px] overflow-y-auto rounded-md border border-gray-200 bg-white p-1 shadow-md">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            key={index}
            onClick={() => selectItem(index)}
            className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${
              index === selectedIndex ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            }`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 bg-white">
              {item.title === 'Heading 1' && <Heading1 size={14} />}
              {item.title === 'Heading 2' && <Heading2 size={14} />}
              {item.title === 'Bullet List' && <List size={14} />}
              {item.title === 'Image' && <ImageIcon size={14} />}
              {item.title === 'Text' && <Text size={14} />}
            </div>
            {item.title}
          </button>
        ))
      ) : (
        <div className="px-2 py-1.5 text-sm text-gray-500">No results</div>
      )}
    </div>
  )
})

CommandList.displayName = 'CommandList'