import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  console.log(router)

  const path = router.asPath
  return <div>このページのパスは{path}です。</div>
}
