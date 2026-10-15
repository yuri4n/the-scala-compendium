import type { AtlasItem, Ecosystem, Maintainer } from '~~/shared/utils/atlas'
import { atlasItems } from '~~/shared/utils/atlas'

export default function useAtlasContent() {
  const { t } = useI18n()
  const ecosystemLabel = (id: Ecosystem | 'all') => t(`ecosystems.${id}`)
  const maintainerLabel = (id: Maintainer) =>
    id === 'kyo' ? t('details.kyoMaintainer') : 'yuri4n'
  const statusLabel = (status: AtlasItem['status']) => status
    ? t(
        status === 'Unpublished'
          ? 'details.unpublished'
          : 'details.development',
      )
    : ''
  const kindLabel = (kind: AtlasItem['kind']) => t(`atlas.${kind}`)
  const localizedItems = computed<AtlasItem[]>(() => atlasItems.map((item) => {
    const key = `catalogue.${item.id}`
    return {
      ...item,
      name: item.kind === 'proposal' ? t(`${key}.name`) : item.name,
      category: t(`${key}.category`),
      description: t(`${key}.description`),
      compatibility: t(`${key}.compatibility`),
      source: t(`${key}.source`),
      ...(item.note ? { note: t(`${key}.note`) } : {}),
      ...(item.secondarySource
        ? { secondarySource: t(`${key}.secondarySource`) }
        : {}),
      ...(item.accessNote ? { accessNote: t(`${key}.accessNote`) } : {}),
    }
  }))
  return {
    t,
    ecosystemLabel,
    maintainerLabel,
    statusLabel,
    kindLabel,
    localizedItems,
  }
}
