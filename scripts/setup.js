/**
 * scripts/setup.js — fetch the free yt-dlp binary (runs once, on install/deploy).
 *
 * yt-dlp is FREE and needs no API key. This grabs the self-contained binary for
 * the current platform so the downloader commands (.play/.video/.tiktok/.instagram/...)
 * work out of the box with zero paid keys and no external gateway.
 *
 * Run:  node scripts/setup.js
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BIN_DIR = path.join(__dirname, '..', 'bin')
const RELEASE = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download'

function asset() {
  const p = os.platform()
  const arch = os.arch()
  if (p === 'linux' && arch === 'x64') return { name: 'yt-dlp_linux', out: 'yt-dlp_linux' }
  if (p === 'linux' && (arch === 'arm64' || arch === 'arm')) return { name: 'yt-dlp_linux_aarch64', out: 'yt-dlp_linux_aarch64' }
  if (p === 'darwin' && arch === 'x64') return { name: 'yt-dlp_macos', out: 'yt-dlp_macos' }
  if (p === 'darwin' && arch === 'arm64') return { name: 'yt-dlp_macos', out: 'yt-dlp_macos' }
  if (p === 'win32') return { name: 'yt-dlp.exe', out: 'yt-dlp.exe' }
  throw new Error(`Unsupported platform for auto-download: ${p}/${arch}. Install yt-dlp manually (https://github.com/yt-dlp/yt-dlp).`)
}

async function main() {
  const { name, out } = asset()
  const dest = path.join(BIN_DIR, out)
  if (fs.existsSync(dest) && process.env.FORCE !== '1') {
    console.log(`✓ yt-dlp already present: ${dest}`)
    return
  }
  fs.mkdirSync(BIN_DIR, { recursive: true })
  console.log(`Downloading yt-dlp (free, no key): ${name} ...`)
  const url = `${RELEASE}/${name}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed (${res.status}). Try manual install: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
  if (os.platform() !== 'win32') fs.chmodSync(dest, 0o755)
  console.log(`✓ Saved ${dest} (${(buf.length / 1024 / 1024).toFixed(1)} MB)`)

  // sanity check
  try {
    const v = execFileSync(dest, ['--version'], { encoding: 'utf8' }).trim()
    console.log(`✓ yt-dlp version: ${v}`)
  } catch (e) {
    console.warn(`⚠️ yt-dlp downloaded but could not run — missing shared libs? (${e.message})`)
  }
}

// Never fail the install — if the fetch fails we just warn; downloader commands
// stay honest until the binary is present.
main().catch((e) => { console.warn(`⚠️ yt-dlp not fetched yet: ${e.message}`); process.exit(0) })
