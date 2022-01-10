module.exports = (sequelize, DataTypes) => {
  let alias = "Producto";

  let cols = {
    id: {
      type: DataTypes.BIGINT(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrememt: true,
      unique: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT(),
    },
    precio: {
      type: DataTypes.INT(11),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    caracteristicas: {
      type: DataTypes.TEXT(),
    },
    stock: {
      type: DataTypes.INT(11),
      allowNull: false,
    },
    isRecommended: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      defaultValue: 0,
    },
    categoria_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };
  let config = {
    timestamps: true,
    createdAt: "created_at",
    updateAt: "update_at",
    deteledAt: false,
  };

  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = (models) => {
    Producto.belongsToMany(models.Usuario, {
      as: "usuarios",
      through: "carts",
      foreignKey: "producto_id",
      otherKey: "usuario_id",
      timestamps: false,
    });
  };
  return Producto;
};
