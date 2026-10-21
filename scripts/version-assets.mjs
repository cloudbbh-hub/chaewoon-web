import {readFile,writeFile,readdir} from 'node:fs/promises';
const version=process.argv[2];
if(!/^[a-zA-Z0-9-]+$/.test(version||''))throw new Error('Provide a release version');
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=`${dir}/${entry.name}`;if(entry.isDirectory())await walk(path);else if(path.endsWith('.js')){const source=await readFile(path,'utf8');await writeFile(path,source.replace(/(from\s*['"])(\.[^'"]+\.js)(?:\?v=[\w-]+)?(['"])/g,`$1$2?v=${version}$3`));}}}
await walk('js');
const html=await readFile('index.html','utf8');await writeFile('index.html',html.replace(/((?:href|src)="(?:css|js)\/[^"?]+\.(?:css|js))(?:\?v=[\w-]+)?"/g,`$1?v=${version}"`));
