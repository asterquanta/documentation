import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/markdown-page',
    component: ComponentCreator('/documentation/markdown-page', '1c7'),
    exact: true
  },
  {
    path: '/documentation/search',
    component: ComponentCreator('/documentation/search', 'bab'),
    exact: true
  },
  {
    path: '/documentation/adk',
    component: ComponentCreator('/documentation/adk', '0e9'),
    routes: [
      {
        path: '/documentation/adk',
        component: ComponentCreator('/documentation/adk', 'd27'),
        routes: [
          {
            path: '/documentation/adk',
            component: ComponentCreator('/documentation/adk', '4df'),
            routes: [
              {
                path: '/documentation/adk/API/agent-interface',
                component: ComponentCreator('/documentation/adk/API/agent-interface', 'b46'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/base-executor',
                component: ComponentCreator('/documentation/adk/API/base-executor', '71d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/connector',
                component: ComponentCreator('/documentation/adk/API/connector', '8fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Environments/additive-action-env',
                component: ComponentCreator('/documentation/adk/API/Environments/additive-action-env', '56d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Environments/clipped-additive-action-env',
                component: ComponentCreator('/documentation/adk/API/Environments/clipped-additive-action-env', '0df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Environments/direct-action-env',
                component: ComponentCreator('/documentation/adk/API/Environments/direct-action-env', '6a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Environments/optimization-env',
                component: ComponentCreator('/documentation/adk/API/Environments/optimization-env', 'a49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/model-handler',
                component: ComponentCreator('/documentation/adk/API/model-handler', 'd4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/agent-data',
                component: ComponentCreator('/documentation/adk/API/Models/agent-data', '357'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/environment-data',
                component: ComponentCreator('/documentation/adk/API/Models/environment-data', 'ed9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/genie-model',
                component: ComponentCreator('/documentation/adk/API/Models/genie-model', '73d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/hyper-parameters',
                component: ComponentCreator('/documentation/adk/API/Models/hyper-parameters', '8f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/metadata',
                component: ComponentCreator('/documentation/adk/API/Models/metadata', '94c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/Optimization/design-parameters',
                component: ComponentCreator('/documentation/adk/API/Models/Optimization/design-parameters', 'ba5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/Optimization/optimization-node',
                component: ComponentCreator('/documentation/adk/API/Models/Optimization/optimization-node', 'e95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/Optimization/optimization-spec',
                component: ComponentCreator('/documentation/adk/API/Models/Optimization/optimization-spec', '415'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/Optimization/targets',
                component: ComponentCreator('/documentation/adk/API/Models/Optimization/targets', '3f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/target-specifications',
                component: ComponentCreator('/documentation/adk/API/Models/target-specifications', '8da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/Models/world-control-specifications',
                component: ComponentCreator('/documentation/adk/API/Models/world-control-specifications', 'acc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/optimization-context',
                component: ComponentCreator('/documentation/adk/API/optimization-context', '68e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/rl-agent-env',
                component: ComponentCreator('/documentation/adk/API/rl-agent-env', '21c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/API/rl-executor',
                component: ComponentCreator('/documentation/adk/API/rl-executor', 'dc4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/agent-settings',
                component: ComponentCreator('/documentation/adk/Basics/agent-settings', '650'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/agents',
                component: ComponentCreator('/documentation/adk/Basics/agents', '0b7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/environment-settings',
                component: ComponentCreator('/documentation/adk/Basics/environment-settings', 'c09'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/environments',
                component: ComponentCreator('/documentation/adk/Basics/environments', '9a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/introduction',
                component: ComponentCreator('/documentation/adk/Basics/introduction', '89a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/model-handling',
                component: ComponentCreator('/documentation/adk/Basics/model-handling', 'dd3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/models',
                component: ComponentCreator('/documentation/adk/Basics/models', '26c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/optimization-loop',
                component: ComponentCreator('/documentation/adk/Basics/optimization-loop', '959'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/rl-agents',
                component: ComponentCreator('/documentation/adk/Basics/rl-agents', 'a8c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/rl-run-data',
                component: ComponentCreator('/documentation/adk/Basics/rl-run-data', '12c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/Basics/specifications',
                component: ComponentCreator('/documentation/adk/Basics/specifications', '509'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/category/api',
                component: ComponentCreator('/documentation/adk/category/api', 'b21'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/category/basics',
                component: ComponentCreator('/documentation/adk/category/basics', 'e19'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/category/environments',
                component: ComponentCreator('/documentation/adk/category/environments', 'd04'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/category/models',
                component: ComponentCreator('/documentation/adk/category/models', '476'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/getting-started',
                component: ComponentCreator('/documentation/adk/getting-started', 'f7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/RL Executor/rl-executor',
                component: ComponentCreator('/documentation/adk/RL Executor/rl-executor', '26b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/running-on-the-cloud',
                component: ComponentCreator('/documentation/adk/running-on-the-cloud', '68d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/adk/what-to-do-next',
                component: ComponentCreator('/documentation/adk/what-to-do-next', 'a6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/connectors',
    component: ComponentCreator('/documentation/connectors', '0bb'),
    routes: [
      {
        path: '/documentation/connectors',
        component: ComponentCreator('/documentation/connectors', 'aad'),
        routes: [
          {
            path: '/documentation/connectors',
            component: ComponentCreator('/documentation/connectors', 'da2'),
            routes: [
              {
                path: '/documentation/connectors/cdk/baseconnector',
                component: ComponentCreator('/documentation/connectors/cdk/baseconnector', '2e6'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/cdk/basedomain',
                component: ComponentCreator('/documentation/connectors/cdk/basedomain', '6c7'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/cdk/basestartup',
                component: ComponentCreator('/documentation/connectors/cdk/basestartup', '15b'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/cdk/cdksettings',
                component: ComponentCreator('/documentation/connectors/cdk/cdksettings', '198'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/cdk/middleware',
                component: ComponentCreator('/documentation/connectors/cdk/middleware', 'd21'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/cdk/register',
                component: ComponentCreator('/documentation/connectors/cdk/register', 'dfe'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/cdk/router',
                component: ComponentCreator('/documentation/connectors/cdk/router', '5dd'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/intro',
                component: ComponentCreator('/documentation/connectors/intro', '2b9'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/simconnector',
                component: ComponentCreator('/documentation/connectors/simpackage/simconnector', '7e4'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/simcontroller',
                component: ComponentCreator('/documentation/connectors/simpackage/simcontroller', 'e5c'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/siminterface',
                component: ComponentCreator('/documentation/connectors/simpackage/siminterface', 'bf7'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/simulatordomain',
                component: ComponentCreator('/documentation/connectors/simpackage/simulatordomain', '00f'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/slim-models',
                component: ComponentCreator('/documentation/connectors/simpackage/slim-models', '9d9'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/spice/netlist-reader',
                component: ComponentCreator('/documentation/connectors/simpackage/spice/netlist-reader', '189'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/spice/netlistscope',
                component: ComponentCreator('/documentation/connectors/simpackage/spice/netlistscope', '807'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/spice/referrables',
                component: ComponentCreator('/documentation/connectors/simpackage/spice/referrables', 'f6b'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/spice/spice_ast',
                component: ComponentCreator('/documentation/connectors/simpackage/spice/spice_ast', 'b51'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/spice/spiceparser',
                component: ComponentCreator('/documentation/connectors/simpackage/spice/spiceparser', '211'),
                exact: true,
                sidebar: "connectorsSidebar"
              },
              {
                path: '/documentation/connectors/simpackage/spice/spicevariants',
                component: ComponentCreator('/documentation/connectors/simpackage/spice/spicevariants', 'fe8'),
                exact: true,
                sidebar: "connectorsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/docs',
    component: ComponentCreator('/documentation/docs', '289'),
    routes: [
      {
        path: '/documentation/docs',
        component: ComponentCreator('/documentation/docs', '846'),
        routes: [
          {
            path: '/documentation/docs',
            component: ComponentCreator('/documentation/docs', '492'),
            routes: [
              {
                path: '/documentation/docs/account management/type of accounts',
                component: ComponentCreator('/documentation/docs/account management/type of accounts', '12e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/account management/user-management',
                component: ComponentCreator('/documentation/docs/account management/user-management', '9b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/account-management',
                component: ComponentCreator('/documentation/docs/category/account-management', '480'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/circuit-options',
                component: ComponentCreator('/documentation/docs/category/circuit-options', '7bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/circuit-tutorials',
                component: ComponentCreator('/documentation/docs/category/circuit-tutorials', 'eba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/manage-circuit',
                component: ComponentCreator('/documentation/docs/category/manage-circuit', '813'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/manage-project',
                component: ComponentCreator('/documentation/docs/category/manage-project', '7b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/projects',
                component: ComponentCreator('/documentation/docs/category/projects', 'fa2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/category/tutorials',
                component: ComponentCreator('/documentation/docs/category/tutorials', '20b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/dashboard',
                component: ComponentCreator('/documentation/docs/dashboard', '56e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/faqs',
                component: ComponentCreator('/documentation/docs/faqs', 'ba6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/intro',
                component: ComponentCreator('/documentation/docs/intro', '5f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/login',
                component: ComponentCreator('/documentation/docs/login', '0eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/notifications',
                component: ComponentCreator('/documentation/docs/notifications', '65c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/overview',
                component: ComponentCreator('/documentation/docs/overview', '279'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/profile-logout',
                component: ComponentCreator('/documentation/docs/profile-logout', 'd80'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/authorize-projects',
                component: ComponentCreator('/documentation/docs/Projects/authorize-projects', '973'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/creating-a-project',
                component: ComponentCreator('/documentation/docs/Projects/creating-a-project', '437'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/dependencies',
                component: ComponentCreator('/documentation/docs/Projects/dependencies', 'ac0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/global-optimization',
                component: ComponentCreator('/documentation/docs/Projects/global-optimization', 'd8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/add-circuit',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/add-circuit', '0b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/analytics',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/analytics', '5c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/circuit-options/circuit-properties',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/circuit-options/circuit-properties', '2c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/circuit-options/copy-circuit',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/circuit-options/copy-circuit', '330'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/circuit-options/delete-circuit',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/circuit-options/delete-circuit', '06f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/circuit-options/manage-dependencies',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/circuit-options/manage-dependencies', '158'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/circuit-options/model-optimization',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/circuit-options/model-optimization', 'b3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/design-parameters',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/design-parameters', '24b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/env-parameters',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/env-parameters', '6b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/genie',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/genie', '6e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/measurements',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/measurements', 'ef4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/netlist',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/netlist', '22c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/simulation-setup',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/simulation-setup', 'd97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-circuits/testbenches',
                component: ComponentCreator('/documentation/docs/Projects/manage-circuits/testbenches', 'f10'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-projects/add-project',
                component: ComponentCreator('/documentation/docs/Projects/manage-projects/add-project', '0fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-projects/project-collaborate',
                component: ComponentCreator('/documentation/docs/Projects/manage-projects/project-collaborate', '91b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-projects/project-settings',
                component: ComponentCreator('/documentation/docs/Projects/manage-projects/project-settings', '454'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/manage-projects/publish-project',
                component: ComponentCreator('/documentation/docs/Projects/manage-projects/publish-project', '509'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/my-projects',
                component: ComponentCreator('/documentation/docs/Projects/my-projects', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/public-projects',
                component: ComponentCreator('/documentation/docs/Projects/public-projects', '3ec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/search-projects',
                component: ComponentCreator('/documentation/docs/Projects/search-projects', '594'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/Projects/transfer-learning',
                component: ComponentCreator('/documentation/docs/Projects/transfer-learning', 'f91'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/settings',
                component: ComponentCreator('/documentation/docs/settings', '4b8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorials/circuit tutorials/common-source-with-res-load',
                component: ComponentCreator('/documentation/docs/tutorials/circuit tutorials/common-source-with-res-load', '5e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorials/circuit tutorials/diff-amp-res-load',
                component: ComponentCreator('/documentation/docs/tutorials/circuit tutorials/diff-amp-res-load', '62a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorials/circuit tutorials/how-to-clone-a-project',
                component: ComponentCreator('/documentation/docs/tutorials/circuit tutorials/how-to-clone-a-project', 'c0f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorials/circuit tutorials/two-stage-opamp',
                component: ComponentCreator('/documentation/docs/tutorials/circuit tutorials/two-stage-opamp', '24e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/documentation/docs/tutorials/circuit tutorials/v2i',
                component: ComponentCreator('/documentation/docs/tutorials/circuit tutorials/v2i', 'e5d'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/tools',
    component: ComponentCreator('/documentation/tools', '637'),
    routes: [
      {
        path: '/documentation/tools',
        component: ComponentCreator('/documentation/tools', '8d0'),
        routes: [
          {
            path: '/documentation/tools',
            component: ComponentCreator('/documentation/tools', 'd49'),
            routes: [
              {
                path: '/documentation/tools/intro',
                component: ComponentCreator('/documentation/tools/intro', 'f45'),
                exact: true
              },
              {
                path: '/documentation/tools/setup-docker/linux',
                component: ComponentCreator('/documentation/tools/setup-docker/linux', '645'),
                exact: true,
                sidebar: "toolsSidebar"
              },
              {
                path: '/documentation/tools/setup-docker/mac',
                component: ComponentCreator('/documentation/tools/setup-docker/mac', '8bc'),
                exact: true,
                sidebar: "toolsSidebar"
              },
              {
                path: '/documentation/tools/setup-docker/windows',
                component: ComponentCreator('/documentation/tools/setup-docker/windows', '3d1'),
                exact: true,
                sidebar: "toolsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/',
    component: ComponentCreator('/documentation/', '4a1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
