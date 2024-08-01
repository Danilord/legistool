import * as XLSX from 'xlsx';

const handleExportExcel = () => {
  const exportData = regulacionesFiltradas.map((reg) => ({
    Permiso: reg.permiso,
    'Tipo de Documento': reg.tipoDocumento,
    'Fecha de Otorgamiento': reg.fechaOtorgamiento,
    'Fecha de Expiración': reg.fechaExpiracion,
    Descripción: reg.descripcion,
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Regulaciones');

  // Exportar el archivo .xlsx
  XLSX.writeFile(wb, `Regulaciones_${sucursal}.xlsx`);
};
