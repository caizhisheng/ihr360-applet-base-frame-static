import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginUmd } from '@rsbuild/plugin-umd';
import { pluginLess } from '@rsbuild/plugin-less';
import rspack from '@rspack/core';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createCssColorReplacePlugin } from './scripts/cssColorReplacePlugin';

export default defineConfig((args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // 判断是否为生产环境
    const isProduction = args.env === 'production';
    
    // 环境变量配置
    // 加载环境变量文件
    const envPath = `.env.${args.env}`;
    const defaultEnvPath = '.env';

    // 先加载默认环境变量
    if (fs.existsSync(defaultEnvPath)) {
        dotenv.config({ path: defaultEnvPath });
    }

    // 再加载特定环境的变量（会覆盖默认值）
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
    }
    // 获取所有环境变量
    const env = process.env;
    const OUTPUT_PUBLIC_PATH = ['beta', 'production'].indexOf(process.env.PUSH_NODE_ENV || '') > -1 && process.env.OUTPUT_PUBLIC_PATH ? `${process.env.OUTPUT_PUBLIC_PATH}${process.env.NODE_ENV_LAN || ''}/` : (process.env.REACT_APP_SERVED_PATH || '/');
    const enbObj = {};
    //环境变量太多会导致报错，所以需要白名单
    Object.keys(env).forEach((key) => {
        const allowedPrefixes = ['REACT_APP_', 'WEB_UI_'];
        const allowedKeys = [
            'NODE_ENV',
            'NODE_ENV_LAN', 
            'NODE_SERVICE_TYPE',
            'IHR360_WEB_UI_NAME',
            'OUTPUT_PUBLIC_PATH',
            'PUSH_NODE_ENV'
        ];
        
        const shouldInclude = 
            allowedPrefixes.some(prefix => key.startsWith(prefix)) ||
            allowedKeys.includes(key);
            
        if (shouldInclude) {
            enbObj[key] = JSON.stringify(env[key]);
        }
    });
    return {
        // 源码配置
        source: {
            // 入口文件配置
            entry: {
                index: './src/singleSpaEntry.tsx'
            },
            // 包含的文件路径，用于构建
            include: ['src/**/*'],
            // 排除的文件路径
            exclude: ['node_modules/**/*'],
            // 全局变量定义
            define: {
                __APP_ENV__: JSON.stringify(env.REACT_APP_ENV),
               // 定义所有需要的环境变量的白名单
               'process.env': enbObj,
            },
            // 装饰器配置
            decorators: {
                version: 'legacy',
            },
        },

        // 模块解析配置
        resolve: {
            // 路径别名配置，简化导入路径
            alias: {
                'react':  path.resolve(__dirname, 'node_modules/react'),
                'irs-react-intl': path.resolve(__dirname, 'node_modules/irs-tools/irs-react-intl-uper/index'),
            },
            // 文件扩展名解析顺序
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less'],
            // 模块查找路径
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'ui/components')
            ],

        },

         // 输出配置
         output: isProduction ? {
            target: 'web',
            // 生产环境使用配置的公共路径，开发环境使用根路径
            assetPrefix: isProduction ? OUTPUT_PUBLIC_PATH : '/',
            // 输出目录结构配置
            distPath: {
                root: 'build',
                js: 'static/js',
                css: 'static/css',
                media: 'static/images',
            },
            // 文件名配置，包含哈希值用于缓存控制
            filename: {
                js: '[name].[hash:8].js',
                css: '[name].[hash:8].css',
                media: '[name].[hash:8].[ext]'
            },
            polyfill: 'entry',
            // 生产环境禁用 source map 以减少产物大小
            sourceMap: false,
            clean: true,
            // 复制静态资源 (排除 index.html，避免与 HTML 插件冲突)
            copy: [
                {
                    from: 'public',
                    to: '',
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        } : undefined,

        // 工具配置
        tools: {
            // SWC 配置 - 支持空值合并运算符(??)和可选链操作符(?.)
            swc: {
                jsc: {
                    // JavaScript/TypeScript 解析器配置
                    parser: {
                        syntax: 'typescript',
                        tsx: true,
                        decorators: true,
                        dynamicImport: true,
                        // 启用现代 JavaScript 语法解析
                        topLevelAwait: true,
                        importMeta: true,
                        privateMethod: true,
                        functionBind: true,
                        exportDefaultFrom: true,
                        exportNamespaceFrom: true
                    },
                    // React 转换配置
                    transform: {
                        react: {
                            runtime: 'automatic',
                            development: !isProduction,
                            refresh: !isProduction
                        },
                        // 启用装饰器支持
                        decoratorMetadata: true,
                        legacyDecorator: true,
                        // 优化器配置
                        optimizer: {
                            simplify: true,
                            globals: {
                                typeofs: {
                                    window: 'object'
                                },
                                // envs: {
                                //     NODE_ENV: isProduction ? 'production' : 'development'
                                // }
                            }
                        }
                    },
                    // 外部辅助函数
                    externalHelpers: true,
                    // 保持类名（开发环境）
                    keepClassNames: !isProduction,
                    // 启用松散模式以获得更好的性能
                    loose: true,
                },
                // 环境配置 - 确保现代浏览器支持，支持空值合并运算符和可选链操作符
                env: {
                    targets: {
                        chrome: '80',   // 支持空值合并运算符
                        firefox: '72',  // 支持可选链操作符  
                        safari: '13.1', // 支持两个操作符
                        edge: '80'      // 支持两个操作符
                    },
                    mode: 'usage',
                    coreJs: '3',
                    shippedProposals: true
                },
                // 模块系统配置
                module: {
                    type: 'es6',
                    strict: false,
                    strictMode: true,
                    lazy: false,
                    noInterop: false
                },
                // Source map 配置
                sourceMaps: !isProduction,
                inlineSourcesContent: false
            },
            // HTML 插件配置
            htmlPlugin: {
                template: './public/index.html',
                title: 'ihr360-applet-base-static',
                meta: {
                    charset: { charset: 'utf-8' },
                    viewport: 'width=device-width, initial-scale=1'
                },
                inject: 'body',
                templateParameters: {
                    assetPrefix: isProduction ? OUTPUT_PUBLIC_PATH : '/'
                }
            },
            // Rspack 配置
            rspack: {
                module: {
                    parser: {
                        javascript: {
                            exportsPresence: false,
                            overrideStrict: 'non-strict'
                        },
                    },
                },
                // 实验性功能配置
                experiments: {
                    topLevelAwait: true,
                },
                // 生产环境启用压缩和优化
                optimization: {
                    minimize: isProduction,
                    // Tree Shaking 优化
                    usedExports: true,
                    sideEffects: true,
                    // 模块连接优化
                    concatenateModules: true,
                    // 移除空模块
                    removeEmptyChunks: true,
                    // 合并重复模块
                    mergeDuplicateChunks: true,
                    // 移除许可证文件
                    minimizer: isProduction ? [
                        {
                            apply: (compiler) => {
                                // 移除所有 .LICENSE.txt 文件
                                compiler.hooks.emit.tap('RemoveLicenseFiles', (compilation) => {
                                    Object.keys(compilation.assets).forEach((filename) => {
                                        if (filename.endsWith('.LICENSE.txt')) {
                                            delete compilation.assets[filename];
                                        }
                                    });
                                });
                            }
                        }
                    ] : undefined
                },
                // 自定义插件配置
                plugins: isProduction ? [
                    // Bundle 分析插件
                    {
                        name: 'bundle-analyzer',
                        apply(compiler) {
                            // 只在需要分析时启用（通过环境变量控制）
                            if (process.env.ANALYZE) {
                                const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
                                new BundleAnalyzerPlugin({
                                    analyzerMode: 'static',
                                    openAnalyzer: false,
                                    reportFilename: 'bundle-report.html'
                                }).apply(compiler);
                            }
                        }
                    },
                    // 生成版本信息文件的插件 + 清理许可证文件
                    {
                        name: 'generate-version-json-and-cleanup',
                        apply(compiler) {
                            compiler.hooks.done.tap('generate-version-json-and-cleanup', () => {
                                try {
                                    const versionInfo = {
                                        buildTime: new Date().toISOString(),
                                        version: process.env.npm_package_version || '1.0.0',
                                        env: args.env,
                                        buildMode: args.command
                                    };

                                    const outputDir = 'build';
                                    if (!fs.existsSync(outputDir)) {
                                        fs.mkdirSync(outputDir, { recursive: true });
                                    }

                                    fs.writeFileSync(
                                        path.join(outputDir, 'version.json'),
                                        JSON.stringify(versionInfo, null, 2),
                                        'utf-8'
                                    );

                                    console.log('✨ version.json generated successfully');
                                    
                                    // 清理所有 .LICENSE.txt 文件
                                    function findLicenseFiles(dir: string): string[] {
                                        let results: string[] = [];
                                        try {
                                            const files = fs.readdirSync(dir);
                                            files.forEach(file => {
                                                const filePath = path.join(dir, file);
                                                const stat = fs.statSync(filePath);
                                                if (stat.isDirectory()) {
                                                    results = results.concat(findLicenseFiles(filePath));
                                                } else if (file.endsWith('.LICENSE.txt')) {
                                                    results.push(filePath);
                                                }
                                            });
                                        } catch (err) {
                                            // 忽略错误
                                        }
                                        return results;
                                    }
                                    
                                    const licenseFiles = findLicenseFiles(outputDir);
                                    let removedCount = 0;
                                    
                                    licenseFiles.forEach(file => {
                                        try {
                                            fs.unlinkSync(file);
                                            removedCount++;
                                        } catch (err) {
                                            console.warn(`⚠️  Failed to remove ${file}:`, err.message);
                                        }
                                    });
                                    
                                    if (removedCount > 0) {
                                        console.log(`🧹 Removed ${removedCount} LICENSE.txt files`);
                                    }
                                    
                                } catch (error) {
                                    console.error('❌ Failed to generate version.json:', error);
                                }
                            });
                        }
                    },
                    // 移除 'use strict' 声明的插件
                    {
                        name: 'remove-use-strict',
                        apply(compiler) {
                            compiler.hooks.emit.tap('remove-use-strict', (compilation) => {
                                for (const filename in compilation.assets) {
                                    if (filename.endsWith('.js')) {
                                        const asset = compilation.assets[filename];
                                        let source = asset.source();
                                        source = source.replace(/^"use strict";/, '');
                                        compilation.assets[filename] = {
                                            source: () => source,
                                            size: () => source.length
                                        };
                                    }
                                }
                            });
                        }
                    },
                    // PostSingleSpaConfigPlugin 类似效果的插件 - 生成 info.json
                    {
                        name: 'post-single-spa-config-plugin',
                        apply(compiler) {
                            compiler.hooks.done.tap('post-single-spa-config-plugin', (stats) => {
                                try {
                                    // 获取构建统计信息
                                    const statsJson = stats.toJson({
                                        all: false,
                                        assets: true,
                                        entrypoints: true,
                                        chunks: true,
                                        modules: false,
                                    });
                                    
                                    // 读取 package.json 获取项目名称
                                    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));
                                    const chunkJs: string[] = [];
                                    const chunkCss: string[] = [];
                                    if (statsJson.assetsByChunkName) {
                                        Object.keys(statsJson.assetsByChunkName).forEach(key => {
                                            if(key !== 'index'){
                                                const assets = statsJson.assetsByChunkName[key];
                                                if (Array.isArray(assets)) {
                                                    assets.forEach((asset: string) => {
                                                        if(asset.endsWith('.js')){
                                                            chunkJs.push(OUTPUT_PUBLIC_PATH + asset);
                                                        }
                                                        if(asset.endsWith('.css')){
                                                            chunkCss.push(OUTPUT_PUBLIC_PATH + asset);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                    // 构建 info.json 数据
                                    const infoData = {
                                        [process.env.REACT_APP_LIBRARY || '']: {
                                            'zh_CN': {
                                                appJs: OUTPUT_PUBLIC_PATH + statsJson.assetsByChunkName?.['index']?.filter((d: string) => d.endsWith('.js'))[0] || '',
                                                appCss: OUTPUT_PUBLIC_PATH + statsJson.assetsByChunkName?.['index']?.filter((d: string) => d.endsWith('.css'))[0] || '',
                                                splitChunkJs: chunkJs,
                                                splitChunkCss: chunkCss,
                                                baseApp: false,
                                                hash: process.env.REACT_APP_HASH,
                                                projectName: packageJson.name,
                                                dynamicLan: 'true'
                                            }
                                        }
                                    };

                                    // 写入 info.json 到根目录
                                    const infoJsonPath = path.resolve(__dirname, 'info.json');
                                    fs.writeFileSync(
                                        infoJsonPath,
                                        JSON.stringify(infoData, null, 2),
                                        'utf-8'
                                    );

                                    console.log('✨ info.json generated successfully at project root');
                                    console.log('📄 Info file location:', infoJsonPath);
                                    
                                } catch (error) {
                                    console.error('❌ Failed to generate info.json:', error);
                                }
                            });
                        }
                    },
                    // 生成 intlMessage.json 的插件
                    {
                        name: 'generate-intl-message',
                        apply(compiler) {
                            compiler.hooks.done.tap('generate-intl-message', async () => {
                                try {
                                    // 调用独立的脚本生成 intlMessage.json
                                    const { generateIntlMessage } = require(path.resolve(__dirname, 'scripts/generateIntlMessage.js'));
                                    const result = await generateIntlMessage(__dirname);
                                    
                                    if (!result.success) {
                                        console.error('❌ 生成 intlMessage.json 失败:', result.error);
                                    }
                                } catch (error) {
                                    console.error('❌ 调用 generateIntlMessage 脚本失败:', error);
                                }
                            });
                        }
                    },
                    // CSS 颜色替换插件 - 将硬编码的颜色值替换为 CSS 变量
                    createCssColorReplacePlugin({
                        colorRegex: /#26[cC]2[aA]4;/g,
                        replacement: 'var(--singlespa-frame-ant4-primary-color,#26c2a4);'
                    }),
                ] : []
            },
        },

        // 开发服务器配置
        server: {
            port: 5001,
            host: '0.0.0.0',
            open: true,
            // CORS 配置（已注释）
            // cors: {
            //     origin: '*',
            //     credentials: true,
            //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            //     allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
            //     exposedHeaders: ['Content-Length', 'X-Requested-With'],
            //     maxAge: 86400
            // },
            // 代理配置，用于开发环境 API 转发
            proxy: {
                // 静态资源代理
                '/lcp/page/images': {
                    target: 'http://0.0.0.0:5001',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/lcp\/page\/images/, '/images')
                },
                // 远程静态资源代理
                '/static/remote': {
                    target: 'http://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                // 目标代理 API
                '/target-proxy-api': {
                    target: 'http://qa2-vip.ihr360.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/target-proxy-api/, '')
                },
                // 微信相关资源代理
                '/res.wx.qq.com': {
                    target: 'https://res.wx.qq.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/res\.wx\.qq\.com/, '')
                },
                '/open.work.weixin.qq.com': {
                    target: 'https://open.work.weixin.qq.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/open\.work\.weixin\.qq\.com/, '')
                },
                // 阿里云图标库代理
                '/at.alicdn.com': {
                    target: 'https://at.alicdn.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/at\.alicdn\.com/, '')
                },
                '/at.ihr360.com': {
                    target: 'https://at.ihr360.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/at\.ihr360\.com/, '')
                },
                // 高德地图 API 代理
                '/webapi.amap.com': {
                    target: 'https://webapi.amap.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/webapi\.amap\.com/, '')
                },
                // WebSocket 代理
                '/ai-webagent/ws': {
                    target: 'ws://192.168.3.224:41665',
                    ws: true,
                    changeOrigin: true
                },
                // 简历文件解析 API
                '/recruit/resume/file/parse': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                // 网关 API 代理
                '/gateway': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                // 页面相关 API
                '/web/page/single': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                '/web/gateway': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                '/web': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/web/, '/gateway/web')
                },
                // 公司站点 API
                '/companysite': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                // API 网关
                '/api/gateway': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                // 认证相关 API
                '/ac': {
                    target: 'https://qa2-vip.ihr360.com',
                    changeOrigin: true
                },
                // 聚合 API
                '/gateway/group/aggregate': {
                    target: 'https://qa2-vip.ihr360.com'
                },
                '/gateway/group/api': {
                    target: 'https://qa2-vip.ihr360.com'
                },
                // BI API
                '/gateway/bi/api': {
                    target: 'https://qa2-vip.ihr360.com'
                }
            }
        },

        // 性能优化配置（仅生产环境）
        performance: isProduction ? {
            buildCache: true,
            // 平衡的包名分片策略 - 保持3-4个文件，按主要包分组
            chunkSplit: {
                strategy: 'split-by-size',
                minSize: 200000,   // 适中的最小chunk大小
                maxSize: 800000,   // 控制单文件最大800KB
                override: {
                    chunks: 'all',
                    maxAsyncRequests: 4,      // 允许最多4个异步请求
                    maxInitialRequests: 4,    // 允许最多4个初始请求
                    // 战略性包分组，合并相关包到少数几个文件
                    cacheGroups: {
                        // React生态 + 路由 (预计200-300KB)
                        reactEco: {
                            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|prop-types)[\\/]/,
                            name: 'vendor-react',
                            chunks: 'all',
                            priority: 30,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        // Ant Design完整生态系统 (预计400-600KB)
                        antdEco: {
                            test: /[\\/]node_modules[\\/](antd|@ant-design|rc-|@rc-component|async-validator|resize-observer-polyfill)[\\/]/,
                            name: 'vendor-antd',
                            chunks: 'all',
                            priority: 25,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        // 工具库大合集 (预计300-500KB)
                        utilsEco: {
                            test: /[\\/]node_modules[\\/](lodash|moment|dayjs|axios|classnames|uuid|qs|query-string|core-js|regenerator-runtime|tslib)[\\/]/,
                            name: 'vendor-utils',
                            chunks: 'all',
                            priority: 20,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                        // 其他所有第三方库 (兜底，预计200-400KB)
                        vendorOthers: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendor-others',
                            chunks: 'all',
                            priority: 10,
                            minChunks: 1,
                            enforce: true,
                            reuseExistingChunk: true
                        }
                    }
                }
            },
            // 启用更多性能优化
            removeConsole: false,
            removeMomentLocale: true,
            preloadOrPrefetch: 'preload'
        } : undefined,

        // 插件配置
        plugins: [
            // Less 样式处理插件
            pluginLess({
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                        math: 'always',
                        // Ant Design 主题变量配置
                        modifyVars: {
                            "ant-cls-prefix": "applet-base-ant4",
                            "ihr-prefix": "applet-base-ihr3"
                        },
                        // Less 文件查找路径
                        paths: [
                            path.resolve(__dirname, 'node_modules'),
                        ]
                    },
                },
            }),
            // React 插件
            pluginReact(),
            // 生产环境 UMD 构建插件
            isProduction && pluginUmd({
                name: process.env.REACT_APP_LIBRARY || 'applet-base-spa',
            }),
        ].filter(Boolean),

        // 开发环境配置
        dev: {
            startUrl: true,
            progressBar: true,
            hmr: true,
            // 启用 node_modules 热更新
            watchFiles: [{
                type: 'reload-page',
                paths: ['src/**/*']
            }]
        }
    };
});
