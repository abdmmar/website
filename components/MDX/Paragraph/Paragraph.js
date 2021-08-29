import {Image} from '@components/mdx'

export default function Paragraph({children}) {
  if (children?.type?.name === 'Image1') {
    const {src, alt} = children.props
    return <Image src={src} alt={alt} />
  }

  return <p>{children}</p>
}
