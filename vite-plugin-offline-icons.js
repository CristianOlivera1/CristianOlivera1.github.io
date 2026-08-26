import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { getIcons } from '@iconify/utils'

const ICON_NAME_RE = /['"]([a-z][a-z0-9]*:[a-z0-9][a-z0-9-]*)['"]/g
const VIRTUAL_ID = '\0virtual:offline-icons'

function collectIconNames(srcDir) {
  const names = new Set()

  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
        const content = readFileSync(fullPath, 'utf8')
        for (const match of content.matchAll(ICON_NAME_RE)) {
          names.add(match[1])
        }
      }
    }
  }

  walk(srcDir)
  return names
}

export default function viteOfflineIcons(srcDir = 'src') {
  let root = ''

  return {
    name: 'vite-plugin-offline-icons',
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === 'virtual:offline-icons') return VIRTUAL_ID
    },
    load(id) {
      if (id !== VIRTUAL_ID) return

      const names = collectIconNames(resolve(root, srcDir))
      const byPrefix = new Map()
      for (const name of names) {
        const [prefix, icon] = name.split(':')
        if (!byPrefix.has(prefix)) byPrefix.set(prefix, new Set())
        byPrefix.get(prefix).add(icon)
      }

      const lines = ["import { addCollection } from '@iconify/react'"]
      for (const [prefix, icons] of byPrefix) {
        const jsonPath = resolve(root, 'node_modules', '@iconify-json', prefix, 'icons.json')
        if (!existsSync(jsonPath)) {
          continue
        }
        const collection = JSON.parse(readFileSync(jsonPath, 'utf8'))
        const subset = getIcons(collection, [...icons])
        lines.push(`addCollection(${JSON.stringify(subset)})`)
      }

      return lines.join('\n')
    },
    handleHotUpdate({ file, server }) {
      if (!file.startsWith(resolve(root, srcDir))) return
      const mod = server.moduleGraph.getModuleById(VIRTUAL_ID)
      if (mod) {
        server.moduleGraph.invalidateModule(mod)
        return [mod]
      }
    }
  }
}
