import clsx from 'clsx'
import { AudioLines, Rss } from 'lucide-react'
import React from 'react'

type Props = { selected: boolean }

const Blogs = ({ selected }: Props) => {
  return (
    <AudioLines
    className={clsx(
      'w-6 h-6 transition-all',
      'dark:group-hover:stroke-[#C8C7FF] dark:stroke-[#353346] stroke-[#BABABB] group-hover:stroke-[#7540A9]',
      { 'dark:!stroke-[#C8C7FF] stroke-[#7540A9]': selected }
    )}
  />
  )
}

export default Blogs
