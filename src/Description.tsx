import ReactMarkdown from "react-markdown"
import { a, useTransition } from "@react-spring/web"
import { useSnapshot, state } from "./state"

import { pages } from "./pages"

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="text-3xl font-bold my-8" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-xl font-bold mb-4 mt-8" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="bg-gray-800 rounded px-1" {...props} />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre className="bg-gray-800 rounded text-xs p-4" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => <p className="my-2" {...props} />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="text-purple-500" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-blue-500 underline my-0" {...props} />
  ),
}

export function Description() {
  const snap = useSnapshot(state)
  const transition = useTransition(snap.step, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 100,
    },
  })
  return (
    <div className="absolute top-0 left-0 text-white p-10 w-[700px]">
      <nav className="flex space-x-2">
        <button
          className="bg-purple-200 bg-opacity(0 hover:20) border-purple-500 border disabled:opacity-20 px-2 py-1 rounded font-semibold"
          disabled={!snap.canPrev}
          onClick={() => state.step--}
        >
          ← Prev
        </button>
        <button
          className="bg-purple-200 bg-opacity(0 hover:20) border-purple-500 border disabled:opacity-20 px-2 py-1 rounded font-semibold"
          disabled={!snap.canNext}
          onClick={() => state.step++}
        >
          Next →
        </button>
      </nav>
      <div className="relative">
        {transition((style, step) => (
          <a.main style={style}>
            <ReactMarkdown components={components} children={pages[step]} />
          </a.main>
        ))}
      </div>
    </div>
  )
}
