import fs from "fs";
import {checkExpecteds, checkEqualsCode, checkSpesifications} from "../index.js";

try {
	const example_code = fs.readFileSync('test/example.js', 'utf8');
	const programmer_code = fs.readFileSync('test/programmer_1.js', 'utf8');
	
	// Untuk mengecek kesamaan kode sumber
	const resultEqual = await checkEqualsCode.checkEqualCode(example_code, programmer_code);
	console.log(resultEqual);
	
	// Untuk mengetahui spesifikasi dalam sebuah kode
	const resultSpesifikasi = checkSpesifications.getAllSpecifications(programmer_code);
	console.log(JSON.stringify(resultSpesifikasi));
	
	// fungsi ini akan mengecek kesamaan output dari file yang lainnya
	const equalWithOutTerminal = await checkEqualsCode.checkEqualCode('test/example.js', 'test/programmer_1.js');
	console.log(equalWithOutTerminal);
	
	const ecpectedWithOutTerminal = checkExpecteds.checkExpecteds('test/example.js', 'test/programmer_1.js');
	console.log(ecpectedWithOutTerminal);
} catch (err) {
	console.error('Gagal membaca file:', err);
}
