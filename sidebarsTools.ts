import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  toolsSidebar: [
    {
      type: 'category',
      label: 'How to Setup Docker',
      collapsed: false,
      items: [
        'setup-docker/windows',
        'setup-docker/linux',
        'setup-docker/mac',
      ],
    },
  ],
};

export default sidebars;