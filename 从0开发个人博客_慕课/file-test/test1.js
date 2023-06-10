const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, 'data.txt')

fs.readFile(filename, 'UTF-8', (err, data) => {
    if (err) {
        console.err(err)
        return
    }
    console.log(data)
})

const content = '新的内容\n'
const opt = {
    flag: 'a',  // 追加 ; w覆盖

}


// fs.writeFile(filename, content, opt, (err) => {
//     if (err) {
//         console.err(err)
//     }
// })

// 这是个同步的方法
fs.access(filename, fs.constants.F_OK, (err) => {
    console.log(`${filename} ${err ? '不存在' : '存在'}`);
});
