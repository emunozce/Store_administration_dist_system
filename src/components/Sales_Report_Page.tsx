import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

interface Producto {
  producto: string;
  cantidad: number;
  precio: number;
}

const data: Producto[] = [
  
    {"producto": "Manzana", "cantidad": 20, "precio": 0.50},
    {"producto": "Banana", "cantidad": 30, "precio": 0.30},
    {"producto": "Leche", "cantidad": 15, "precio": 1.20},
    {"producto": "Pan", "cantidad": 10, "precio": 1.00},
    {"producto": "Arroz", "cantidad": 25, "precio": 0.90},
    {"producto": "Frijoles", "cantidad": 12, "precio": 1.50},
    {"producto": "Tomate", "cantidad": 18, "precio": 0.80},
    {"producto": "Lechuga", "cantidad": 14, "precio": 0.70},
    {"producto": "Pollo", "cantidad": 9, "precio": 5.50},
    {"producto": "Carne de res", "cantidad": 7, "precio": 7.80},
    {"producto": "Pasta", "cantidad": 22, "precio": 1.10},
    {"producto": "Aceite de oliva", "cantidad": 5, "precio": 6.00},
    {"producto": "Mantequilla", "cantidad": 8, "precio": 2.50},
    {"producto": "Queso", "cantidad": 13, "precio": 3.80},
    {"producto": "Yogur", "cantidad": 16, "precio": 1.00},
    {"producto": "Cereal", "cantidad": 20, "precio": 4.00},
    {"producto": "Galletas", "cantidad": 25, "precio": 2.00},
    {"producto": "Helado", "cantidad": 6, "precio": 4.50},
    {"producto": "Café", "cantidad": 10, "precio": 3.00},
    {"producto": "Té", "cantidad": 12, "precio": 2.50},
    {"producto": "Azúcar", "cantidad": 18, "precio": 1.20},
    {"producto": "Sal", "cantidad": 22, "precio": 0.70},
    {"producto": "Pimienta", "cantidad": 10, "precio": 1.00},
    {"producto": "Ajo", "cantidad": 15, "precio": 0.90},
    {"producto": "Cebolla", "cantidad": 20, "precio": 0.60},
    {"producto": "Zanahoria", "cantidad": 17, "precio": 0.50},
    {"producto": "Pimiento", "cantidad": 14, "precio": 1.20},
    {"producto": "Pepino", "cantidad": 18, "precio": 0.80},
    {"producto": "Calabacín", "cantidad": 12, "precio": 1.00},
    {"producto": "Brócoli", "cantidad": 9, "precio": 1.30},
    {"producto": "Coliflor", "cantidad": 11, "precio": 1.50},
    {"producto": "Espinaca", "cantidad": 13, "precio": 1.20},
    {"producto": "Champiñones", "cantidad": 10, "precio": 2.00},
    {"producto": "Lentejas", "cantidad": 20, "precio": 1.00},
    {"producto": "Garbanzos", "cantidad": 18, "precio": 1.10},
    {"producto": "Quinoa", "cantidad": 7, "precio": 3.00},
    {"producto": "Avena", "cantidad": 25, "precio": 1.20},
    {"producto": "Miel", "cantidad": 8, "precio": 4.00},
    {"producto": "Atún", "cantidad": 15, "precio": 2.50},
    {"producto": "Sardinas", "cantidad": 12, "precio": 1.80},
    {"producto": "Huevo", "cantidad": 30, "precio": 0.20},
    {"producto": "Jugo de naranja", "cantidad": 10, "precio": 3.50},
    {"producto": "Agua mineral", "cantidad": 25, "precio": 0.80},
    {"producto": "Refresco", "cantidad": 18, "precio": 1.50},
    {"producto": "Cerveza", "cantidad": 12, "precio": 2.00},
    {"producto": "Vino tinto", "cantidad": 6, "precio": 10.00},
    {"producto": "Champaña", "cantidad": 4, "precio": 25.00},
    {"producto": "Whisky", "cantidad": 5, "precio": 30.00},
    {"producto": "Vodka", "cantidad": 8, "precio": 20.00},
    {"producto": "Ron", "cantidad": 7, "precio": 18.00},
    {"producto": "Gin", "cantidad": 9, "precio": 22.00},
    {"producto": "Tequila", "cantidad": 6, "precio": 25.00},
    {"producto": "Champú", "cantidad": 15, "precio": 4.00},
    {"producto": "Acondicionador", "cantidad": 10, "precio": 4.50},
    {"producto": "Jabón", "cantidad": 25, "precio": 1.00},
    {"producto": "Pasta de dientes", "cantidad": 20, "precio": 2.50},
    {"producto": "Cepillo de dientes", "cantidad": 15, "precio": 3.00},
    {"producto": "Papel higiénico", "cantidad": 30, "precio": 0.70},
    {"producto": "Toallas de papel", "cantidad": 20, "precio": 1.20},
    {"producto": "Detergente", "cantidad": 10, "precio": 5.00},
    {"producto": "Suavizante", "cantidad": 8, "precio": 4.00},
    {"producto": "Limpiador multiuso", "cantidad": 12, "precio": 3.00},
    {"producto": "Esponjas", "cantidad": 20, "precio": 0.50},
    {"producto": "Toallitas desinfectantes", "cantidad": 18, "precio": 2.50},
    {"producto": "Bolsa de basura", "cantidad": 25, "precio": 1.00},
    {"producto": "Velas", "cantidad": 10, "precio": 2.00},
    {"producto": "Fósforos", "cantidad": 30, "precio": 0.20},
    {"producto": "Baterías", "cantidad": 15, "precio": 2.50},
    {"producto": "Pilas recargables", "cantidad": 8, "precio": 10.00},
    {"producto": "Linterna", "cantidad": 5, "precio": 8.00},
    {"producto": "Cargador de teléfono", "cantidad": 12, "precio": 6.00},
    {"producto": "Cable USB", "cantidad": 20, "precio": 3.00},
    {"producto": "Audífonos", "cantidad": 10, "precio": 15.00},
    {"producto": "Parlante Bluetooth", "cantidad": 7, "precio": 25.00},
    {"producto": "Ratón inalámbrico", "cantidad": 10, "precio": 12.00},
    {"producto": "Teclado", "cantidad": 8, "precio": 20.00},
    {"producto": "Monitor", "cantidad": 5, "precio": 150.00},
    {"producto": "Laptop", "cantidad": 3, "precio": 600.00},
    {"producto": "Teléfono móvil", "cantidad": 4, "precio": 400.00},
    {"producto": "Tableta", "cantidad": 5, "precio": 200.00},
    {"producto": "Cámara digital", "cantidad": 2, "precio": 300.00},
    {"producto": "Televisor", "cantidad": 3, "precio": 500.00},
    {"producto": "Consola de videojuegos", "cantidad": 2, "precio": 400.00},
    {"producto": "Videojuego", "cantidad": 15, "precio": 60.00},
    {"producto": "Reloj inteligente", "cantidad": 6, "precio": 250.00},
    {"producto": "Pulsera de actividad", "cantidad": 8, "precio": 100.00},
    {"producto": "Cámara de seguridad", "cantidad": 4, "precio": 150.00},
    {"producto": "Termostato inteligente", "cantidad": 5, "precio": 120.00},
    {"producto": "Bombilla inteligente", "cantidad": 10, "precio": 15.00},
    {"producto": "Enchufe inteligente", "cantidad": 12, "precio": 20.00},
    {"producto": "Robot aspirador", "cantidad": 3, "precio": 300.00},
    {"producto": "Freidora de aire", "cantidad": 6, "precio": 100.00},
    {"producto": "Olla de presión", "cantidad": 8, "precio": 80.00},
    {"producto": "Licuadora", "cantidad": 10, "precio": 50.00},
    {"producto": "Batidora", "cantidad": 7, "precio": 40.00},
    {"producto": "Tostadora", "cantidad": 12, "precio": 25.00}
];

