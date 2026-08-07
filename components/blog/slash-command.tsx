"use client";

import "tippy.js/dist/tippy.css";
import { Extension } from "@tiptap/core";
import type { Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  type Ref,
} from "react";

export type SlashItem = {
  title: string;
  description: string;
  command: (props: { editor: Editor; range: Range }) => void;
};

function getItems(query: string, onImage: () => void): SlashItem[] {
  const all: SlashItem[] = [
    {
      title: "Texto",
      description: "Parágrafo simples",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setParagraph().run();
      },
    },
    {
      title: "Título H2",
      description: "Secção principal",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHeading({ level: 2 })
          .run();
      },
    },
    {
      title: "Título H3",
      description: "Subsecção",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setHeading({ level: 3 })
          .run();
      },
    },
    {
      title: "Lista",
      description: "Lista com marcadores",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Lista numerada",
      description: "1, 2, 3…",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Citação",
      description: "Bloco de citação",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: "Imagem",
      description: "Inserir imagem",
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        onImage();
      },
    },
  ];

  const q = query.toLowerCase().trim();
  if (!q) return all;
  return all.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q),
  );
}

type ListProps = {
  items: SlashItem[];
  command: (item: SlashItem) => void;
};

type ListHandle = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

const SlashList = forwardRef(function SlashList(
  { items, command }: ListProps,
  ref: Ref<ListHandle>,
) {
  const [selected, setSelected] = useState(0);

  useEffect(() => setSelected(0), [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelected((i) => (i + items.length - 1) % Math.max(items.length, 1));
        return true;
      }
      if (event.key === "ArrowDown") {
        setSelected((i) => (i + 1) % Math.max(items.length, 1));
        return true;
      }
      if (event.key === "Enter") {
        const item = items[selected];
        if (item) command(item);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return (
      <div className="slash-menu rounded-lg border border-white/15 bg-[#0d1218] p-3 text-sm text-white/45 shadow-xl">
        Sem resultados
      </div>
    );
  }

  return (
    <div className="slash-menu w-64 overflow-hidden rounded-lg border border-white/15 bg-[#0d1218] py-1 shadow-xl">
      {items.map((item, index) => (
        <button
          key={item.title}
          type="button"
          onClick={() => command(item)}
          className={`flex w-full flex-col px-3 py-2 text-left transition-colors ${
            index === selected ? "bg-moz-teal/15" : "hover:bg-white/5"
          }`}
        >
          <span className="text-sm font-semibold text-white">{item.title}</span>
          <span className="text-xs text-white/45">{item.description}</span>
        </button>
      ))}
    </div>
  );
});

export function createSlashExtension(onImage: () => void) {
  return Extension.create({
    name: "slashCommand",

    addOptions() {
      return {
        suggestion: {
          char: "/",
          allowSpaces: false,
          startOfLine: false,
          items: ({ query }: { query: string }) => getItems(query, onImage),
          render: () => {
            let component: ReactRenderer<ListHandle> | null = null;
            let popup: TippyInstance[] | null = null;

            return {
              onStart: (props) => {
                component = new ReactRenderer(SlashList, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) return;

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect as () => DOMRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                  theme: "slash",
                });
              },
              onUpdate: (props) => {
                component?.updateProps(props);
                popup?.[0]?.setProps({
                  getReferenceClientRect: props.clientRect as () => DOMRect,
                });
              },
              onKeyDown: (props) => {
                if (props.event.key === "Escape") {
                  popup?.[0]?.hide();
                  return true;
                }
                return component?.ref?.onKeyDown(props) ?? false;
              },
              onExit: () => {
                popup?.[0]?.destroy();
                component?.destroy();
              },
            };
          },
          command: ({
            editor,
            range,
            props,
          }: {
            editor: Editor;
            range: Range;
            props: SlashItem;
          }) => {
            props.command({ editor, range });
          },
        } as Partial<SuggestionOptions<SlashItem>>,
      };
    },

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          ...this.options.suggestion,
        }),
      ];
    },
  });
}
