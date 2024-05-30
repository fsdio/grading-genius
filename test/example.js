// Definisi Kelas
class Book {
	constructor(title, author, year) {
		this.title = title;
		this.author = author;
		this.year = year;
	}
	
	getSummary() {
		return `${this.title} was written by ${this.author} in ${this.year}.`;
	}
}

// Variabel Global
let library = [];

// Fungsi untuk Menambahkan Buku ke Perpustakaan
function addBookToLibrary(book) {
	library.push(book);
	console.log(`Book titled "${book.title}" has been added to the library.`);
}

// Fungsi untuk Mencari Buku berdasarkan Judul
function findBookByTitle(title) {
	return library.find(book => book.title.toLowerCase() === title.toLowerCase());
}

// Fungsi untuk Menghapus Buku dari Perpustakaan berdasarkan Judul
function removeBookByTitle(title) {
	const index = library.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
	if (index !== -1) {
		const removedBook = library.splice(index, 1);
		console.log(`Book titled "${removedBook[0].title}" has been removed from the library.`);
		return true;
	} else {
		console.log(`No book found with the title "${title}".`);
		return false;
	}
}

// Contoh Penggunaan
const book1 = new Book('To Kill a Mockingbird', 'Harper Lee', 1960);
const book2 = new Book('1984', 'George Orwell', 1949);
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
