import { cosh } from 'core-js/fn/math';
import React, { useRef, useLayoutEffect } from 'react';
import { useColorMode } from 'theme-ui';

export interface ICommentsProps {
  repo: string;
  theme: string;
}

const utterancesSelector = 'iframe.utterances-frame';

const ArticleComments: React.FC<ICommentsProps> = () => {
  const [colorMode] = useColorMode();
  const utterancesTheme = colorMode === `dark` ? 'github-dark' : 'github-light';
  const containerRef = useRef<HTMLDivElement>(null);
  const utterancesEl = containerRef.current?.querySelector(
    utterancesSelector
  ) as HTMLIFrameElement | null;

  useLayoutEffect(() => {
    const createUtterancesEl = () => {
      const script = document.createElement('script');

      const attributes = {
        src: 'https://utteranc.es/client.js',
        repo: 'positiveko/positiveko-blog',
        'issue-term': 'pathname',
        label: '✨💬 comments ✨',
        theme: 'github-light',
        crossOrigin: 'anonymous',
        async: 'true',
      };

      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      containerRef.current.appendChild(script);
    };

    createUtterancesEl();
  }, []);

  useLayoutEffect(() => {
    if (!utterancesEl) {
      return;
    }

    const message = {
      type: 'set-theme',
      theme: utterancesTheme,
    };

    utterancesEl.contentWindow.postMessage(message, 'https://utteranc.es');
  }, [utterancesEl, utterancesTheme]);

  return <div ref={containerRef} />;
};

ArticleComments.displayName = 'Utterances';

export default ArticleComments;
