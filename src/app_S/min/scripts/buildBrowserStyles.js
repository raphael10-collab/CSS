const path = require('path')
const fs = require('fs')

const outFile = path.resolve(__dirname, '../dist/bundle.css')

const modules = [
  '../../../src/assets/css/base.css',
  '../../../src/assets/css/windowControls.css',
  '../../../src/assets/css/modal.css',
  '../../../src/assets/css/tabBar.css',
  '../../../src/assets/css/tabEditor.css',
  '../../../src/assets/css/taskOverlay.css',
  '../../../src/assets/css/webviews.css',
  '../../../src/assets/css/newTabPage.css',
  '../../../src/assets/css/searchbar.css',
  '../../../src/assets/css/listItem.css',
  '../../../src/assets/css/bookmarkManager.css',
  '../../../src/assets/css/findinpage.css',
  '../../../src/assets/css/downloadManager.css',
  '../../../src/assets/css/passwordManager.css',
  '../../../src/assets/css/passwordCapture.css',
  '../../../src/assets/css/passwordViewer.css',
  '../../../node_modules/dragula/dist/dragula.min.css'
]

function buildBrowserStyles () {
  /* concatenate modules */
  let output = ''
  modules.forEach(function (script) {
    output += fs.readFileSync(path.resolve(__dirname, '../', script)) + '\n'
  })

  fs.writeFileSync(outFile, output, 'utf-8')
}

if (module.parent) {
  module.exports = buildBrowserStyles
} else {
  buildBrowserStyles()
}
