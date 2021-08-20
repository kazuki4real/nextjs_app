import React from 'react'
import { useRouter } from 'next/router'

const Sample = () => {
  const router = useRouter()
  const path = router.asPath
  return <div>このページのパスは{path}です。</div>
}

export default Sample
