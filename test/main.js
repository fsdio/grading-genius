import { checkEqualCode } from '../lib/checkEqualsCode.js';
import { getAllSpesification } from "../lib/checkSpesifications.js";
import { checkExpecteds } from "../lib/checkExpecteds.js";
import fs from "fs";

async function readFileCode(namaFile) {
	try {
		return await fs.promises.readFile(namaFile, 'utf8');
	} catch (err) {
		throw err;
	}
}

const code = await readFileCode('test/example.js');
const code1 = await readFileCode('test/hello.js');

console.log(await checkEqualCode(code,code));
console.log(getAllSpesification(code));
console.log(checkExpecteds('test/script.js', 'test/script-pro.js'));
