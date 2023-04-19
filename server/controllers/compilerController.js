const ApiError = require('../error/ApiError');
const algorithms = require('../utils/algorithms');
const runCode = require('../services/compilerAPI');
const statusCode = require('../utils/statusCode');

class CompilerController{
    async sendCode(req,res,next){
        const {algorithmId, script, language} = req.body;
        const algorithm = algorithms.find(item => item.id == algorithmId);

        if (!algorithm) return next(ApiError.badRequest("Отсутствие алгоритма"));

        if (!algorithm[`startCode${language}`]) return next(ApiError.badRequest("Отсутствие поддержки языка"));

        const data = await runCode(language, algorithm[`startCode${language}`].concat(script));
        
        return res.json({data, statusCode: ('error' in data || data.output.includes("Error"))?  statusCode[2]: statusCode[0]});
    }
}

module.exports = new CompilerController();