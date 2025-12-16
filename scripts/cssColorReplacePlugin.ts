/**
 * CSS 颜色值替换插件
 * 用于在构建时将 CSS 中的特定颜色值替换为 CSS 变量
 */
export interface ICssColorReplacePluginOptions {
    /**
     * 要替换的颜色值（支持正则表达式）
     * @default /#26[cC]2[aA]4;/g
     */
    colorRegex?: RegExp
    /**
     * 替换后的 CSS 变量表达式
     * @default 'var(--singlespa-frame-ant4-primary-color,#26c2a4);'
     */
    replacement?: string
  }
  
  /**
   * 创建 CSS 颜色替换插件
   * @param options - 插件配置选项
   * @returns Rspack 插件对象
   */
  export function createCssColorReplacePlugin(
    options: ICssColorReplacePluginOptions = {}
  ): any {
    const {
      colorRegex = /#26[cC]2[aA]4;/g,
      replacement = 'var(--singlespa-frame-ant4-primary-color,#26c2a4);'
    } = options
  
    return {
      name: 'CssColorReplacePlugin',
      apply(compiler: any) {
        compiler.hooks.thisCompilation.tap('CssColorReplacePlugin', (compilation: any) => {
          const rspackLib = require('@rspack/core')
          const { Compilation } = rspackLib
  
          compilation.hooks.processAssets.tap(
            {
              name: 'CssColorReplacePlugin',
              stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
            },
            (assets: any) => {
              try {
                // 遍历所有资源文件
                Object.keys(assets).forEach((filename) => {
                  // 只处理 CSS 文件
                  if (filename.endsWith('.css')) {
                    const asset = compilation.getAsset(filename)
                    if (asset) {
                      // 获取原始内容
                      const originalSource = asset.source
                      let content = originalSource.source()
                      
                      // 确保 content 是字符串类型
                      if (typeof content !== 'string') {
                        if (Buffer.isBuffer(content)) {
                          content = content.toString('utf-8')
                        } else {
                          return // 跳过非字符串/Buffer 类型
                        }
                      }

                      // 执行替换
                      const newContent = content.replace(colorRegex, replacement);

                      // 如果内容有变化，更新资源
                      if (newContent !== content) {
                        compilation.updateAsset(
                          filename,
                          new rspackLib.sources.RawSource(newContent)
                        )
                        console.log(`✓ Replaced color values in ${filename}`)
                      }
                    }
                  }
                })
              } catch (error) {
                console.error('Error replacing CSS color values:', error)
              }
            }
          )
        })
      }
    }
  }