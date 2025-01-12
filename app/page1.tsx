


// export default function MyExampleComponent() {
//     return (<div>Hello, Next.js!</div>)
// }

import Link from 'next/link'
 
export default function Page1() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}