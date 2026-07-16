import './KaseyAvatar.css'
import { KASEY_AVATAR_SRC } from '../constants/kasey'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  src?: string
}

export function KaseyAvatar({ size = 'md', animated = false, src = KASEY_AVATAR_SRC }: Props) {
  return (
    <img
      src={src}
      alt="Kasey"
      className={`kasey-avatar kasey-avatar--${size} ${animated ? 'kasey-avatar--animated' : ''}`}
    />
  )
}
