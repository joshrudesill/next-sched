import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router';

export default function Home({ json }) {
  return (
    <div>
      {
        json ? json.error : 'asdf'
      }
    </div>
  )
}

