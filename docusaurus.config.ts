import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'zkAGI Docs',
  tagline: 'Privacy you can prove, not just promise.',
  favicon: 'img/logo.png',

  future: { v4: true },

  url: 'https://docs.zkagi.ai',
  baseUrl: '/',

  organizationName: 'ZkAGI',
  projectName: 'documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ZkAGI/documentation/tree/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/zkagi-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'rnd-honesty',
      content:
        'Parts of this platform are <b>active R&D</b>. We label every capability honestly. See the <a href="/docs/trust-center/status">status board</a>.',
      isCloseable: true,
    },
    navbar: {
      title: 'zkAGI',
      logo: { alt: 'zkAGI', src: 'img/logo.png' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/docs/api/quickstart', label: 'Quickstart', position: 'left' },
        { to: '/docs/trust-center/status', label: 'Status', position: 'left' },
        {
          href: 'https://zkagi.ai',
          label: 'zkagi.ai',
          position: 'right',
        },
        {
          href: 'https://github.com/ZkAGI',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: '/contact',
          label: 'Talk to us',
          position: 'right',
          className: 'zk-navbar-cta',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Understand',
          items: [
            { label: 'Welcome', to: '/docs' },
            { label: 'In plain words', to: '/docs/plain-words' },
            { label: 'Trust domains', to: '/docs/trust/trust-domains' },
            { label: 'Tiers', to: '/docs/trust/tiers' },
            { label: 'Receipts', to: '/docs/platform/receipts' },
          ],
        },
        {
          title: 'Build',
          items: [
            { label: 'Quickstart', to: '/docs/api/quickstart' },
            { label: 'Zynapse API', to: '/docs/api/zynapse' },
            { label: 'Selective disclosure', to: '/docs/platform/selective-disclosure' },
            { label: 'GitHub', href: 'https://github.com/ZkAGI' },
          ],
        },
        {
          title: 'Trust center',
          items: [
            { label: 'Status board', to: '/docs/trust-center/status' },
            { label: 'Security model', to: '/docs/trust-center/security-model' },
            { label: 'Disclosures', to: '/docs/trust-center/disclosures' },
            { label: 'Talk to us', to: '/contact' },
          ],
        },
        {
          title: 'Company',
          items: [
            { label: 'zkagi.ai', href: 'https://zkagi.ai' },
            { label: 'Sovereign AI', href: 'https://zkagi.ai/sovereign' },
            { label: 'Trust domains', href: 'https://zkagi.ai/#trust-domains' },
            { label: 'The Explorer', href: 'https://zkagi.ai/#explorer' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'X / Twitter', href: 'https://www.twitter.com/zk_Agi' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zkagi' },
            { label: 'Telegram', href: 'https://t.me/ZkAGI_AI' },
            { label: 'YouTube', href: 'https://www.youtube.com/@ZkAGI' },
            { label: 'Medium', href: 'https://zkagi.medium.com' },
          ],
        },
      ],
      copyright: `Built with gratitude for the community that ran the nodes, filed the issues, and believed early. This is your work too. ♥<br/>zkAGI provides technical evidence and audit-preparation assistance, not audits, certifications or legal advice. Some capabilities are under active R&D and are configured per engagement; your agreement with zkAGI governs. Built for peaceful, civilian use.<br/>© ${new Date().getFullYear()} zkAGI · Switzerland · EU · APAC`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
