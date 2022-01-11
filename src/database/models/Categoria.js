module.exports = (sequelize, DataTypes) => {
    let alias = "Categoria";

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
            allowNull: false
        }
    };

    let config = {
        timestamps: false,
        tableName: "categorias"
    };

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "categoria_id",
            timestamps: false
        });
    }

    return Categoria;
}