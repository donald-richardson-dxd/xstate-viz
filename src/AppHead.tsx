import * as React from 'react';
import Head from 'next/head';
import { featureFlags } from './featureFlags';

export interface AppHeadProps {
  /**
   * @example
   * XState Visualizer | My Great Machine
   */
  title: string;
  /**
   * Og titles are expected to be more concise,
   * whereas titles in the <title> attribute
   * should be SEO-friendly
   *
   * @example
   * My Great Machine
   */
  ogTitle: string;
  description: string;
  ogImageUrl: string | null;
  importElk?: boolean;
}

export const AppHead = ({ importElk = true, ...props }: AppHeadProps) => {
  return (
    <Head>
      <link rel="apple-touch-icon" href="/favicon@256.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.png" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      {importElk && (
        <script src="/elk.bundled.js"></script>
      )}
    </Head>
  );
};
