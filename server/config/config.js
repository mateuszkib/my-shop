module.exports = {
    mongoUri: "mongodb://localhost:27017/my-shop",
    secretKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI8SkMAWt2Zq41X9h30IImCX6ZDwgieUpJbNah3BPBotm7fcuCB33ftN3ytAuzqm8N39xgQ2uJ4VEASelDnmeMECAwEAAQ==',
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    sitename: 'Shopper'
};

