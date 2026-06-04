import { readFileSync, writeFileSync, statSync } from 'fs'
import https from 'https'
import http from 'http'

const REPO = 'mansihima/Vehicle-Explore-Hub1234'
const LFS_BATCH_URL = `https://github.com/${REPO}.git/info/lfs/objects/batch`

const MODELS = [
  {
    path: 'public/car-model.glb',
    oid: '74313c4410f892b52a6d3b4a5df1e6590f49998a4e6912a6d44beb94c8d7aad3',
    size: 85272588,
  },
  {
    path: 'public/car-sport-1.glb',
    oid: '5a8dce5bc4f3778448f2d79c78ef3b0e27852089ea1950e271cdf970c53f42f0',
    size: 4181724,
  },
  {
    path: 'public/car-sport-2.glb',
    oid: 'c5e731791f2e0c879c897f2bdf3fc4cef7b7979c33f4e1609a222a3e4f36665c',
    size: 4112132,
  },
  {
    path: 'public/car-sport-3.glb',
    oid: '2f8a5070a2af8c328b0abdddb9748c5151849d5e8bdd495331d9bdac3ac33e9d',
    size: 4279268,
  },
]

function isLfsPointer(filePath) {
  try {
    const stat = statSync(filePath)
    if (stat.size > 500) return false
    const content = readFileSync(filePath, 'utf8')
    return content.startsWith('version https://git-lfs.github.com/spec/v1')
  } catch {
    return false
  }
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body)
    const u = new URL(url)
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.git-lfs+json',
          Accept: 'application/vnd.git-lfs+json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let buf = ''
        res.on('data', (c) => (buf += c))
        res.on('end', () => {
          try {
            resolve(JSON.parse(buf))
          } catch {
            reject(new Error(`LFS batch API parse error: ${buf.slice(0, 300)}`))
          }
        })
      }
    )
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

function downloadBinary(url, destPath) {
  return new Promise((resolve, reject) => {
    function follow(rawUrl) {
      const mod = rawUrl.startsWith('https') ? https : http
      mod.get(rawUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          follow(res.headers.location)
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} downloading ${rawUrl}`))
          return
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => {
          writeFileSync(destPath, Buffer.concat(chunks))
          resolve()
        })
      }).on('error', reject)
    }
    follow(url)
  })
}

async function main() {
  const toDownload = MODELS.filter((m) => isLfsPointer(m.path))

  if (toDownload.length === 0) {
    console.log('GLB files are already real binaries — skipping LFS download.')
    return
  }

  console.log(`Fetching ${toDownload.length} GLB model(s) from GitHub LFS...`)

  const batch = await postJson(LFS_BATCH_URL, {
    operation: 'download',
    transfers: ['basic'],
    objects: toDownload.map((m) => ({ oid: m.oid, size: m.size })),
  })

  if (!batch.objects) {
    throw new Error(`LFS batch API returned unexpected response: ${JSON.stringify(batch).slice(0, 300)}`)
  }

  for (const obj of batch.objects) {
    const model = toDownload.find((m) => m.oid === obj.oid)
    if (!model) continue
    if (obj.error) {
      throw new Error(`LFS error for ${model.path}: ${obj.error.message}`)
    }
    const href = obj.actions?.download?.href
    if (!href) {
      throw new Error(`No download href returned for ${model.path}`)
    }
    const mb = (model.size / 1024 / 1024).toFixed(1)
    console.log(`  Downloading ${model.path} (${mb} MB)...`)
    await downloadBinary(href, model.path)
    console.log(`  ✓ done`)
  }

  console.log('All models downloaded.')
}

main().catch((err) => {
  console.error('ERROR: download-lfs-models.mjs failed:', err.message)
  process.exit(1)
})
