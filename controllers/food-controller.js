const foodModel = require(`../models/index`).food
const upload = require(`./upload-food`)
const path = require(`path`)
const fs = require(`fs`)
const joi = require(`joi`)
const { Op } = require("sequelize")
const { data } = require("jquery")

const validateFood = (input) => {
    let rules = joi.object().keys({
        nama_food: joi
            .string()
            .required(),
        spicy_level: joi
            .string()
            .required(),
        price: joi
            .number()
            .required()
    })
    let { error } = rules.validate(input)
    if (error) {
        let message = error
            .details
            .map(item => item.message)
            .join(`,`)

        return {
            status: false,
            message: message
        }
    }
    return {
        status: true
    }
}

exports.addFood = async (request, response) => {
    try {
        const uploadFood = upload.single(`image`)
        uploadFood(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            if (!request.file) {
                return response.json({
                    status: false,
                    message: `Nothing file to upload`
                })
            }

            let resultValidation = validateFood(request.body)
            if (resultValidation.status === false) {
                return response.json({
                    status: false,
                    message: resultValidation.message
                })
            }

            request.body.image = request.file.filename

            const dataFood = await foodModel.create(request.body)
            // await foodModel.create(request.body)
            return response.json({
                status: true,
                data: dataFood,
                message: `Food has created`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.getFood = async (request, response) => {
    try {
        let result = await foodModel.findAll()
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

exports.filterFood = async (request, response) => {
    try {
        let keyword = request.body.keyword
        let result = await foodModel.findAll({
            where: {
                [Op.or]: {
                    id_food: { [Op.substring]: keyword }, // Perbaikan: Menggunakan id_food
                    nama_food: { [Op.substring]: keyword }
                }
            }
        })
        return response.json({
            status: true,       
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

exports.updateFood = async (request, response) => {
    try {
        const uploadFood = upload.single(`image`)
        uploadFood(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            let id_food = request.params.id_food
            let selectedFood = await foodModel.findOne({ where: { id_food: id_food } })
            if (request.file) {
                let oldFilename = selectedFood.image
                let pathFile = path.join(__dirname, `../food-image`, oldFilename)
                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile, error => { console.log(error) })
                }
                request.body.image = request.file.filename
            }
            await foodModel.update(request.body, { where: { id_food: id_food } })
            return response.json({
                status: true,
                message: `Data menu berhasil diubah`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteFood = async (request, response) => {
    try {
        let id_food = request.params.id_food
        let selectedFood = await foodModel.findOne({ where: { id_food: id_food } })
        let pathFile = path.join(__dirname, `../food-image`, selectedFood.image)
        if (fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile, error => { console.log(error) })
        }
        await foodModel.destroy({ where: { id_food: id_food } })
        return response.json({
            status: true,
            message: `Data food berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

// food-controller.js
exports.getFoodById = async (request, response) => {
    try {
        const id_food = request.params.id_food;
        const food = await foodModel.findByPk(id_food);

        if (!food) {
            return response.status(404).json({
                status: false,
                message: "Makanan tidak ditemukan."
            });
        }

        return response.json({
            status: true,
            data: food
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error.message
        });
    }
};
