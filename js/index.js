import { facturas } from "../datos/facturas.js";

const getFacturasTipo = (tipo) =>
  facturas.filter(
    (factura) => factura.tipo.toLowerCase() === tipo.toLowerCase()
  );

const arrayFacturas = getFacturasTipo("ingreso");
const tablaFacturas = document.querySelector(".tabla-facturas");
let baseTotalCont = 0;
let ivaTotalCont = 0;
let facturaTotalCont = 0;

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
  const fechaTimeStamp = new Date(fecha);
  facturaFecha.textContent = `${fechaTimeStamp.getDay()}/${fechaTimeStamp.getMonth()}/${fechaTimeStamp.getFullYear()}`;
  const facturaConcepto = filaDummy.querySelector(".factura-concepto");
  facturaConcepto.textContent = concepto;
  const facturaBase = filaDummy.querySelector(".factura-base");
  facturaBase.textContent = `${base}€`;
  const facturaIva = filaDummy.querySelector(".factura-iva");
  facturaIva.textContent = `${(base * tipoIva) / 100}€ (${tipoIva})%`;
  const facturaTotal = filaDummy.querySelector(".factura-total");
  facturaTotal.textContent = base + (base * tipoIva) / 100;
  const facturaAbonada = filaDummy.querySelector(".factura-estado");
  facturaAbonada.textContent = abonada;
  if (abonada) {
    facturaAbonada.textContent = "Abonada";
    facturaAbonada.classList.remove("table-danger");
    facturaAbonada.classList.add("table-success");
  } else {
    facturaAbonada.textContent = "Pendiente";
    facturaAbonada.classList.add("table-danger");
    facturaAbonada.classList.remove("table-success");
  }

  baseTotalCont += base;
  ivaTotalCont += (base * tipoIva) / 100;
  facturaTotalCont += base + (base * tipoIva) / 100;
}

const baseTotal = document.querySelector(".base-total");
const ivaTotal = document.querySelector(".iva-total");
const facturaTotal = document.querySelector(".factura-total-totales");

console.log(facturaTotal);

baseTotal.textContent = `${baseTotalCont}€`;
ivaTotal.textContent = `${ivaTotalCont}€`;
facturaTotal.textContent = `${facturaTotalCont.toFixed(1)}€`;
console.log(facturaTotal);
