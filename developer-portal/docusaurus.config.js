const lightCodeTheme = require('prism-react-renderer/themes/dracula');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
  
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'VTEX IO',
  tagline: 'Documentation Portal',
  url: 'https://vtexio.netlify.app',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'vtex', // Usually your GitHub org/user name.
  projectName: 'developer-portal', // Usually your repo name.
  themes: ['@docusaurus/theme-live-codeblock'],
  stylesheets: [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
  ],
  customFields:{
    events: require("./static/data/releases"),
  },
  themeConfig: {
    zoom: {
      selector: '.markdown :not(em) > img',
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        }
      }
    },
    hideableSidebar: true,
    zoomSelector: '.markdown :not(em) > img',
    colorMode: {
      defaultMode: 'light',
      disableSwitch:true,
      respectPrefersColorScheme: false
    },
    announcementBar: {
      id: 'support_us',
      content:
      `📢 Stay up to date with our <a href="/releases">latest releases</a>! Join the <a target="_blank" rel="noopener noreferrer" href="https://community.vtex.com/">Community</a> and leave us a <a target="_blank" rel="noopener noreferrer" href="LINK" >Feedback</a>.`,
      backgroundColor: "#FFF3F6",
      textColor: "#142032",
      isCloseable: true,
    },
    navbar: {

      logo: {
        alt: 'VTEX',
        src: 'img/iologo.svg',
      },
      items: [        
        {
          type: 'doc',
          docId: 'shopping-experiences/overview',
          position: 'left',
          label: 'Shopping Experiences',
        },
        {
          type: 'doc',
          docId: 'apps/overview',
          position: 'left',
          label: 'Apps & Integrations',
        },
        {
          href: "/faq",
          label: "FAQ",
          position: "left",
          target: "_self",
          className: "FAQbar"
        },
        {
          type: 'dropdown',
          label: 'Developer Tools',
          position: 'left',
          items: [
            {
              type: 'doc',
              label: 'Overview',
              docId: 'developer-tools/overview',
            },
            {
              type: 'doc',
              label: 'WebOps',
              docId: 'developer-tools/webops/overview',
            },
            {
              type: 'doc',
              label: 'VTEX IO CLI',
              docId: 'developer-tools/webops/overview',
            },
            {
              label: 'Release Notes',
              to: 'releases',
            },
          ]
        },
        {
          type: 'doc',
          label: 'FastStore',
          position: 'left',
          docId: 'faststore/overview'
        },
        {
          label: 'Release Notes',
          to: 'releases',
          position: 'right',
        },
        {
          href: 'https://community.vtex.com/',
          label: 'Community',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: 'b569ca818413cccb8e41edbcb1dd5161',
      indexName: 'devportal',
      appId: 'OAXP53H7GY',
    },
    footer: {
      logo: {
        alt: 'VTEX Logo',
        src: 'img/white-vtex.svg',
        href: 'https://vtex.com',
      },
      style: 'dark',
      links: [
        {
          title: 'Solutions',
          items: [
            {
              label: 'Apps & Integrations',
              to: '/apps/overview',
            },
            {
              label: 'Shopping Experiences',
              to: '/shopping-experiences/overview',
            }
          ],
        },
        {
          title: 'Frameworks and Tools',
          items: [
            {
              label: 'VTEX IO WebOps',
              to: '/developer-tools/webops/overview',
            },
            {
              label: 'FastStore',
              to: '/faststore/overview',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'VTEX Community',
              href: 'https://community.vtex.com/',
            },            
            {
              label: 'GitHub',
              href: 'https://github.com/vtex',
            },
            {
              label: 'Release Notes',
              to: '/releases',
            },
            {
              label: 'FAQ',
              to: '/faq',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VTEX IO Developer Portal, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/vtex/edit/main/',
        },
        blog: {
          routeBasePath: 'releases',
          showReadingTime: true,
          blogSidebarTitle: 'Updates',
          blogSidebarCount: 'ALL',
          blogTitle: 'Release Notes'         
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom')
  ],
};
