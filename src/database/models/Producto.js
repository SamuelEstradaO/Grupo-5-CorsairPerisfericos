module.exports = (sequelize, DataTypes) => {
  let alias = "Producto";

  let cols = {
    id: {
      type: DataTypes.BIGINT(11).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT(),
    },
    precio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(100)
    },
    caracteristicas: {
      type: DataTypes.TEXT(),
    },
    stock: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0
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
    updatedAt: "updated_at",
    deteledAt: false,
  };

  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = (models) => {
    Producto.belongsToMany(models.Usuario, {
      as: "usuarios",
      through: "cart",
      foreignKey: "producto_id",
      otherKey: "usuario_id",
      timestamps: false,
    });

    Producto.belongsTo(models.Categoria, {
        as: "categoria",
        foreignKey: "categoria_id",
        timestamps: false,
    });
  };

  return Producto;
};
