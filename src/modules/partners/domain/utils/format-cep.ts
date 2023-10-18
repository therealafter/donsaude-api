export function validateAndFormatCNPJ(cnpj: string) {
  const cleanedCNPJ = cnpj.replace(/[^\d]/g, '');

  if (cleanedCNPJ.length !== 14) {
    return null;
  }

  const digits = cleanedCNPJ.split('').map(Number);

  const verifier1 =
    (digits[0] * 5 +
      digits[1] * 4 +
      digits[2] * 3 +
      digits[3] * 2 +
      digits[4] * 9 +
      digits[5] * 8 +
      digits[6] * 7 +
      digits[7] * 6 +
      digits[8] * 5) %
    11;

  const verifier2 =
    (digits[0] * 6 +
      digits[1] * 5 +
      digits[2] * 4 +
      digits[3] * 3 +
      digits[4] * 2 +
      digits[5] * 9 +
      digits[6] * 8 +
      digits[7] * 7 +
      digits[8] * 6 +
      verifier1 * 5) %
    11;

  if (
    (verifier1 === digits[9] || (verifier1 >= 10 && verifier1 === 0)) &&
    (verifier2 === digits[10] || (verifier2 >= 10 && verifier2 === 0))
  ) {
    // CNPJ válido, formate-o
    return cleanedCNPJ.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  return null; // CNPJ inválido
}
