# my-shop

> App created in Node.js, MongoDB, React and Redux

This app is not completely finished. The application is to allow for add announcement.

## Setup

Install:
npm install in server and client folder

Create config.js file in config folder like this content :

`module.exports = { 
  mongoUri: ,
  
  secretKey: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI8SkMAWt2Zq41X9h30IImCX6ZDwgieUpJbNah3BPBotm7fcuCB33ftN3ytAuzqm8N39xgQ2uJ4VEASelDnmeMECAwEAAQ==",
  
  url: "http://localhost:3000",
  
  sitename: "Matmarket",
  
  email: ,
  
  password: ,
  
  salt: "s0mRIdlKvI",
  
  pathCategoryImage: "files/categories/",
  
  pathAdvertisementImage: "files/advertisements/",
  };`

In empty places please add your own data

Run app :
npm run dev
