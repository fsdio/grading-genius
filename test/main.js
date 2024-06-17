import fs from "fs";
import { CodeAnalyzer } from "../index.js";

try {
	const analyzer = new CodeAnalyzer();
	// Untuk mengecek kesamaan kode sumber
	const resultEqual = analyzer.compareFileOutputs('example.js', 'programmer_1.js');
	console.log(resultEqual);
	
	// Cek Spesifikasi
	const specifications = analyzer.getSpecificationsFromCode('example.js');
	console.log(specifications);
} catch (err) {
	console.error('Gagal membaca file:', err)
}
