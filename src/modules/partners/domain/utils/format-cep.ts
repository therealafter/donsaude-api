export function validateAndFormatCNPJ(cnpj: string) {
  const cleanedCNPJ = cnpj.replace(/[^\d]/g, '');

  if (cleanedCNPJ.length !== 14) {
    console.log('CNPJ tem um tamanho inválido:', cleanedCNPJ.length);
    return null;
  }

  return cleanedCNPJ;
}
