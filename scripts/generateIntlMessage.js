const fs = require('fs');
const path = require('path');

/**
 * 递归获取目录下所有文件
 * @param {string} dirPath 目录路径
 * @param {string[]} arrayOfFiles 文件数组
 * @returns {string[]} 所有文件路径数组
 */
const getAllFiles = (dirPath, arrayOfFiles = []) => {
    try {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            } else {
                arrayOfFiles.push(fullPath);
            }
        });
    } catch (error) {
        // 忽略无法访问的目录
    }
    return arrayOfFiles;
};

/**
 * 获取指定目录中的国际化词条
 * @param {string} src 源目录路径
 * @returns {Promise<Array<{id: string, defaultMessage: string}>>} 国际化词条数组
 */
const getModuleDirectories = function (src) {
    return new Promise((resolve, reject) => {
        const customMessages = [];
        try {
            const res = getAllFiles(src);
            res.forEach(item => {
                // 处理 locale 相关文件
                if (item.indexOf('locale.ts') > -1 || item.indexOf('localeMessages.ts') > -1 || item.indexOf('localeMessage.ts') > -1) {
                    try {
                        const fileCont1 = fs.readFileSync(item, 'utf-8');
                        const regexId = /id:.*?\,/gi;
                        const regexDefaultMessage = /defaultMessage:\s*["'`](.*?)["'`]/g;
                        let matchsIds = fileCont1.match(regexId);
                        let matchsDefaultMessages = fileCont1.match(regexDefaultMessage);
                        if (matchsIds instanceof Array && matchsDefaultMessages instanceof Array) {
                            matchsIds.forEach((item, index) => {
                                if (item.split(':')[1].split(',')[0] && matchsDefaultMessages[index]) {
                                    customMessages.push({
                                        id: item.split(':')[1].split(',')[0].replace(' ', '').replace(/"/g, '').replace(/'/g, ''),
                                        defaultMessage: matchsDefaultMessages[index].split(':')[1].split(',')[0].replace(/"/g, '').replace(/'/g, '')
                                    });
                                }
                            });
                        }
                    } catch (error) {
                        console.warn(`解析 locale 文件 ${item} 出错:`, error);
                    }
                }
                
                // 处理 tsx 文件
                if (item.split('.')[1] === 'tsx') {
                    try {
                        const fileCont = fs.readFileSync(item, 'utf-8');
                        const regex = /<FormattedMessage([\s\S]*?)\/>/gi;
                        const regexHtml = /<FormattedHTMLMessage([\s\S]*?)\/>/gi;
                        
                        // 处理 FormattedMessage
                        let matchs = fileCont.match(regex);
                        if (matchs instanceof Array) {
                            matchs.forEach(item => {
                                try {
                                    const regex1 = /id=["'](.*?)["']/i;
                                    const regex2 = /defaultMessage=["'](.*?)["']/i;
                                    const idMatch = item.match(regex1);
                                    const messageMatch = item.match(regex2);
                                    
                                    if (idMatch && messageMatch) {
                                        customMessages.push({
                                            id: idMatch[0].split('=')[1].replace(/\"/g, '').replace(/'/g, ''),
                                            defaultMessage: messageMatch[0].split('=')[1].replace(/\"/g, '').replace(/'/g, '')
                                        });
                                    }
                                } catch (error) {
                                    console.warn(`解析 FormattedMessage 出错:`, error);
                                }
                            });
                        }
                        
                        // 处理 FormattedHTMLMessage
                        let matchsHtml = fileCont.match(regexHtml);
                        if (matchsHtml instanceof Array) {
                            matchsHtml.forEach(item => {
                                try {
                                    const regex1 = /id=["'](.*?)["']/i;
                                    const regex2 = /defaultMessage=["'](.*?)["']/i;
                                    const idMatch = item.match(regex1);
                                    const messageMatch = item.match(regex2);
                                    
                                    if (idMatch && messageMatch) {
                                        customMessages.push({
                                            id: idMatch[0].split('=')[1].replace(/\"/g, '').replace(/'/g, ''),
                                            defaultMessage: messageMatch[0].split('=')[1].replace(/\"/g, '').replace(/'/g, '')
                                        });
                                    }
                                } catch (error) {
                                    console.warn(`解析 FormattedHTMLMessage 出错:`, error);
                                }
                            });
                        }
                    } catch (error) {
                        console.warn(`读取文件 ${item} 出错:`, error);
                    }
                }
            });
            resolve(customMessages);
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * 生成 intlMessage.json 文件
 * @param {string} rootPath 项目根路径
 * @returns {Promise<void>}
 */
const generateIntlMessage = async (rootPath = process.cwd()) => {
    try {
        console.log('🌐 开始生成 intlMessage.json...');
        
        // 收集所有国际化词条
        let intlMessageKey = [];
        
        // 扫描各个模块目录
        const moduleDirectories = [
            'node_modules/ihr360-web-ui',
            'node_modules/ihr360-web-plugins', 
            'node_modules/ihr360-mobile-ui',
            'src'
        ];
        
        for (const dir of moduleDirectories) {
            const fullPath = path.resolve(rootPath, dir);
            if (fs.existsSync(fullPath)) {
                try {
                    const messages = await getModuleDirectories(fullPath);
                    intlMessageKey = [...intlMessageKey, ...messages];
                } catch (error) {
                    console.warn(`扫描目录 ${dir} 出错:`, error);
                }
            }
        }
        
        // 去重处理
        const noRepeatIntlMessageKey = [];
        for (let i = 0; i < intlMessageKey.length; i++) {
            const currentId = intlMessageKey[i].id.replace(' ', '').replace(/"/g, '').replace(/'/g, '');
            if (noRepeatIntlMessageKey.map(item => item.id).indexOf(currentId) === -1) {
                noRepeatIntlMessageKey.push({
                    id: currentId,
                    defaultMessage: intlMessageKey[i].defaultMessage.replace(' ', '')
                });
            }
        }
        
        // 读取 package.json 获取项目名称
        const packageJsonPath = path.resolve(rootPath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        
        // 构建 intlMessage.json 数据
        const params = {
            layer1: '',
            layer2: '',   
            layer3: '',
            messages: noRepeatIntlMessageKey,
            pageName: '',
            routerUrl: '/',
            tableCodes: [],
            projectName: packageJson.name,
        };
        
        // 写入 intlMessage.json 到根目录
        const intlMessagePath = path.resolve(rootPath, 'intlMessage.json');
        fs.writeFileSync(
            intlMessagePath,
            JSON.stringify(params, null, 2),
            'utf-8'
        );
        
        console.log(`✨ intlMessage.json 生成成功，共收集 ${noRepeatIntlMessageKey.length} 个国际化词条`);
        console.log('📄 文件位置:', intlMessagePath);
        
        return {
            success: true,
            count: noRepeatIntlMessageKey.length,
            path: intlMessagePath
        };
        
    } catch (error) {
        console.error('❌ 生成 intlMessage.json 失败:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = {
    generateIntlMessage,
    getModuleDirectories,
    getAllFiles
};

// 如果直接运行此脚本
if (require.main === module) {
    generateIntlMessage().then(result => {
        if (!result.success) {
            process.exit(1);
        }
    });
}
