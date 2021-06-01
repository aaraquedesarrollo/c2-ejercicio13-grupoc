import { facturas } from "../datos/facturas.js";

const getFacturasTipo = (tipo) =>
  facturas.filter(
    (factura) => factura.tipo.toLowerCase() === tipo.toLowerCase()
  );

const arrayFacturas = getFacturasTipo("ingreso");

const tablaFacturas = document.querySelector(".tabla-facturas");

for (const {
  numero,
  fecha,
  vencimiento,
  concepto,
  base,
  tipoIva,
  tipo,
  abonada,
} of arrayFacturas) {
  const filaDummy = document.querySelector(".factura-dummy").cloneNode(true);
  filaDummy.classList.remove("factura-dummy");
  tablaFacturas.append(filaDummy);
  const facturaNumero = filaDummy.querySelector(".factura-num");
  facturaNumero.textContent = numero;
  const facturaFecha = filaDummy.querySelector(".factura-fecha");
  facturaFecha.textContent = fecha;
  const facturaConcepto = filaDummy.querySelector(".factura-concepto");
  facturaConcepto.textContent = concepto;
  const facturaBase = filaDummy.querySelector(".factura-base");
  facturaBase.textContent = base;
  const facturaIva = filaDummy.querySelector(".factura-iva");
  facturaIva.textContent = tipoIva;
  const facturaTotal = filaDummy.querySelector(".factura-total");
  facturaTotal.textContent = base + (base * tipoIva) / 100;
  const facturaAbonada = filaDummy.querySelector(".factura-estado");
  facturaAbonada.textContent = abonada;
  if (abonada) {
    facturaAbonada.textContent = "abonada";
    facturaAbonada.classList.remove("table-danger");
    facturaAbonada.classList.add("table-success");
  } else {
    facturaAbonada.textContent = "no abonada";
    facturaAbonada.classList.add("table-danger");
    facturaAbonada.classList.remove("table-success");
  }
}
