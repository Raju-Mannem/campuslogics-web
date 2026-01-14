import parse, { DOMNode, Element, domToReact, HTMLReactParserOptions } from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import { DOMPurify } from '@/lib/dompurify';
import { useMemo } from 'react';

type Props = {
  html: string;
};

export default function SafeHtml({ html }: Props) {
  const cleanHtml = useMemo(
    () => DOMPurify.sanitize(html),
    [html]
  );

  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (!(node instanceof Element)) {
        return;
      }

      const children = domToReact(node.children as DOMNode[], options);

      if (node.name === 'h1') {
        return <h2 className="text-xl font-bold">{children}</h2>;
      }

      if (node.name === 'a') {
        const href = node.attribs.href || '#';
        const isExternal = href.startsWith('http');

        return (
          <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {children}
          </Link>
        );
      }

      if (node.name === 'img') {
        const { src, alt = '', width, height } = node.attribs;

        if (!src) return null;

        return (
          <Image
            src={src}
            alt={alt}
            width={Number(width) || 800}
            height={Number(height) || 600}
            style={{ height: 'auto' }}
            unoptimized={src.startsWith('http')} 
          />
        );
      }
    },
  };

  return (
    <div className="prose prose-slate max-w-none w-full">
      {parse(cleanHtml, options)}
    </div>
  );
}