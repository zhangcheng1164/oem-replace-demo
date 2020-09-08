const path = require('path')
const fs = require('fs')

class OemReplacePlugin {
  apply(compiler) {
    let oemSource;
    let oemPath = path.resolve(__dirname, './src/style/variables.scss')
    try {
      compiler.hooks.entryOption.tap('replace oem sass', (context, entry) => {
          if (process.env.OEM) {
            oemSource = fs.readFileSync(oemPath, 'utf-8')
            const source = oemSource.replace('oem-default', process.env.OEM)
            fs.writeFileSync(oemPath, source, 'utf-8')
            console.log(oemSource)
          }
      });
      

      compiler.hooks.done.tap('restore oem sass', (stats) => {
        if (process.env.OEM) {
          fs.writeFileSync(oemPath, oemSource, 'utf-8')
        }
      });
    } catch (e) {
      console.error(e)
    }
  }
}
module.exports = OemReplacePlugin;