export default function Sales_Report_Page() {
  const [page, setPage] = React.useState(1);
  const [sortKey, setSortKey] = React.useState<keyof Producto>("producto"); // Aquí especificamos el tipo de sortKey
  const [sortDirection, setSortDirection] = React.useState("asc");

  const rowsPerPage = 10;
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  // Función para ordenar los datos
  const sortedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const first = a[sortKey];
      const second = b[sortKey];

      if (sortDirection === "asc") {
        return first > second ? 1 : -1;
      } else {
        return first < second ? 1 : -1;
      }
    });
    return sorted.slice(start, end);
  }, [data, start, end, sortKey, sortDirection]);

  // Función para cambiar la dirección de ordenamiento
  const toggleSortDirection = (key: keyof Producto) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const pages = Math.ceil(data.length / rowsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Table aria-label="Sales Report">
        <TableHeader>
          <TableColumn key="producto" allowsSorting onClick={() => toggleSortDirection("producto")}>
            Producto
          </TableColumn>
          <TableColumn key="cantidad" allowsSorting onClick={() => toggleSortDirection("cantidad")}>
            Cantidad
          </TableColumn>
          <TableColumn key="precio" allowsSorting onClick={() => toggleSortDirection("precio")}>
            Precio
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.producto}</TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>{item.precio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: '20px' }}>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}
