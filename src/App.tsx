import { Box, ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useActor, useInterpret, useSelector } from '@xstate/react';
import { AppHead } from './AppHead';
import { CanvasProvider } from './CanvasContext';
import { CanvasView } from './CanvasView';
import { isOnClientSide } from './isOnClientSide';
import { PaletteProvider } from './PaletteContext';
import { paletteMachine } from './paletteMachine';
import { PanelsView } from './PanelsView';
import { SimulationProvider } from './SimulationContext';
import { simulationMachine } from './simulationMachine';
import { theme } from './theme';
import { EditorThemeProvider } from './themeContext';
import { EmbedContext, EmbedMode } from './types';
import { useInterpretCanvas } from './useInterpretCanvas';
import router, { useRouter } from 'next/router';
import { parseEmbedQuery, withoutEmbedQueryParams } from './utils';
import { registryLinks } from './registryLinks';

const defaultHeadProps = {
  title: 'XState Visualizer',
  ogTitle: 'XState Visualizer',
  description: 'Visualizer for XState state machines and statecharts',
  // TODO - get an OG image for the home page
  ogImageUrl: null,
};

const VizHead = () => {
  return <AppHead {...defaultHeadProps} />;
};

const useReceiveMessage = (
  eventHandlers?: Record<string, (data: any) => void>,
) => {
  useEffect(() => {
    window.onmessage = async (message) => {
      const { data } = message;
      eventHandlers && eventHandlers[data.type]?.(data);
    };
  }, []);
};

function App() {
  const paletteService = useInterpret(paletteMachine);
  // don't use `devTools: true` here as it would freeze your browser
  const simService = useInterpret(simulationMachine);
  const machine = useSelector(simService, (state) => {
    return state.context.currentSessionId
      ? state.context.serviceDataMap[state.context.currentSessionId!]?.machine
      : undefined;
  });

  const canvasService = useInterpretCanvas({
    sourceID: null,
  });

  // This is because we're doing loads of things on client side anyway
  if (!isOnClientSide()) return <VizHead />;

  return (
    <>
      <VizHead />
      <ChakraProvider theme={theme}>
        <EditorThemeProvider>
          <PaletteProvider value={paletteService}>
            <SimulationProvider value={simService}>
              <Box
                data-testid="app"
                data-viz-theme="dark"
                as="main"
                display="grid"
                gridTemplateColumns="1fr auto"
                gridTemplateAreas={`"canvas panels"`}
                height="100vh"
              >
                <CanvasProvider value={canvasService}>
                  <CanvasView />
                </CanvasProvider>
                <PanelsView />
              </Box>
            </SimulationProvider>
          </PaletteProvider>
        </EditorThemeProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
