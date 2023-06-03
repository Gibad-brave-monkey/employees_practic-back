const { prisma } = require("../prisma/prisma-client.js");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json({
      employees,
    });
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Не удалось добавить сотрудника",
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json({
      message: "Ок",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Не удалось удалить сотрудника",
    });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json({
      message: "OK",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Не удалось редактировать сотрудника",
    });
  }
};

const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Не удалось изменить сотрудника",
    });
  }
};

module.exports = { all, add, remove, edit, employee };
