export function NoorLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-6xl' }
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`${sizeMap[size]} font-arabic text-noor-purple leading-none`}
        style={{ fontFamily: 'Amiri, serif' }}
      >
        النور
      </span>
      <span className="text-xs tracking-[0.3em] text-noor-muted uppercase font-light">
        Noor
      </span>
    </div>
  )
}