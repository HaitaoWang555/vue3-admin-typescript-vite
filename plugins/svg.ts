import { readFileSync, readdirSync, utimesSync, closeSync, openSync } from 'fs'
import type { Plugin, ViteDevServer } from 'vite'
let idPerfix = ''
const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g

const hasViewBox = /(viewBox="[^>+].*?")/g

const clearReturn = /(\r)|(\n)/g

function findSvgFile(dir: string): string[] {
  const svgRes = []
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + '/'))
    } else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2) => {
          let width = 0
          let height = 0
          let content = $2.replace(
            clearHeightWidth,
            (s1: string, s2: string, s3: number) => {
              if (s2 === 'width') {
                width = s3
              } else if (s2 === 'height') {
                height = s3
              }
              return ''
            }
          )
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`
          }
          return `<symbol id="${idPerfix}-${dirent.name.replace(
            '.svg',
            ''
          )}" ${content}>`
        })
        .replace('</svg>', '</symbol>')
      svgRes.push(svg)
    }
  }
  return svgRes
}

function touch(path: string) {
  const time = new Date()
  try {
    utimesSync(path, time, time)
  } catch (err) {
    closeSync(openSync(path, 'w'))
  }
}

export const svgBuilder = (svgPath: string, perfix = 'icon'): Plugin => {
  idPerfix = perfix
  const res = findSvgFile(svgPath)
  return {
    name: 'svg-transform',
    transformIndexHtml(html: string) {
      return html.replace(
        '<body>',
        `
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join('')}
            </svg>
        `
      )
    },
    configureServer(server: ViteDevServer) {
      ;['add', 'onlink', 'change'].forEach((event) => {
        server.watcher.on(event, (filepath: string) => {
          if (filepath.includes('src\\icons')) {
            touch('vite.config.ts')
          }
        })
      })
    },
  }
}
