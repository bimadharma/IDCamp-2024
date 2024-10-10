function fibonacci(n) {
    const fib = []; // Array untuk menyimpan deret Fibonacci

    // Fungsi rekursif untuk menghitung Fibonacci
    function fibHelper(num) {
    
        if (num === 0) {
            return 0;
        }
        if (num === 1) {
            return 1;
        }
        // Menghitung nilai Fibonacci dengan rekursi
        return fibHelper(num - 1) + fibHelper(num - 2);
    }

    // Fungsi rekursif untuk menghasilkan deret Fibonacci
    function generateFibonacci(index) {
        // Kasus dasar untuk menghentikan rekursi
        if (index > n) {
            return; 
        }
        fib.push(fibHelper(index)); 
        generateFibonacci(index + 1); 
    }

    // Mulai proses rekursif dari index 0
    generateFibonacci(0);

    return fib; // Kembalikan deret Fibonacci
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
