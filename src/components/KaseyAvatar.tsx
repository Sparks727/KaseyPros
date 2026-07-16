import './KaseyAvatar.css'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  src?: string
}

/**
 * Placeholder avatar for Kasey.
 * Drop images in public/images/kasey/ and pass src="/images/kasey/your-photo.jpg"
 */
export function KaseyAvatar({ size = 'md', animated = false, src }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt="Kasey"
        className={`kasey-avatar kasey-avatar--${size} ${animated ? 'kasey-avatar--animated' : ''}`}
      />
    )
  }

  return (
    <div
      className={`kasey-avatar kasey-avatar--placeholder kasey-avatar--${size} ${animated ? 'kasey-avatar--animated' : ''}`}
      aria-label="Kasey"
    >
      <span className="kasey-initial">K</span>
    </div>
  )
}
