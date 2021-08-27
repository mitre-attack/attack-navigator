let str = "";

require('https').get('https://raw.githubusercontent.com/OWASP/ASVS/master/4.0/en/0x10-V1-Architecture.md', (res) => {
    res.setEncoding('utf8');
    res.on('data', function (body) {
        str += body;
    });
    res.on('end', function() {
        console.log(str);
    });
});
