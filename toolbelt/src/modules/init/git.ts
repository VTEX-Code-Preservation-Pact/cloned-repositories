import { copy, emptyDir, ensureDir, remove } from 'fs-extra'
import pipeStreams from 'pipe-streams-to-promise'
import request from 'request'
import unzip from 'unzip-stream'
import axios from 'axios'
import log from '../../api/logger'
import { Messages } from '../../lib/constants/Messages'

const urlForRepo = async (repo: string, org: string) => {
  /**
   * If we have internal templates in the future (in a private org repo) we have to figure out
   * how to make this request authenticated. But, since toolbelt is open-source and so are the
   * apps templates, we can afford not to take care of this right now.
   */
  try {
    const { default_branch: branchName } = (await axios.get(`https://api.github.com/repos/${org}/${repo}`)).data
    return { url: `https://github.com/${org}/${repo}/archive/${branchName}.zip`, branchName }
  } catch (err) {
    log.debug(err)
    throw new Error(Messages.ERROR_COULD_NOT_DETERMINE_DEFAULT_BRANCH(org, repo))
  }
}

const fetchAndUnzip = async (url: string, path: string) => pipeStreams([request(url), unzip.Extract({ path })])

export const clone = async (repo: string, org: string, projectFolderName?: string) => {
  const cwd = process.cwd()
  const { url, branchName } = await urlForRepo(repo, org)
  log.debug(Messages.DEBUG_DOWNLOAD_TEMPLATE_URL(url))
  const destPath = `${cwd}/${projectFolderName ?? repo}`
  const cloned = `${destPath}/${repo}-${branchName}`

  await ensureDir(destPath)
  await emptyDir(destPath)
  await fetchAndUnzip(url, destPath)
  await copy(cloned, destPath)
  await remove(cloned)
}
