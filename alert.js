var iconv = require('iconv-lite');
var spawn = require('child_process').spawn;


async function alert(text,title) {
    return new Promise(function (resolve) {
        var proc = spawn('powershell');
        var cmd = `
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.MessageBoxButtons]$Buttons = [System.Windows.Forms.MessageBoxButtons]::OK
[System.Windows.Forms.MessageBoxIcon]$Icon = [System.Windows.Forms.MessageBoxIcon]::None
`
        let encoded = iconv.encode(cmd, 'gbk');
        proc.stdin.write(encoded); // 写入数据

        text = text.replace(/"/g,"\"");
        title = title.replace(/"/g,"\"");
        var cmd =  `[System.Windows.Forms.MessageBox]::Show("${text}", "${title}", $Buttons, $Icon)\n`
        encoded = iconv.encode(cmd, 'gbk');
        proc.stdin.write(encoded);

        proc.stdout.on('data', (data) => {
            if(data.indexOf('OK')!=-1 &&  data.indexOf('::OK')==-1 ){
                proc.stdin.write('exit\n');
                resolve('OK')
            }
        });

    })

}


module.exports = alert