const axios = require('axios');
const compilerConsts = require('../utils/compilerConsts');

const $host = axios.create({
    baseURL: process.env.JDOODLE_API_URL,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    }
});

const runCode = async (language, script) => {
    const requestBody = {
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
        language: compilerConsts[`${language}`].language,
        versionIndex: compilerConsts[`${language}`].versionIndex,
        script: script,
    };
    
    const {data} = await $host.post('/execute',requestBody);
    
    return data;
}

module.exports = runCode;