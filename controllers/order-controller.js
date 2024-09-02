const { data } = require("jquery");

const order_listModel = require(`../models/index`).order_list;
const order_detailModel = require(`../models/index`).order_detail;
const foodModel = require(`../models/index`).food;

exports.getOrder = async (request, response) => {
  try {
    let result = await order_listModel.findAll({
      include: [
        {
          model: order_detailModel,
          as: "order_detail",
          include: [{ model: foodModel, as: "food" }],
        },
      ],
      order: [["createdAt", "DESC"]],
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

exports.addOrder = async (request, response) => {
  try {
    // Memeriksa apakah ada detail pesanan yang diberikan
    if (!request.body.order_detail || request.body.order_detail.length === 0) {
      throw new Error("Eits, ada yang belum diisi!");
    }

    let order = {
      customer_name: request.body.customer_name,
      table_number: request.body.table_number,
      order_date: request.body.order_date,
      status: "belum_bayar",
    };

    let insertOrder = await order_listModel.create(order);
    let orderID = insertOrder.id_order_list;
    let arrayDetail = request.body.order_detail;

    for (let i = 0; i < arrayDetail.length; i++) {
      // Memeriksa apakah harga dan jumlah pesanan tersedia
      if (!arrayDetail[i].id_food || !arrayDetail[i].jumlah || !arrayDetail[i].price) {
        throw new Error("Eits, ada yang belum diisi!");
      }

      arrayDetail[i].id_order_list = orderID;
      let food = await foodModel.findOne({
        where: { id_food: arrayDetail[i].id_food },
      });
      arrayDetail[i].price = food ? food.price : 0;
    }

    await order_detailModel.bulkCreate(arrayDetail);

    return response.json({
      status: true,
      insertOrder,
      message: `Order list has created`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


exports.updateOrder = async (request, response) => {
  try {
    const id_order_list = request.params.id_order_list;
    const newData = {
      status: request.body.status,
    };

    // Memeriksa apakah ada perubahan status yang diberikan
    if (!newData.status) {
      throw new Error("Eits, ada yang belum diisi!");
    }

    const order = await order_listModel.findByPk(id_order_list);
    if (!order) {
      throw new Error("order not found.");
    }

    await order_listModel.update(newData, {
      where: { id_order_list },
    });

    return response.json({
      status: true,
      message: "Data order berhasil diubah",
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


exports.updateStatus = async (request, response) => {
  try {
    const id_order_list = request.params.id_order_list;
    const status = request.body.status;

    // Memperbarui status order
    await order_listModel.update({ status }, { where: { id_order_list } });

    // Mengambil data order terbaru setelah update
    const updatedOrder = await order_listModel.findByPk(id_order_list);

    // Memastikan order ditemukan
    if (!updatedOrder) {
      return response.json({
        status: false,
        message: "Order not found.",
      });
    }

    return response.json({
      status: true,
      data: updatedOrder, // Mengembalikan data order terbaru
      message: "Order status has been updated",
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


exports.deleteOrder = async (request, response) => {
  try {
    let id_order_list = request.params.id_order_list;
    await order_detailModel.destroy({ where: { id_order_list: id_order_list } });
    await order_listModel.destroy({ where: { id_order_list: id_order_list } });

    return response.json({
      status: true,
      message: `Data order berhasil dihapus`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};
