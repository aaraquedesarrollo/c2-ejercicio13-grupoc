import { facturas } from "../datos/facturas.js";

const milisegundosDia = 86400000;

const getFacturasTipo = (tipo) =>
  facturas.filter(
    (factura) => factura.tipo.toLowerCase() === tipo.toLowerCase()
  );

const getDiferenciaDias = (fecha1, fecha2) =>
  `${Math.ceil(Math.abs(fecha1 - fecha2) / milisegundosDia)} dias`;

const rellenarColumnaAbonada = (elemento, texto, eliminar, añadir) => {
  elemento.textContent = texto;
  elemento.classList.remove(eliminar);
  elemento.classList.add(añadir);
};

const calcularIva = (base, iva) => (base * iva) / 100;

const calcularBaseIva = (base, iva) => base + calcularIva(base, iva);

const arrayFacturas = getFacturasTipo("ingreso");
const tablaFacturas = document.querySelector(".tabla-facturas");

let baseTotalCont = 0;
let ivaTotalCont = 0;
let facturaTotalCont = 0;

const init = () => {
  for (const {
    numero,
    fecha,
    vencimiento,
    concepto,
    base,
    tipoIva,
    abonada,
  } of arrayFacturas) {
    const filaDummy = document.querySelector(".factura-dummy").cloneNode(true);
    filaDummy.classList.remove("factura-dummy");
    tablaFacturas.append(filaDummy);

    const facturaNumero = filaDummy.querySelector(".factura-num");
    const facturaFecha = filaDummy.querySelector(".factura-fecha");
    const facturaConcepto = filaDummy.querySelector(".factura-concepto");
    const facturaBase = filaDummy.querySelector(".factura-base");
    const facturaIva = filaDummy.querySelector(".factura-iva");
    const facturaTotal = filaDummy.querySelector(".factura-total");
    const facturaAbonada = filaDummy.querySelector(".factura-estado");
    const facturaVence = filaDummy.querySelector(".factura-vence");
    const fechaTimeStamp = new Date(fecha);

    facturaNumero.textContent = numero;
    facturaFecha.textContent = `${fechaTimeStamp.toLocaleDateString()}`;
    facturaConcepto.textContent = concepto;
    facturaBase.textContent = `${base}€`;
    facturaIva.textContent = `${calcularIva(base, tipoIva)}€ (${tipoIva}%)`;
    facturaTotal.textContent = `${calcularBaseIva(base, tipoIva)}€`;
    facturaAbonada.textContent = abonada;

    if (abonada) {
      rellenarColumnaAbonada(
        facturaAbonada,
        "Abonada",
        "table-danger",
        "table-success"
      );
      facturaVence.textContent = "-";
      facturaVence.classList.add("table-success");
    } else {
      if (vencimiento < Date.now()) {
        facturaVence.textContent = getDiferenciaDias(Date.now(), vencimiento);
        facturaVence.classList.add("table-success");
      } else {
        facturaVence.textContent = getDiferenciaDias(vencimiento, Date.now());
        facturaVence.classList.add("table-danger");
      }
      rellenarColumnaAbonada(
        facturaAbonada,
        "Pendiente",
        "table-success",
        "table-danger"
      );
    }

    baseTotalCont += base;
    ivaTotalCont += calcularIva(base, tipoIva);
    facturaTotalCont += calcularBaseIva(base, tipoIva);
  }

  const baseTotal = document.querySelector(".base-total");
  const ivaTotal = document.querySelector(".iva-total");
  const facturaTotal = document.querySelector(".factura-total-totales");

  baseTotal.textContent = `${baseTotalCont}€`;
  ivaTotal.textContent = `${ivaTotalCont}€`;
  facturaTotal.textContent = `${facturaTotalCont.toFixed(1)}€`;
};

init();
