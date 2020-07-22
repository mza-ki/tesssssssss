
//untuk mempermudah memproses elemen
function $(_){ return document.getElementById(_) }


// deklarasi function menampilkan menu nav
function tampil_menu(){

    // yang mana nav nya?
    let a = document.getElementById('nav')

    // yang mana tombol menu nya?
    let b = document.getElementById('tombol-menu')

    // tampilkan nav
    a.style.display = 'block'

    // hilangkan tombol menu
    b.style.display = 'none'
}

//sediakan array penampung setiap image yang sudah
// selesai loading
let loaded = []

//variabel untuk menunjukkan slide nomor berapa
// yang ditampilkan
let slide_tampil = 0

//sediakan variabel untuk penanda setInterval supaya
// nanti setInterval bisa dihentikan dengan
// perintah clearInterval()
var jadwal

//function yang dipanggil oleh body onload
function slideshow() {

    // proses data dari daftar gambar yang namanya stok
    // yang berada di dalam index.html
    for ( i=0; i<stok.length; i++){

        // ciptakan Image baru (dari class javascript)
        let sld = new Image(720, 400)

        //pasang source gambarnya
        sld.src = "upload/" + stok[i][0]

        //berikan id nomor urut supaya nanti bisa 
        //disusun ulang urutannya
        sld.id = i

        //pasang data gambarnya
        sld.data = { link:stok[i][1],
                     judul:stok[i][2] }
        
        // supaya setiap kali selesai loading satu gambar
        // kita bisa cek, pasang event onload yang akan
        // memanggil function cek_loading, yang diperiksa
        // adalah si sld ini sendiri
        sld.onload = function() { cek_loading(this) }
    }

}

//fungsi yang dijalankan setiap selesai load image
function cek_loading(target) {
    
    //alert(target.id)

    // masukkan si target ini ke loaded
    // gunakan id masing-masing sebagai urutan
    // di dalam array
    loaded[target.id] = target

    //setiap kali mengisi loaded, cek jumlahnya
    // kalau sama dengan stok, maka sudah penuh
    if (loaded.length == stok.length) {

        // sampai di sini, urutan array jadi acak
        // karena perbedaan waktu loading gambar
        // jadi perlu menyusun ulang urutan item
        // di dalam loaded
        

        // mulai menyusun gambar dan text
        susun_slide()
    }
}


//tahapan menyusun gambar slide dan text di html
function susun_slide() {

    // proses satu persatu isi loaded
    for (i=0; i<loaded.length; i++) {

        // tampung ke variabel supaya mudah 
        // menulis syntaxnya
        sld = loaded[i]

        // buat tag/element IMG
        let img = document.createElement('IMG')

        img.src = sld.src

        //masukkan image ke slide-container
        $('slide-container').appendChild(img)


        // selagi masih dalam looping susun juga
        // tombol nomor slide
        let anchor = document.createElement('A')

        // ketika diklik akan memanggil goto_slide(0)
        // goto_slide(1), dst
        anchor.href = `javascript:goto_slide(${i})`

        //pasang css untuk anchor
        // kalau class beda-beda
        if (i == 0) anchor.className = 'prev'
        else if (i == loaded.length-1) anchor.className = 'next'
        else anchor.className = 'num'

        //isi atau labelnya adalah nomor slide
        //dimulai dari angka 1
        anchor.innerHTML = i+1

        //masukkan ke div panel
        $('panel').appendChild(anchor)

    }

    //saat ini sudah tampil slide0, jadi supaya
    //setInterval tidak mengawali dari nol, maka
    // panggil jalan() satu kali
    jalan()

    //sesudah menyusun gambar ke slide-container
	// maka mulai intervalnya
    jadwal = setInterval( jalan, 5000)

    // pasang onclick ke tombol next 
    $('slide-right').onclick = function() {
        reset_jalan()
    }

    // pasang onclick ke tombol previous
    $('slide-left').onclick = function() {

        //periksa dulu nilai slide_tampil supaya
        //menampilkan gambar tepat satu gambar
        // sebelumnya
        switch (slide_tampil) {

            case 0 :
                slide_tampil = loaded.length - 2
                break

            case 1 :
                slide_tampil = loaded.length - 1
                break

            default :
                slide_tampil -= 2
                break
        }
        //sesudah ditentukan slide_tampilnya yang
        //mana, maka proses slidenya
        reset_jalan()
    }
}


function reset_jalan() {
	//reset setIntervalnya
	clearInterval(jadwal)
	// panggil jalan supaya diproses slidenya
	jalan()
	//ulangi lagi interval jalan
	jadwal = setInterval(jalan,5000)
}


//fungsi yang mengganti-ganti className dari 
// slide-container
function jalan() {
    
    // pasangkan class 'posisi0', 'posisi1', dst
    $('slide-container').className = 'posisi' +
                                      slide_tampil
    
    
    // tampilkan judul berita sesuai slide yg tampil
    tampil_berita(slide_tampil)

    //naikkan nilai slide_tampil untuk yang berikutnya
    slide_tampil ++

    // kalau nilai slide_tampil sampai ke jumlah slide
    // kembalikan nilainya ke nol
    if (slide_tampil == loaded.length) slide_tampil = 0
}


//fungsi menampilkan slide yang nomornya terpilih
function tampil_berita( nomorslide ) {
	
    // yang mana itemnya?
    sld = loaded[nomorslide]

    //tampilkan beritanya
    $('berita-slide').innerHTML =
    `${nomorslide+1}. ${sld.data.judul} <a href='${sld.data.link}' 
     class='link1'> Selengkapnya &raquo; </a>`
}


//function yang dipanggil masing-masing tombol
// nomor slide
function goto_slide(nomor) {

    // masukkan nomor itu ke slide_tampil
    slide_tampil = nomor

    // langsung jalankan
    // jalan()
    reset_jalan()
}
