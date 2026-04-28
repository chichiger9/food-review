import { parse as parseYaml } from 'yaml'

/**
 * Split `---` / YAML / `---` from body (no gray-matter: it relies on Node `Buffer`
 * and breaks in the browser bundle).
 */
function parseFrontMatterBlock(
  raw: string,
  fileKey: string,
): { data: unknown; content: string } {
  const text = raw.replace(/^\uFEFF/, '')
  const lines = text.split(/\r?\n/)
  if (lines[0]?.trim() !== '---') {
    throw new Error(
      `${fileKey}: file must start with a YAML frontmatter block (---)`,
    )
  }
  const yamlLines: string[] = []
  let i = 1
  let closed = false
  for (; i < lines.length; i += 1) {
    if (lines[i]!.trim() === '---') {
      i += 1
      closed = true
      break
    }
    yamlLines.push(lines[i]!)
  }
  if (!closed) {
    throw new Error(
      `${fileKey}: unclosed frontmatter (missing a closing --- line)`,
    )
  }
  const content = lines.slice(i).join('\n')
  const yamlStr = yamlLines.join('\n')
  let data: unknown
  try {
    data = parseYaml(yamlStr) ?? {}
  } catch (e) {
    throw new Error(
      `${fileKey}: invalid YAML in frontmatter: ${e instanceof Error ? e.message : String(e)}`,
      { cause: e },
    )
  }
  return { data, content }
}

export type Review = {
  slug: string
  title: string
  restaurant: string
  date: string
  cuisine: string
  excerpt: string
  /** Markdown with image paths rewritten to Vite asset URLs */
  bodyMarkdown: string
  coverImage: string
}

const mdRaw = import.meta.glob<string>('../../content/reviews/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const imageUrlByPath = new Map<string, string>()
const imageModules = import.meta.glob<string>(
  '../../content/reviews/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true, import: 'default' },
)
for (const [key, url] of Object.entries(imageModules)) {
  imageUrlByPath.set(suffixKey(key), url)
}

function norm(p: string): string {
  return p.replace(/\\/g, '/')
}

/** Stable tail from `content/reviews/...` for matching glob keys. */
function suffixKey(key: string): string {
  const n = norm(key)
  const idx = n.indexOf('content/reviews/')
  return idx >= 0 ? n.slice(idx) : n
}

function reviewDirFromMdKey(mdKey: string): string {
  const n = norm(mdKey)
  return n.replace(/\/index\.md$/, '')
}

function resolveFromReviewDir(reviewDir: string, ref: string): string {
  const stack = reviewDir.split('/').filter((s) => s !== '' && s !== '.')
  for (const seg of ref.trim().split('/')) {
    if (seg === '' || seg === '.') continue
    if (seg === '..') {
      if (stack.length === 0) {
        throw new Error(`Invalid image path: ${ref}`)
      }
      stack.pop()
    } else {
      stack.push(seg)
    }
  }
  return stack.join('/')
}

function lookupImageUrl(reviewDir: string, ref: string): string {
  if (/^https?:\/\//i.test(ref)) return ref
  const full = resolveFromReviewDir(reviewDir, ref.replace(/^\.\//, ''))
  const fullSuffix = suffixKey(full)
  const url = imageUrlByPath.get(fullSuffix)
  if (!url) {
    throw new Error(
      `Image not found for path "${ref}" (resolved to "${fullSuffix}"). Is the file under content/reviews/?`,
    )
  }
  return url
}

function rewriteImagePaths(
  fileKey: string,
  body: string,
): { markdown: string; firstResolvedUrl: string | undefined } {
  const reviewDir = reviewDirFromMdKey(fileKey)
  const imgRe = /!\[([^\]]*)\]\(([^)]+)\)/g
  let firstResolvedUrl: string | undefined

  const markdown = body.replace(
    imgRe,
    (full: string, alt: string, dest: string) => {
      const d = dest.trim()
      const isHttp = /^https?:\/\//i.test(d)
      if (firstResolvedUrl === undefined) {
        firstResolvedUrl = isHttp ? d : lookupImageUrl(reviewDir, d)
      }
      if (isHttp) return full
      const url = lookupImageUrl(reviewDir, d)
      return `![${alt}](${url})`
    },
  )

  return { markdown, firstResolvedUrl }
}

function coverForReview(slug: string, firstImageUrl: string | undefined): string {
  if (firstImageUrl) return firstImageUrl
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/1200/720`
}

type Frontmatter = {
  title: string
  restaurant: string
  date: string
  cuisine: string
  excerpt: string
}

function readFrontmatter(data: unknown, fileKey: string): Frontmatter {
  if (!data || typeof data !== 'object') {
    throw new Error(`${fileKey}: invalid or missing frontmatter`)
  }
  const d = data as Record<string, unknown>
  for (const key of [
    'title',
    'restaurant',
    'date',
    'cuisine',
    'excerpt',
  ] as const) {
    if (typeof d[key] !== 'string' || !(d[key] as string).trim()) {
      throw new Error(
        `${fileKey}: frontmatter must include a non-empty string "${key}"`,
      )
    }
  }
  return {
    ...(d as Frontmatter),
    cuisine: (d.cuisine as string).trim().toLowerCase(),
  }
}

function slugFromMdKey(fileKey: string): string {
  const m = norm(fileKey).match(/content\/reviews\/([^/]+)\/index\.md$/)
  if (m) return m[1]!
  const m2 = norm(fileKey).match(/\/([^/]+)\/index\.md$/)
  if (m2) return m2[1]!
  throw new Error(`${fileKey}: could not determine slug from path`)
}

function buildReviews(): Review[] {
  const out: Review[] = []
  for (const [fileKey, raw] of Object.entries(mdRaw)) {
    const { data, content: body } = parseFrontMatterBlock(raw, fileKey)
    const fm = readFrontmatter(data, fileKey)
    const slug = slugFromMdKey(fileKey)
    let bodyMarkdown: string
    let firstResolved: string | undefined
    try {
      const { markdown, firstResolvedUrl } = rewriteImagePaths(fileKey, body)
      bodyMarkdown = markdown
      firstResolved = firstResolvedUrl
    } catch (e) {
      throw new Error(
        `${fileKey}: ${e instanceof Error ? e.message : String(e)}`,
        { cause: e },
      )
    }
    out.push({
      slug,
      title: fm.title,
      restaurant: fm.restaurant,
      date: fm.date,
      cuisine: fm.cuisine,
      excerpt: fm.excerpt,
      bodyMarkdown,
      coverImage: coverForReview(slug, firstResolved),
    })
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export const reviews: Review[] = buildReviews()

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug)
}
