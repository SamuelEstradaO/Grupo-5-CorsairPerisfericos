module.exports = (sequelize, DataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: DataTypes.BIGINT(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        userImage: {
            type: DataTypes.STRING(100),
        },
        isAdmin: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            defaultValue: 0,
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function (models) {
        Usuario.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'cart',
            foreignKey: 'usuario_id',
            otherKey: 'producto_id',
            timestamps: false
        })
    };

    return Usuario;
}