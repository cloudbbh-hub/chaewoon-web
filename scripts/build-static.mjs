import {mkdir,cp,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await copyFile('index.html','dist/index.html');
for(const dir of ['assets','css','js'])await cp(dir,`dist/${dir}`,{recursive:true});
