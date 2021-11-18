import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Pokemon - List' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="py-4 px-4 bg-black text-white">
        <Link href="/">
          <a>POKEMON WIKI</a>
        </Link>
      </nav>
    </header>
    {children}
  </div>
)

export default Layout
