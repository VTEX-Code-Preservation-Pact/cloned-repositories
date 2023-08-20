import path from 'path'

import { Transformer } from '@parcel/plugin'

export default new Transformer({
  async transform({ asset }) {
    asset.type = 'js'

    const fileName = path.basename(asset.filePath, '.html')

    const content = await asset.getCode()

    const output = `
(function() {
  var script = document.createElement("script");
  script.type = "text/html";
  script.innerHTML = JSON.parse(${JSON.stringify(JSON.stringify(content))});
  script.id = ${JSON.stringify(fileName)};
  document.head.appendChild(script);
})();
`.trim()

    asset.setCode(output)

    return [asset]
  },
})
