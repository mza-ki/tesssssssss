// untuk mempermudah proses element 
function $(_) { return document.getElementById(_) }

// ini deklarasi function menampilkan menu nav

function tampil_menu() {
  // yang mana nav nya?

  let a = document.getElementById("nav")

  //yang mana tombol menunya?
  let b = document.getElementById("tombol-menu")

  //tampilkan nav 
  a.style.display = "block"

  //hilangkan tombol-menu
  b.style.display = "none"
}

// {} curly brace () [] square brackets () parenthesis
// sediakan array penampung setiap image yang selesai loading
let loaded = []

// variable untuk menunjukkan slide nomor berapa yang ditampilkan
let slide_tampil = 0

//  sediakan variable untuk penanda setInterval supaya nanti setInterval bisa dihentikan dengan perintah clearInterval()
var jadwal

// menciptakan function yang dipanggil oleh body onload 
function slideShow() {

  // proses data dari daftar gambar yang namanya stock
  // yang berada di dalam index.html

  for (i = 0; i < stok.length; i++) {

    // ciptakan image baru (dari class javascript)
    let sld = new Image(720, 400)

    // pasangkan source gambarnya
    sld.src = "upload/" + stok[i][0]

    // berikan id nomor urut supaya nanti di susun ulang
    sld.id = i

    // pasang data gambarnya
    sld.data = {
      link: stok[i][1],
      judul: stok[i][2]
    }

    // supaya setiap kali selesai loading satu gambar 
    // kita bisa cek, pasang event onload yang akan
    // memanggil cek_loading, yang diperiksa
    // adalah si sld ini sendiri
    sld.onload = function () { cek_loading(this) }
  }
}
// fungsi yang dijalankan setiap selesai load image
function cek_loading(target) {
  // alert(target.src)
  // alert(target.id)

  // masukkan si target in ke loaded
  // gunakan id masing masing sebagai urutan didalam array array 
  loaded[target.id] = target

  // setiap kali mengisi loaded cek jumlahnya
  // kalau sama dengan stok, maka sudah selesai
  if (loaded.length == stok.length) {

    // sampai disini urutan array masih jadi acak
    // karena perbedaan waktu loading gambar
    // jadi perlu menyusun ulang urutan item
    // di dalam loaded

    // mulai menyusun gambar dan text 
    susun_slide()
  }
}

// tahapan menyusun gambar slide dan text di html
function susun_slide() {

  // mulai proses satu persatu isi loaded 
  for (i = 0; i < loaded.length; i++) {

    // tampung ke variable sld supaya mudah menulis sintaxnya
    sld = loaded[i]

    // buat tag/element IMG
    let img = document.createElement("iMG")

    img.src = sld.src

    // masukkan image ke slide-container
    $('slide-container').appendChild(img)

    // $('berita-slide').innerHTML = `${sld.data.judul} <a href='${sld.data.link}'>Selengkapnya
    // <i class="fas fa-angle-double-right"></i></a>`

    // selagi masih  dalam looping susun juga
    // tombol nomor slide

    let anchor = document.createElement('A')

    // ketika diklik akan memanggil goto_slide(0) 
    // goto_slide(1), dst
    anchor.href = `javascript:goto_slide(${i})`

    // pasang css untuk anchor
    // anchor.className = 'prev num next'
    // kalau kelas beda" setiap
    if (i == 0) anchor.className = 'prev'
    else if (i == loaded.length - 1) anchor.className = 'next'
    else anchor.className = 'num'

    // isi atau labelnya adalah nomor dimulai dari angka 1
    anchor.innerHTML = i + 1

    // masukkan ke div panel 
    $('panel').appendChild(anchor)
  }

  // saat ini sudah tampil slide 0, jadi supaya 
  // setInterval tidak mengawali dari 0, maka
  // panggil jalan() satu kali
  jalan()

  // sudah selesai menyusun gambar ke slide-container
  jadwal = setInterval(jalan, 5000)

  // pasang onclick ke tombol next
  $('slide-right').onclick = function () {
    jalan()
  }

  // pasang onclick ke tombol prev
  $('slide-left').onclick = function () {

    // periksa dulu nilai slide_tampil
    // menampilkan gambar tepat satu gambar
    // sebelumnya

    switch (slide_tampil) {
      case 0:
        slide_tampil = loaded.length - 2
        break
      case 1:
        slide_tampil = loaded.length - 1
        break
      default:
        slide_tampil -= 2
        break
    }
    // sesudah ditentukan slide_tampilnya yang mana
    // maka proses selanjutnya
    reset_jalan()
  }
}

function reset_jalan() {
  // reset setInterval nya
  clearInterval(jadwal)

  jalan()
  // ulangi lagi interval jalan

  jadwal = setInterval(jalan, 5000)
}

// funsgsi yang mengganti class name dari slide container
function jalan() {

  // pasangkan class 'posisi0', 'posisi1', dst
  $('slide-container').className = 'posisi' + slide_tampil

  // tampilkan judul berita sesuai slide yang tampil
  tampil_berita(slide_tampil)

  // naikkan nilai slide_tampil untuk berikutnya 
  slide_tampil++

  // kalau nilai slide_tammpil sampai ke jumlah slide kembalikan ke 0
  if (slide_tampil == loaded.length) slide_tampil = 0
}

// fungsi menampilkan slide yang nomornya terpilih
function tampil_berita(nomorSlide) {
  // yang mana itemnya?
  sld = loaded[nomorSlide]

  // tampilkan beritanya
  $('berita-slide').innerHTML = `${nomorSlide + 1}.${sld.data.judul} <a href='${sld.data.link}'>Selengkapnya
    <i class="fas fa-angle-double-right"></i></a>`
}

// fucntion yang dipanggil masing masing tombol
// nonor-slide

function goto_slide(nomor) {

  // masukkan nomor itu ke slide_tampil
  slide_tampil = nomor

  // langsung jalankan
  // jalan()

  reset_jalan()
}