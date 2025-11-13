export const RESOURCE_TYPE_OPTIONS = [
  { label: 'Reading List', value: 'READING_LIST' },
  { label: 'Tech Essentials', value: 'TECH_ESSENTIALS' },
  { label: 'Wallpapers', value: 'WALLPAPERS' },
  { label: 'Talent', value: 'TALENT' },
  { label: 'Investments', value: 'INVESTMENT' },
  { label: 'Newsletters', value: 'NEWSLETTER' },
  { label: 'Podcasts', value: 'PODCAST' },
] as const

export const RESOURCE_STATUS_FILTER_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Published', value: 'true' },
  { label: 'Draft', value: 'false' },
] as const
