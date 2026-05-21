import puppeteer from 'puppeteer'
import { createServer } from 'http'
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = join(__dirname, 'dist')
const PORT = 3456

// Routes to prerender
const ROUTES = [
  { path: '/', output: 'index.html' },
  { path: '/blog', output: 'blog/index.html' },
  { path: '/post/github-copilot-officially-dead', output: 'post/github-copilot-officially-dead/index.html' },
  { path: '/post/github-internal-repositories-breach-2026', output: 'post/github-internal-repositories-breach-2026/index.html' }
]

// Simple static file server
function startServer() {
  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)
    
    if (!existsSync(filePath) && !req.url.startsWith('/assets/')) {
      filePath = join(DIST_DIR, 'index.html')
    }

    if (existsSync(filePath)) {
      const ext = filePath.split('.').pop()
      const contentType = {
        'html': 'text/html',
        'js': 'text/javascript',
        'css': 'text/css',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon'
      }[ext] || 'text/plain'

      res.writeHead(200, { 'Content-Type': contentType })
      createReadStream(filePath).pipe(res)
    } else {
      res.writeHead(404)
      res.end('Not found')
    }
  })

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage()
  const url = `http://localhost:${PORT}${route.path}`
  
  console.log(`📄 Prerendering: ${route.path}`)
  
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    })
    
    await page.waitForFunction(
      () => {
        const ogTitle = document.querySelector('meta[property="og:title"]')
        return ogTitle && ogTitle.getAttribute('content') !== ''
      },
      { timeout: 5000 }
    ).catch(() => {
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const html = await page.content()
    
    const outputPath = join(DIST_DIR, route.output)
    const outputDir = dirname(outputPath)
    
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }
    
    writeFileSync(outputPath, html, 'utf-8')
    
    console.log(` Saved to: ${route.output}`)
  } catch (error) {
    console.error(` Error prerendering ${route.path}:`, error.message)
  } finally {
    await page.close()
  }
}

async function main() {
  console.log('Starting prerendering process...\n')
  
  const server = await startServer()
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    for (const route of ROUTES) {
      await prerenderRoute(browser, route)
    }
    
    console.log('\n Prerendering complete!')
  } catch (error) {
    console.error('Error during prerendering:', error)
    process.exit(1)
  } finally {
    await browser.close()
    server.close()
  }
}

main()
