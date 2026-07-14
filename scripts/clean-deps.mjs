import { opendir, rm } from 'node:fs/promises'
import path from 'node:path'

const workspaceRoot = process.cwd()
const dependencyDirectories = []

async function findDependencyDirectories(directory) {
    const entries = await opendir(directory)

    for await (const entry of entries) {
        if (!entry.isDirectory() || entry.name === '.git') {
            continue
        }

        const entryPath = path.join(directory, entry.name)

        if (entry.name === 'node_modules') {
            dependencyDirectories.push(entryPath)
            continue
        }

        await findDependencyDirectories(entryPath)
    }
}

await findDependencyDirectories(workspaceRoot)

dependencyDirectories.sort((left, right) => right.split(path.sep).length - left.split(path.sep).length)

if (dependencyDirectories.length === 0) {
    console.log('No node_modules directories found.')
    process.exit(0)
}

for (const directory of dependencyDirectories) {
    console.log(`Removing ${path.relative(workspaceRoot, directory) || 'node_modules'}`)
    await rm(directory, {
        force: true,
        maxRetries: 3,
        recursive: true,
        retryDelay: 100,
    })
}

console.log(`Removed ${dependencyDirectories.length} node_modules directories.`)
