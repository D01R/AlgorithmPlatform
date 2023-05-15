const ApiError = require('../error/ApiError');
const algorithms = require('../utils/algorithms');
const officegen = require('officegen');
const uuid = require('uuid');
const fs = require('fs');
const {User, Code, Group, University} = require('../models/models');

class reportWordController {
    async generateReport(req, res, next) {
        try{
            const userId = req.user.id;
            const {codeId} = req.body;

            const nameDocx = uuid.v4()+'.docx';
            let docx = officegen({
                type: 'docx',
            })

            const reportData = await Code.findOne({
                where: {id: codeId},
                include: [{
                    model: User,
                    as: "user",
                    include: [{
                        model: Group,
                        as: 'group',
                        include: [
                            {
                                model: User,
                                as: 'teacher'
                            },
                            {
                                model: University,
                                as: 'university'
                            }
                        ]
                    }]
                }]
            })
            if (!reportData) { next(ApiError.badRequest("No data"))}

            let pObj = docx.createP({align: "center"});
            pObj.addText(`Университет: `, {font_face: "Times New Roman", font_size: 14})
            pObj.addText(`${reportData.user.group.university.name}`, {bold:true, font_face: "Times New Roman", font_size: 14})

            pObj.addLineBreak();
            pObj.addLineBreak();
            pObj.addText('Лабораторная работа', {bold:true, font_face: "Times New Roman", font_size: 14})
            pObj.addLineBreak();
            pObj.addText(`«${algorithms[0].name}»`, {bold:true, font_face: "Times New Roman", font_size: 14})
            pObj.addLineBreak();
            pObj.addText('по дисциплине: ', {font_face: "Times New Roman", font_size: 14})
            pObj.addText('Алгоритмы и анализ сложности', {bold:true, font_face: "Times New Roman", font_size: 14})
            pObj.addLineBreak();
            pObj = docx.createP();
            pObj.addText(`Выполнил студент группы ${reportData.user.group.name}: ${reportData.user.surname} ${reportData.user.name}`, {font_face: "Times New Roman", font_size: 14})
            pObj.addLineBreak();
            pObj.addText(`Проверил: ${reportData.user.group.teacher.surname} ${reportData.user.group.teacher.name}`, {font_face: "Times New Roman", font_size: 14})
            docx.putPageBreak();
            pObj = docx.createP();
            pObj.addText(`Цель работы: `, {bold:true, font_face: "Times New Roman", font_size: 14});
            pObj.addText(algorithms[0].aim, {font_face: "Times New Roman", font_size: 14});
            pObj.addLineBreak();
            pObj.addText(`Код программы` , {bold:true, font_face: "Times New Roman", font_size: 14})
            pObj.addLineBreak();
            reportData.code.split('/n').forEach(element => {
                pObj.addText(element, {font_face: "Times New Roman", font_size: 14});
                pObj.addLineBreak();
            });



            // Выгрузка отчета в папку для раздачи как статику
            let out = fs.createWriteStream(`static/${nameDocx}`)
            out.on('error', (err) => {
                console.log(err);
                next(ApiError.badRequest(err.message));
            })
            docx.generate(out);
            return res.json({docName: nameDocx});
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new reportWordController();