import { useEffect, useState } from 'react'

export default function Test() {
  const [data, setData] = useState({ data: '' })

  useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])

  return (
    <div>
      <h3>{data.data}</h3>
    </div>
  )
}
