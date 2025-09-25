document.addEventListener('DOMContentLoaded', () => {
    // === DATA SISWA ===
    const daftarNamaSiswa = [
        "====== KELAS VII... ( 7 ) ======",
        "Aditya Fahreza",
        "Al-Fatir Nur Rizky",
        "Anita Nur'aini",
        "Arobi Hafiz",
        "Azriel Aizhafran",
        "Bayu Hadi Wibisono",
        "Delicia Alya Wibisono",
        "Dina",
        "Dini",
        "Dafa Caesar aprilio",
        "Faridzul Ilham Junaedi",
        "Haikal",
        "Hapid Zuhri",
        "Laura Runiandra Putri",
        "Lintang Nur Anggraeni",
        "Lisya Aisha A",
        "Mentari Falaysafitri R",
        "Miftahul Jannah",
        "Muhamad Azki Ramadan",
        "Muhammad Devine",
        "Muhammad Yogi Saputra",
        "Muhammad Azmi Fuadi",
        "Nazila Nurapriani",
        "Nazla Muzdalifah",
        "Noer Hasanah",
        "Pricilia Aqila Zahwa",
        "Radyan Putra Pratama",
        "Rifqah Aaidah Qoddriyah",
        "Tian Ramdani",
        "Yuliatun",
        "Royana",
        "====== KELAS VIII... ( 8 ) ======",
        "Jeven Setiawan",
        "Alvino",
        "Caprilio Harianja",
        "Dewi Cempaka Angraeni",
        "Fadel Raditya Hafiz",
        "Gihon Jeremy",
        "Herlangga",
        "Indah Agus Tina",
        "Izdinar Khalid Rahmansyah",
        "Keyla Ilmi Nur Fauziah",
        "Muhammad Caesar Hanief",
        "Mohammad Ridwan Maulana",
        "Muhamad Irfan Aditya",
        "Muhamad Rizki Aditya",
        "Nadilah Syafitri",
        "Nicky Fauziah",
        "Niken Widyaningsih",
        "Nurbaina",
        "Parid Ahmad Endang",
        "Sofyan Saputra",
        "Syarif Hidayatullah",
        "Teguh Pirmansyah",
        "Vanessa Ardila Putri",
        "Wan Naya Vanilla",
        "Yuni Awalia",
        "Anita Az-Zahra",
        "Alika Nayla Putri",
        "Muhamad Alam Fauzan",
        "Muhammad Zulfiqar",
        "Ilham Ramadhan",
        "====== KELAS IX... ( 9 ) ======",
        "Achmad Yoga Pratama",
        "Anisa Nazwa Putri",
        "Aulia",
        "Christian Septiranda",
        "Dea Inggita Khoirunnisa Rajiman",
        "Descham Adrian Mustamu",
        "Fatma Liviyana",
        "Bnu Tegar Athaullah",
        "Indri Nur'aini",
        "Juan Naufal Adelar",
        "Kanaya Thabita",
        "M Rio Setiawan",
        "M. Afrizal Natayudha",
        "M. Lazuardy Al Faribi Wibisono",
        "Malisa Dwi Lestari",
        "Muhammad Fahat",
        "Muhammad Rizky",
        "Natasya Nurainita",
        "Nizam Abdu Fadillah",
        "Nursahada",
        "Rafi Muhamad",
        "Renal Putra Selapada",
        "Sandy Saputra Namin",
        "Sila Rahmadani",
        "Tiara Nuraini",
        "Vieny Herlina Oktavia Hutabarat",
        "Zian Alqiano",
        "Deka Saputra",
        "Eva Nurmalasari",
        "Khaerunnissa",
        "Alexsandra Vania Maylani Putri"
    ];

    // === Seleksi Elemen UI ===
    const formTransaksi = document.getElementById('form-transaksi-sederhana');
    const inputNamaSiswa = document.getElementById('input-nama-siswa');
    const inputJenis = document.getElementById('input-jenis');
    const inputJumlah = document.getElementById('input-jumlah');
    
    // Display elements
    const totalSetoranDisplay = document.getElementById('total-setoran-display');
    const totalPenarikanDisplay = document.getElementById('total-penarikan-display');
    const saldoAkhirDisplay = document.getElementById('saldo-akhir-display');
    const historyBody = document.getElementById('history-body');
    const saldoPerSiswaBody = document.getElementById('saldo-per-siswa-body');
    
    // Quick stats
    const totalSiswaDisplay = document.getElementById('total-siswa');
    const quickSetoranDisplay = document.getElementById('quick-setoran');
    const quickPenarikanDisplay = document.getElementById('quick-penarikan');
    const quickSaldoDisplay = document.getElementById('quick-saldo');
    
    // UI Controls
    const toggleFormBtn = document.getElementById('toggle-form');
    const searchSiswaInput = document.getElementById('search-siswa');
    const sortSiswaBtn = document.getElementById('sort-siswa');
    const filterJenisSelect = document.getElementById('filter-jenis');
    const filterKelasSelect = document.getElementById('filter-kelas');
    const exportBtn = document.getElementById('export-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Modal elements
    const studentModal = document.getElementById('student-modal');
    const studentDetails = document.getElementById('student-details');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Toast element
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // State variables
    let sortOrder = 'asc';
    let currentStudentFilter = '';
    let currentJenisFilter = '';
    let currentKelasFilter = '';

    // === Fungsi Tambahan: Mengisi Dropdown Siswa ===
    function populateStudentDropdown() {
        inputNamaSiswa.innerHTML = '<option value="">-- Pilih Nama Siswa --</option>';
        
        daftarNamaSiswa.forEach(nama => {
            const option = document.createElement('option');
            option.value = nama;
            option.textContent = nama;
            
            if (nama.startsWith('======')) {
                option.disabled = true; 
                option.style.fontWeight = 'bold';
                option.style.backgroundColor = '#f0f0f0';
            }
            
            inputNamaSiswa.appendChild(option);
        });
    }

    // === Fungsi Data & Local Storage (DISIMPAN SEMPURNA) ===
    function getData() {
        try {
            const data = localStorage.getItem('transactionHistory');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading from Local Storage:', e);
            showToast('Gagal memuat data. Periksa konsol.', 'error');
            return [];
        }
    }

    function saveData(data) {
        try {
            localStorage.setItem('transactionHistory', JSON.stringify(data));
        } catch (e) {
            console.error('Error writing to Local Storage:', e);
            showToast('Gagal menyimpan data. Memori penuh?', 'error');
        }
    }
    
    function formatRupiah(number) {
        const absNumber = Math.abs(number);
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(absNumber);
    }

    // === Fungsi untuk menampilkan notifikasi toast (DISIMPAN SEMPURNA) ===
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        
        // Menggunakan nilai warna langsung karena variabel CSS tidak dapat diakses langsung
        let color;
        if (type === 'error') {
            color = '#dc3545'; // Contoh warna merah (danger)
        } else if (type === 'warning') {
            color = '#ffc107'; // Contoh warna kuning (warning)
        } else {
            color = '#28a745'; // Contoh warna hijau (success/default)
        }
        
        toast.style.backgroundColor = color;
        
        toast.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // === Logika Perhitungan (1: REKAPITULASI TOTAL SEKOLAH) ===
    function calculateRekapTotal() {
        const transactions = getData();
        let totalSetoran = 0;
        let totalPenarikan = 0;
        
        transactions.forEach(t => {
            if (t.type === 'Setoran') {
                totalSetoran += t.amount;
            } else if (t.type === 'Penarikan') {
                totalPenarikan += t.amount;
            }
        });
        
        const saldoAkhir = totalSetoran - totalPenarikan;
        
        totalSetoranDisplay.textContent = formatRupiah(totalSetoran);
        totalPenarikanDisplay.textContent = formatRupiah(totalPenarikan);
        saldoAkhirDisplay.textContent = formatRupiah(saldoAkhir);
        
        // Update quick stats
        quickSetoranDisplay.textContent = formatRupiah(totalSetoran);
        quickPenarikanDisplay.textContent = formatRupiah(totalPenarikan);
        quickSaldoDisplay.textContent = formatRupiah(saldoAkhir);
        
        // Update color based on balance
        saldoAkhirDisplay.style.color = saldoAkhir < 0 ? 'var(--danger-color)' : 'var(--accent-color)';
        quickSaldoDisplay.style.color = saldoAkhir < 0 ? 'var(--danger-color)' : 'var(--accent-color)';

        return saldoAkhir;
    }

    // === Logika Perhitungan (2: SALDO INDIVIDU PER SISWA) ===
    function calculateIndividualSaldo(studentName, allTransactions) {
        const transactions = allTransactions.filter(t => t.studentName === studentName);
        let saldo = 0;

        transactions.forEach(t => {
            if (t.type === 'Setoran') {
                saldo += t.amount;
            } else if (t.type === 'Penarikan') {
                saldo -= t.amount;
            }
        });
        return saldo;
    }

    function getStudentClass(studentName) {
        if (studentName.startsWith('======')) return null;

        const index = daftarNamaSiswa.indexOf(studentName);
        if (index === -1) return 'Unknown';
        
        // Find the nearest class header above this student
        for (let i = index; i >= 0; i--) {
            if (daftarNamaSiswa[i].includes('KELAS VII')) return 'VII';
            if (daftarNamaSiswa[i].includes('KELAS VIII')) return 'VIII';
            if (daftarNamaSiswa[i].includes('KELAS IX')) return 'IX';
        }
        
        return 'Unknown';
    }

    function displayIndividualSaldo() {
        const transactions = getData();
        const studentSaldo = {};
        
        // Filter out class headers
        const realStudents = daftarNamaSiswa.filter(name => !name.startsWith('======'));
        
        // Calculate saldo for each student
        realStudents.forEach(student => {
            studentSaldo[student] = calculateIndividualSaldo(student, transactions);
        });
        
        // Update total siswa count
        totalSiswaDisplay.textContent = realStudents.length;
        
        // Filter students based on search
        let filteredStudents = realStudents;
        if (currentStudentFilter) {
            filteredStudents = realStudents.filter(student => 
                student.toLowerCase().includes(currentStudentFilter.toLowerCase())
            );
        }
        
        // Sort students
        if (sortOrder === 'asc') {
            filteredStudents.sort((a, b) => a.localeCompare(b));
        } else {
            filteredStudents.sort((a, b) => b.localeCompare(a));
        }
        
        // Display in table
        saldoPerSiswaBody.innerHTML = '';
        
        filteredStudents.forEach(student => {
            const saldo = studentSaldo[student];
            const kelas = getStudentClass(student);
            
            // Apply class filter
            if (currentKelasFilter && kelas !== currentKelasFilter) return;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student}</td>
                <td>${kelas}</td>
                <td class="${saldo < 0 ? 'negative-saldo' : 'positive-saldo'}">${formatRupiah(saldo)}</td>
                <td>
                    <button class="detail-btn" data-student="${student}">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                </td>
            `;
            saldoPerSiswaBody.appendChild(row);
        });
        
        // Add event listeners to detail buttons
        document.querySelectorAll('.detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Gunakan closest agar klik pada ikon juga berfungsi
                const studentName = e.target.closest('.detail-btn').dataset.student;
                showStudentDetails(studentName);
            });
        });
    }

    // === Fungsi untuk menampilkan detail siswa ===
    function showStudentDetails(studentName) {
        const transactions = getData().filter(t => t.studentName === studentName);
        const saldo = calculateIndividualSaldo(studentName, transactions);
        const kelas = getStudentClass(studentName);
        
        // Sort transactions by date (newest first)
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let detailsHTML = `
            <div class="student-header">
                <h4>${studentName}</h4>
                <p>Kelas: ${kelas}</p>
                <p class="saldo-display ${saldo < 0 ? 'negative-saldo' : 'positive-saldo'}">
                    Saldo Saat Ini: <strong>${formatRupiah(saldo)}</strong>
                </p>
            </div>
        `;
        
        if (transactions.length === 0) {
            detailsHTML += '<p class="no-transactions">Belum ada transaksi untuk siswa ini.</p>';
        } else {
            detailsHTML += `
                <div class="transaction-history">
                    <h5>Riwayat Transaksi</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Jenis</th>
                                <th>Jumlah</th>
                                <th>ID Transaksi</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            transactions.forEach(transaction => {
                // Tampilkan ID transaksi di detail
                detailsHTML += `
                    <tr>
                        <td>${new Date(transaction.date).toLocaleDateString('id-ID')}</td>
                        <td><span class="${transaction.type === 'Setoran' ? 'deposit' : 'withdrawal'}">${transaction.type}</span></td>
                        <td>${formatRupiah(transaction.amount)}</td>
                        <td style="font-size: 0.7em; color: #aaa;">${transaction.id}</td>
                    </tr>
                `;
            });
            
            detailsHTML += `
                        </tbody>
                    </table>
                </div>
            `;
        }
        
        studentDetails.innerHTML = detailsHTML;
        studentModal.style.display = 'block';
    }

    // === Fungsi untuk menampilkan riwayat transaksi (DISIMPAN SEMPURNA) ===
    function displayTransactionHistory() {
        let transactions = getData();
        
        // Apply filters
        if (currentJenisFilter) {
            transactions = transactions.filter(t => t.type === currentJenisFilter);
        }
        
        if (currentKelasFilter) {
            transactions = transactions.filter(t => getStudentClass(t.studentName) === currentKelasFilter);
        }
        
        // Sort by date (newest first)
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        historyBody.innerHTML = '';
        
        if (transactions.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center; padding: 20px;">Tidak ada data transaksi</td>`;
            historyBody.appendChild(row);
            return;
        }
        
        transactions.forEach((transaction) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(transaction.date).toLocaleDateString('id-ID')}</td>
                <td>${transaction.studentName}</td>
                <td>${getStudentClass(transaction.studentName)}</td>
                <td><span class="${transaction.type === 'Setoran' ? 'deposit' : 'withdrawal'}">${transaction.type}</span></td>
                <td>${formatRupiah(transaction.amount)}</td>
                <td>
                    <button class="delete-btn" data-id="${transaction.id}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </td>
            `;
            historyBody.appendChild(row);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Ambil ID Transaksi (lebih aman)
                const transactionId = parseInt(e.target.closest('.delete-btn').dataset.id);
                deleteTransaction(transactionId);
            });
        });
    }

    // === Fungsi untuk menghapus transaksi (DISIMPAN SEMPURNA) ===
    function deleteTransaction(transactionId) {
        if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.')) return;
        
        const transactions = getData();
        
        // Cari indeks transaksi berdasarkan ID
        const indexToDelete = transactions.findIndex(t => t.id === transactionId); 
        
        if (indexToDelete > -1) {
            transactions.splice(indexToDelete, 1);
            saveData(transactions);
            
            // Refresh displays
            calculateRekapTotal();
            displayIndividualSaldo();
            displayTransactionHistory();
            
            showToast('Transaksi berhasil dihapus!');
        } else {
            showToast('Error: Transaksi tidak ditemukan.', 'error');
        }
    }

    // === Event Handler untuk Form (DISIMPAN SEMPURNA) ===
    formTransaksi.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const studentName = inputNamaSiswa.value;
        const type = inputJenis.value;
        const inputAmount = inputJumlah.value; // Ambil sebagai string dulu
        
        // Validasi Nama Siswa
        if (!studentName || studentName.startsWith('======')) {
            showToast('Pilih nama siswa yang valid!', 'error');
            return;
        }
        
        // Validasi Jenis Transaksi
        if (!type) {
            showToast('Pilih jenis transaksi!', 'error');
            return;
        }
        
        // Validasi Jumlah (Pengecekan isNaN dan minimal)
        const amount = parseInt(inputAmount); 
        if (isNaN(amount) || !amount || amount < 1000) { 
            showToast('Jumlah minimal Rp 1.000 dan harus berupa angka!', 'error');
            return;
        }
        
        // Create transaction object dengan ID unik
        const transaction = {
            id: Date.now(), // ID unik berdasarkan timestamp saat ini
            studentName,
            type,
            amount,
            date: new Date().toISOString()
        };
        
        // Save to localStorage
        const transactions = getData();
        transactions.push(transaction);
        saveData(transactions);
        
        // Reset form
        formTransaksi.reset();
        
        // Update displays
        calculateRekapTotal();
        displayIndividualSaldo();
        displayTransactionHistory();
        
        showToast('Transaksi berhasil dicatat!');
    });

    // === Event Handlers untuk UI Controls ===
    toggleFormBtn.addEventListener('click', () => {
        const form = document.getElementById('form-transaksi-sederhana');
        const icon = toggleFormBtn.querySelector('i');
        
        if (form.classList.contains('collapsed')) {
            form.classList.remove('collapsed');
            // Gunakan scrollHeight untuk mendapatkan tinggi konten penuh
            form.style.maxHeight = form.scrollHeight + 'px'; 
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            form.classList.add('collapsed');
            form.style.maxHeight = '0';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
    
    searchSiswaInput.addEventListener('input', (e) => {
        currentStudentFilter = e.target.value;
        displayIndividualSaldo();
    });
    
    sortSiswaBtn.addEventListener('click', () => {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const icon = sortSiswaBtn.querySelector('i');
        // Update ikon sesuai urutan
        icon.classList.toggle('fa-sort-alpha-down', sortOrder === 'asc');
        icon.classList.toggle('fa-sort-alpha-up', sortOrder === 'desc');
        // Ganti icon jika awalnya pakai sort-amount, agar lebih relevan dengan nama
        if (icon.classList.contains('fa-sort-amount-down') || icon.classList.contains('fa-sort-amount-up')) {
            icon.classList.remove('fa-sort-amount-down', 'fa-sort-amount-up');
            icon.classList.add(sortOrder === 'asc' ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up');
        }
        
        displayIndividualSaldo();
    });
    
    filterJenisSelect.addEventListener('change', (e) => {
        currentJenisFilter = e.target.value;
        displayTransactionHistory();
    });
    
    filterKelasSelect.addEventListener('change', (e) => {
        currentKelasFilter = e.target.value;
        displayIndividualSaldo();
        displayTransactionHistory();
    });
    
    // Export data functionality
    exportBtn.addEventListener('click', () => {
        const transactions = getData();
        if (transactions.length === 0) {
            showToast('Tidak ada data untuk diekspor!', 'warning');
            return;
        }
        
        // Create CSV content
        let csvContent = "Tanggal,Nama Siswa,Kelas,Jenis,Jumlah (Rp),ID Transaksi\n";
        
        transactions.forEach(t => {
            const date = new Date(t.date).toLocaleDateString('id-ID');
            const kelas = getStudentClass(t.studentName);
            // Jumlah dipertahankan sebagai string tanpa format rupiah untuk CSV
            const amount = t.amount; 
            
            csvContent += `"${date}","${t.studentName}","${kelas}","${t.type}","${amount}","${t.id}"\n`;
        });
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `tabungan_siswa_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Data berhasil diekspor!');
    });
    
    // Reset data functionality
    resetBtn.addEventListener('click', () => {
        if (!confirm('APAKAH ANDA YAKIN? Menghapus SEMUA data akan menghilangkan seluruh riwayat transaksi. Tindakan ini TIDAK DAPAT dibatalkan!')) {
            return;
        }
        
        localStorage.removeItem('transactionHistory');
        
        // Reset displays
        calculateRekapTotal();
        displayIndividualSaldo();
        displayTransactionHistory();
        
        showToast('Semua data berhasil direset!', 'warning');
    });
    
    // Modal close functionality
    closeModalBtn.addEventListener('click', () => {
        studentModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === studentModal) {
            studentModal.style.display = 'none';
        }
    });

    // === Inisialisasi Aplikasi ===
    function initApp() {
        populateStudentDropdown();
        calculateRekapTotal();
        displayIndividualSaldo();
        displayTransactionHistory();
        
        // Auto-expand form on page load (pastikan form terload dengan benar)
        const form = document.getElementById('form-transaksi-sederhana');
        // Berikan waktu sejenak agar browser menghitung scrollHeight dengan benar
        setTimeout(() => {
            if (form.classList.contains('collapsed')) {
                form.style.maxHeight = form.scrollHeight + 'px';
                form.classList.remove('collapsed');
                toggleFormBtn.querySelector('i').classList.remove('fa-chevron-down');
                toggleFormBtn.querySelector('i').classList.add('fa-chevron-up');
            }
        }, 100);
    }

    // Start the application
    initApp();
});