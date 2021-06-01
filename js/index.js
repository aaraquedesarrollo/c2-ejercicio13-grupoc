import { facturas } from "../datos/facturas.js";

const getFacturasTipo = (tipo) =>
  facturas.filter(
    (factura) => factura.tipo.toLowerCase() === tipo.toLowerCase()
  );

const arrayFacturas = getFacturasTipo("ingreso");

const tablaFacturas = document.querySelector(".tabla-facturas");

arrayFacturas.forEach((factura) => {
  const filaDummy = document.querySelector(".factura-dummy").cloneNode(true);
  filaDummy.classList.remove("factura-dummy");
  tablaFacturas.append(filaDummy);
});
