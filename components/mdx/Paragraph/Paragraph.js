import {Image} from '@components/mdx'

export default function Paragraph({children}) {
  if (children?.type === 'img') {
    const {src, alt} = children.props
    return <Image src={src} alt={alt} />
  }

  return <p>{children}</p>
}
