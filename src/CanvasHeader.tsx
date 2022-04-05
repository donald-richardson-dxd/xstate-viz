import {
  HStack,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { Logo } from './Logo';

export const CanvasHeader: React.FC = () => {
  return (
    <HStack zIndex={1} justifyContent="space-between" height="3rem">
      <Link
        href="/"
        title="Stately.ai"
        display="block"
        height="100%"
        _hover={{
          opacity: 0.8,
        }}
        target="_blank"
        rel="noreferrer"
      >
        <Logo
          fill="white"
          style={{
            // @ts-ignore
            '--fill': 'white',
            height: '100%',
            padding: '0 .5rem',
          }}
          aria-label="Stately"
        />
      </Link>
    </HStack>
  );
};
