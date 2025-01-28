import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkDownProps {
  content: string;
}

const MarkDown: FC<MarkDownProps> = ({ content }) => {
  const renderers: Components = {
    h2: ({ children }) => (
      <h2 className="mb-4 text-xl font-semibold text-gray-800">{children}</h2>
    ),

    p: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-gray-700">{children}</p>
    ),

    li: ({ children }) => (
      <li className="mb-2 ml-4 text-sm leading-relaxed text-gray-700">
        {children}
      </li>
    ),

    ul: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-4">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-4">{children}</ol>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;
