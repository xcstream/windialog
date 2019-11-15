var iconv = require('iconv-lite');
var spawn = require('child_process').spawn;

function say(text) {
    var proc = spawn('powershell');
    var cmd = `
$sapi = New-Object -COM Sapi.SpVoice
`
    var encoded = iconv.encode(cmd, 'gbk');
    proc.stdin.write(encoded); // 写入数据

    text = text.replace(/"/g,"");
    var cmd =  `$sapi.Speak("${text}")\n`
    encoded = iconv.encode(cmd, 'gbk');
    proc.stdin.write(encoded);
    proc.stdin.write('exit\n');
}


module.exports = say