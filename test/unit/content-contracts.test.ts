import { describe, expect, it } from 'vitest'
import english from '../../i18n/locales/en.json'
import spanish from '../../i18n/locales/es.json'
import portuguese from '../../i18n/locales/pt-BR.json'
import guides from '../../shared/data/guides.json'
import { atlasItems, ecosystemNames } from '../../shared/utils/atlas'

const englishCatalogue: Record<string, Record<string, string>>
  = english.catalogue
const englishGuides: Record<string, unknown> = english.guides
const translations = [
  { locale: 'es', content: spanish },
  { locale: 'pt-BR', content: portuguese },
]

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function compareMessages(
  reference: unknown,
  translated: unknown,
  path: string,
) {
  if (isArray(reference)) {
    if (!isArray(translated))
      throw new Error(`${path} must remain an array`)
    expect(translated.length, path).toBe(reference.length)
    reference.forEach((value, index) => {
      compareMessages(value, translated[index], `${path}[${index}]`)
    })
    return
  }
  if (isRecord(reference)) {
    if (!isRecord(translated))
      throw new Error(`${path} must remain an object`)
    expect(Object.keys(translated).sort(), path)
      .toEqual(Object.keys(reference).sort())
    for (const [key, value] of Object.entries(reference)) {
      compareMessages(value, translated[key], `${path}.${key}`)
    }
    return
  }
  expect(typeof translated, path).toBe(typeof reference)
  if (typeof reference !== 'string') {
    expect(translated, path).toEqual(reference)
    return
  }
  if (typeof translated !== 'string')
    throw new Error(`${path} must remain a string`)
  expect(translated.trim().length, path).toBeGreaterThan(0)
  const placeholders = (value: string) =>
    [...value.matchAll(/\{[^{}]+\}/g)].map(match => match[0]).sort()
  expect(placeholders(translated), `${path}: interpolation parameters`)
    .toEqual(placeholders(reference))
  if (reference.startsWith('https://')) {
    expect(translated, `${path}: resource destination`).toBe(reference)
  }
}

describe('catalogue and guide publishing contracts', () => {
  it('requires unique entries, valid memberships, and sources', () => {
    const identities = atlasItems.map(item => item.id)
    expect(new Set(identities).size).toBe(identities.length)
    for (const item of atlasItems) {
      expect(item.id, item.name).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(item.ecosystems.length, item.id).toBeGreaterThan(0)
      expect(new Set(item.ecosystems).size, item.id)
        .toBe(item.ecosystems.length)
      for (const ecosystem of item.ecosystems) {
        expect(ecosystem in ecosystemNames, item.id).toBe(true)
      }
      for (const value of [
        item.name,
        item.category,
        item.description,
        item.compatibility,
        item.source,
      ]) {
        expect(value.trim().length, item.id).toBeGreaterThan(0)
      }
      expect(new URL(item.url).protocol, item.id).toBe('https:')
      if (item.secondaryUrl) {
        expect(new URL(item.secondaryUrl).protocol, item.id).toBe('https:')
        expect(item.secondarySource?.trim().length, item.id).toBeGreaterThan(0)
      }
      expect(item.x === undefined, `${item.id}: coordinate pair`)
        .toBe(item.y === undefined)
    }
  })

  it('keeps the English catalogue synchronized with the source records', () => {
    expect(Object.keys(englishCatalogue).sort())
      .toEqual(atlasItems.map(item => item.id).sort())
    const textFields = [
      'category',
      'description',
      'compatibility',
      'source',
      'note',
      'secondarySource',
      'accessNote',
    ] as const
    for (const item of atlasItems) {
      for (const field of textFields) {
        if (item[field] !== undefined) {
          expect(englishCatalogue[item.id]?.[field], `${item.id}.${field}`)
            .toBe(item[field])
        }
      }
    }
  })

  it('preserves guide routes and resolves every related atlas entry', () => {
    const routeIds = guides.map(guide => guide.id)
    expect(new Set(routeIds).size).toBe(routeIds.length)
    expect(routeIds).toEqual(expect.arrayContaining([
      'start-scala',
      'build-http-api',
      'query-data',
      'process-streams',
      'build-browser-ui',
      'test-behavior',
      'modernize-scala',
      'write-tools',
      'connect-ecosystems',
    ]))
    expect(Object.keys(englishGuides).sort()).toEqual([...routeIds].sort())
    const catalogueIds = new Set(atlasItems.map(item => item.id))
    for (const guide of guides) {
      const { id, related, ...displayedContent } = guide
      expect(guide.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(related.length, guide.id).toBeGreaterThan(0)
      expect(new Set(related).size, guide.id).toBe(related.length)
      for (const id of related) {
        expect(catalogueIds.has(id), `${guide.id}: related item ${id}`).toBe(
          true,
        )
      }
      expect(guide.steps.length, guide.id).toBeGreaterThan(0)
      expect(guide.resources.length, guide.id).toBeGreaterThan(0)
      for (const resource of guide.resources) {
        expect(new URL(resource.url).protocol, guide.id).toBe('https:')
      }
      expect(englishGuides[id], `${id}: displayed guide content`)
        .toEqual(displayedContent)
    }
  })

  it.each(
    translations,
  )('$locale covers every message without changing its contract', ({
    locale,
    content,
  }) => {
    compareMessages(english, content, locale)
    const catalogue: Record<string, Record<string, string>> = content.catalogue
    for (const item of atlasItems) {
      for (const field of ['description', 'compatibility'] as const) {
        expect(catalogue[item.id]?.[field], `${locale}.${item.id}.${field}`)
          .not
          .toBe(englishCatalogue[item.id]?.[field])
      }
    }
  })
})
