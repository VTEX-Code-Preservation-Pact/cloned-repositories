import { flags as oclifFlags } from '@oclif/command'

import { CustomCommand, ColorifyConstants } from 'vtex'
import auditUrl from '../../modules/auditUrl'

export default class AuditUrl extends CustomCommand {
  static description = `Runs a Lighthouse audit over the specified URL.`

  static examples = [
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lighthouse audit')} my.url.com`,
    `${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex lh audit')} my.url.com`,
  ]

  static aliases = ['lh:audit']

  static flags = {
    ...CustomCommand.globalFlags,
    json: oclifFlags.boolean({ char: 'j', description: 'Returns the report as a json on stdout.', default: false }),
  }

  static args = [{ name: 'url', required: true, description: 'URL to audit.' }]

  async run() {
    const {
      args: { url },
      flags: { json },
    } = this.parse(AuditUrl)

    await auditUrl(url, { json })
  }
}
