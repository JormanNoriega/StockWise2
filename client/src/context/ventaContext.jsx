import { createContext, useContext, useState } from "react";
import { createVentaRequest, getVentaRequest, getProductosRequest, getVentasRequest } from '../api/Venta/ventaAuth';

const VentaContext = createContext();

export const useVenta = () => {
    const context = useContext(VentaContext);
    if (!context) {
        throw new Error("useVenta está siendo usado fuera de un VentaProvider");
    }
    return context;
}

export function VentaProvider({ children }) {
    const [ventas, setVentas] = useState([]);
    const [productos, setProducto] = useState([]);

    const getProducto = async () => {
        try {
            const res = await getProductosRequest();
            setProducto(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const getVentas = async () => {
        try {
            const res = await getVentasRequest();
            const ventasConDetalles = res.data.map(venta => ({
                ...venta,
                detallesVenta: Array.isArray(venta.detallesVenta) ? venta.detallesVenta : []
            }));
            setVentas(ventasConDetalles);
        } catch (error) {
            console.error(error);
        }
    }

    const getVenta = async (idVenta) => {
        try {
            const res = await getVentaRequest(idVenta);
            return {
                ...res.data,
                detallesVenta: Array.isArray(res.data.detallesVenta) ? res.data.detallesVenta : []
            };
        } catch (error) {
            console.log(error);
        }
    }

    const createVenta = async (venta) => {
        try {
            const res = await createVentaRequest(venta);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VentaContext.Provider value={{
            ventas,
            productos,
            getVentas,
            getVenta,
            createVenta,
            getProducto
        }}>
            {children}
        </VentaContext.Provider>
    )
}
