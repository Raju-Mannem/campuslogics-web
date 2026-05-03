'use client';

import DOMPurify from 'isomorphic-dompurify';
import parse, { DOMNode, Element } from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  html: string;
}

export default function SafeHtmlClient({ html }: Props) {
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <>
      {parse(cleanHtml, {
        replace(node: DOMNode) {
          if (node instanceof Element && node.name === 'a') {
            return (
              <Link href={node.attribs.href ?? '#'}>
                {}
                {parse(node.children as any)}
              </Link>
            );
          }
          if (node instanceof Element && node.name === 'img') {
            const { src, alt = '', width, height } = node.attribs;
            return (
              <Image
                src={src}
                alt={alt}
                width={Number(width) || 800}
                height={Number(height) || 600}
                style={{ height: 'auto' }}
              />
            );
          }
        },
      })}
    </>
  );
}
