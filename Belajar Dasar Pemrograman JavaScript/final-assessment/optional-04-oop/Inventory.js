/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */

// Inventory.js
import Item from './Item.js';

class Inventory {
  constructor() {
    this.items = []; // Inisialisasi properti items sebagai array
  }

  addItem(item) {
    this.items.push(item); // Menambahkan item ke dalam array items
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id); // Menghapus item berdasarkan id
  }

  listItems() {
    return this.items.map(item => item.displayDetails()).join('\n'); // Mengembalikan string detail dari semua item
  }
}

// Jangan hapus kode di bawah ini!
export default Inventory;
