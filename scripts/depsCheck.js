import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'

await mkdir(resolve(dirname('../'), './node_modules/.cache')).catch(() => {})

const cachePath = resolve(
	dirname('../'),
	'./node_modules/.cache/deps_check_lock_hash.txt',
)

const lockFilePath = resolve(dirname('../'), 'pnpm-lock.yaml')

const lockHashCache = await readFile(cachePath, {
	encoding: 'utf-8',
	flag: 'a+',
}).catch(() => {})

const lockHash = createHash('sha256')
	.update(await readFile(lockFilePath, { encoding: 'utf-8' }))
	.digest('hex')

if (lockHashCache !== lockHash) {
	execSync('pnpm i', { stdio: 'inherit' })
	await writeFile(cachePath, lockHash)
}
