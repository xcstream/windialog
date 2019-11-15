const {tts,alert} = require('./index')

async function test(){
    let ok1 = await alert('你好呀123',"alert")
    console.log('ok1 clicked')
    let ok2 = await alert('你好呀234',"alert")
    console.log('ok2 clicked')
    tts('你好呀')
}

test()







