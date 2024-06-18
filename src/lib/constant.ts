import Category from '@/components/icons/category'
import Logs from '@/components/icons/clipboard'
import Templates from '@/components/icons/cloud_download'
import Home from '@/components/icons/home'
import Payment from '@/components/icons/payment'
import Settings from '@/components/icons/settings'
import Workflows from '@/components/icons/workflows'
import Blogs from '@/components/icons/blogs'
import Projects from '@/components/icons/projects'

export const menuOptions = [
    { name: 'Dashboard', Component: Home, href: '/dashboard' },
    { name: 'Blogs', Component: Payment, href: '/blogs' },
    { name: 'Projects', Component: Logs, href: '/projects' },
    { name: 'Connections', Component: Category, href: '/connections' },
    { name: 'Settings', Component: Settings, href: '/settings' },
    { name: 'Templates', Component: Templates, href: '/templates' },
    // { name: 'Logs', Component: Logs, href: '/logs' },
    // { name: 'Billing', Component: Payment, href: '/billing' },
  ]

  export const clients = [...new Array(10)].map((client, index) => ({
    href: `/test/${index + 1}.png`,
  }))
  
  export const products = [
    {
      title: 'Moonbeam',
      link: 'https://gomoonbeam.com',
      thumbnail: '/test/p1.png',
    },
    {
      title: 'Cursor',
      link: 'https://cursor.so',
      thumbnail: '/test/p2.png',
    },
    {
      title: 'Rogue',
      link: 'https://userogue.com',
      thumbnail: '/test/p3.png',
    },
  
    {
      title: 'Editorially',
      link: 'https://editorially.org',
      thumbnail: '/test/p4.png',
    },
    {
      title: 'Editrix AI',
      link: 'https://editrix.ai',
      thumbnail: '/test/p5.png',
    },
    {
      title: 'Pixel Perfect',
      link: 'https://app.pixelperfect.quest',
      thumbnail: '/test/p6.png',
    },
  
    {
      title: 'Algochurn',
      link: 'https://algochurn.com',
      thumbnail: '/test/p1.png',
    },
    {
      title: 'Aceternity UI',
      link: 'https://ui.aceternity.com',
      thumbnail: '/test/p2.png',
    },
    {
      title: 'Tailwind Master Kit',
      link: 'https://tailwindmasterkit.com',
      thumbnail: '/test/p3.png',
    },
    {
      title: 'SmartBridge',
      link: 'https://smartbridgetech.com',
      thumbnail: '/test/p4.png',
    },
    {
      title: 'Renderwork Studio',
      link: 'https://renderwork.studio',
      thumbnail: '/test/p5.png',
    },
  
    {
      title: 'Creme Digital',
      link: 'https://cremedigital.com',
      thumbnail: '/test/p6.png',
    },
    {
      title: 'Golden Bells Academy',
      link: 'https://goldenbellsacademy.com',
      thumbnail: '/test/p1.png',
    },
    {
      title: 'Invoker Labs',
      link: 'https://invoker.lol',
      thumbnail: '/test/p2.png',
    },
    {
      title: 'E Free Invoice',
      link: 'https://efreeinvoice.com',
      thumbnail: '/test/p3.png',
    },
  ]