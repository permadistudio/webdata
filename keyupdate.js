window.onload = function() {
    var correctPassword = "katakunci";
    var loginTimeKey = 'loginTime';

    // Cek apakah waktu login tersimpan dalam localStorage
    var lastLoginTime = localStorage.getItem(loginTimeKey);

    if (lastLoginTime && (Date.now() - lastLoginTime < 12 * 60 * 60 * 1000)) {
        // Jika waktu terakhir login masih dalam batas 12 jam, tidak minta password lagi
        alert('Anda sudah login dalam 12 jam terakhir.');
    } else {
        // Tampilkan SweetAlert untuk meminta password
        Swal.fire({
            title: 'Masukkan Password:',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Masuk',
            cancelButtonText: 'Batal',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                if (password === correctPassword) {
                    // Simpan waktu login ke localStorage
                    localStorage.setItem(loginTimeKey, Date.now());
                    return true;
                } else {
                    Swal.showValidationMessage('Password salah. Coba lagi!');
                    return false;
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Password Benar!',
                    'Selamat datang!',
                    'success'
                );
            } else {
                // Jika tombol Batal ditekan tanpa memasukkan password
                Swal.fire(
                    'Akses Ditolak',
                    'Anda harus memasukkan password untuk melanjutkan.',
                    'error'
                ).then(() => {
                    // Redirect ke link tertentu setelah menekan Batal
                    window.location.href = 'https://www.example.com'; // Ganti dengan link yang diinginkan
                });
            }
        });
    }
}
