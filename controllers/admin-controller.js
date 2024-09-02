const adminModel = require(`../models/index`).admin;
const joi = require(`joi`);
const { Op } = require("sequelize");


const validateAdmin = (input) => {
    let rules = joi.object().keys({
        nama_admin: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().min(2),
    });
    let { error } = rules.validate(input);
    if (error) {
      let message = error.details.map((item) => item.message).join(`,`);
      return {
        status: false,
        message: error.message,
      };
    }
    return {
      status: true,
    };
  };



exports.addAdmin = async (request, response) => {
    try {
      let { nama_admin, email, password } = request.body;
  
      // Validate registration input
      let resultValidation = validateAdmin(request.body);
      if (resultValidation.status === false) {
        return response.json({
          status: false,
          message: resultValidation.message,
        });
      }
  
      // Hash password before storing
    //   password = md5(password);
  
      await adminModel.create({ nama_admin, email, password });
  
  
      return response.json({
        status: true,
        message: `tambah data admin berhasil`,
      });
    } catch (error) {
      return response.json({
        status: false,
        message: error.message,
      });
    }
  };


exports.getAdmin = async (request, response) => {
  try {
    let result = await adminModel.findAll();
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

exports.findAdmin = async (request, response) => {
  try {
    let keyword = request.body.keyword;
    let result = await adminModel.findAll({
      where: {
        [Op.or]: {
          id_admin: { [Op.substring]: keyword },
          nama_admin: { [Op.substring]: keyword },
        },
      },
    });
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


exports.updateAdmin = async (request, response) => {
  try {
    let id_admin = request.params.id;
    let resultValidation = validateAdmin(request.body);
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }

    
    // if (request.body.password) {
    //   request.body.password = md5(request.body.password);
    // }

    await adminModel.update(request.body, { where: { id_admin: id_admin } });

    return response.json({
      status: true,
      message: `Data admin berhasil diubah`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteAdmin = async (request, response) => {
  try {
    let id_admin = request.params.id;
    await adminModel.destroy({ where: { id_admin: id_admin } });
    return response.json({
      status: true,
      message: `Data admin berhasil dihapus`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

