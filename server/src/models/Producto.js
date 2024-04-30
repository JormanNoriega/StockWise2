import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { DetalleVenta } from "./DetalleVenta.js";

export const Producto = sequelize.define(
  "productos",
  {
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codProducto: {
      type: DataTypes.INTEGER,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
    },
    idProveedor: {
      type: DataTypes.INTEGER,
    },
    nombProducto: {
      type: DataTypes.STRING,
    },
    precioCompra: {
      type: DataTypes.DOUBLE,
    },
    precioVenta: {
      type: DataTypes.DOUBLE,
    },
    vecimiento: {
      type: DataTypes.DATE,
    },
    
  },
  {
    primaryKey: true,
    composite: true,
  }
);

//RELACION CON DETALLE VENTA
Producto.hasMany(DetalleVenta, {
  foreignKey: "idProducto",
  sourceKey: "idProducto",
});

DetalleVenta.belongsTo(Producto, {
  foreignKey: "idProducto",
  targetID: "idProducto",
});
