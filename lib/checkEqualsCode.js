import { ESLint } from 'eslint';

const eslint = new ESLint();
export async function checkEqualCode(code1, code2) {
	try {
		// Menghapus spasi kosong yang berlebihan
		const normalizedCode1 = code1.replace(/\s+/g, ' ').trim();
		const normalizedCode2 = code2.replace(/\s+/g, ' ').trim();
		
		// Memeriksa kesamaan string yang telah dinormalisasi
		return normalizedCode1 === normalizedCode2;
	} catch (error) {
		console.error(error);
		return false; // Mengembalikan false jika terjadi kesalahan
	}
}
