function getHello() {}
const getSwap = function() {};
const getArrow = () => {};
class MyClass {
	getMethod() {}
}
const obj = {
	getObjMethod() {}
};

class Swapper {
	constructor(angka1, angka2) {
		this.angka1 = angka1;
		this.angka2 = angka2;
	}
	getSwap() {
		// ANSWER CODE IN HERE
		this.angka1 ^= this.angka2;
		this.angka2 ^= this.angka1;
		this.angka1 ^= this.angka2;
	}
}

const swapper = new Swapper(1, 2);
swapper.getSwap();
console.log(swapper.angka1);
console.log(swapper.angka2);
