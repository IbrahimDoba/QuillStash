import Link from 'next/link'
import React from 'react'

const Tag = ({name} : {name:string}) => {
  return (
    
    <Link href={`/tags/${name}`}>
      {name}
    </Link>
  )
}

export default Tag
