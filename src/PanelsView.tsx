import { SettingsIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  BoxProps,
  Badge,
} from '@chakra-ui/react';
import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from '@xstate/react';
import { ActorsPanel, selectServices } from './ActorsPanel';
import { EventsPanel } from './EventsPanel';
import { ResizableBox } from './ResizableBox';
import { useSimulation } from './SimulationContext';
import { StatePanel } from './StatePanel';
import { EmbedMode } from './types';
import { calculatePanelIndexByPanelName } from './utils';

export const PanelsView = (props: BoxProps) => {
  const simService = useSimulation();
  const services = useSelector(simService, selectServices);
  const [activePanelIndex, setActiveTabIndex] = useState(0);

  return (
    <ResizableBox
      {...props}
      gridArea="panels"
      minHeight={0}
      disabled={false}
      hidden={false}
      data-testid="panels-view"
    >
      <Tabs
        bg="gray.200"
        display="grid"
        gridTemplateRows="3rem 1fr"
        height="100%"
        index={activePanelIndex}
        onChange={(index) => {
          setActiveTabIndex(index);
        }}
      >
        <TabList>
          <Tab>State</Tab>
          <Tab>Events</Tab>
          <Tab>
            Actors{' '}
            <Badge fontSize="x-small" marginLeft="1" colorScheme="white">
              {Object.values(services).length}
            </Badge>
          </Tab>
        </TabList>

        <TabPanels minHeight={0}>
          <TabPanel height="100%" overflowY="auto">
            <StatePanel />
          </TabPanel>
          <TabPanel height="100%" overflow="hidden">
            <EventsPanel />
          </TabPanel>
          <TabPanel height="100%" overflowY="auto">
            <ActorsPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ResizableBox>
  );
};
