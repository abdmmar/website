import {Image} from '@components/Blog'

export default function Paragraph({children}) {
  if (children?.type?.name === 'Image') {
    const {src, alt} = children.props
    return <Image src={src} alt={alt} />
  }

  return <p>{children}</p>
}
