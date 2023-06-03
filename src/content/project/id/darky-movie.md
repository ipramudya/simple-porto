---
    title: Darky Movie
    language: id
    category: Hiburan
    image: {
        src: "/images/projects/darky-movie.png",
        alt: darky-movie-image
    }
    color: {
        dark: "#0369a1",
        light: "#0ea5e9"
    }
    isDraft: false
    externalLink: 'https://darkymovie.netlify.app/'
    description: Database film dinamis menampilkan banyak koleksi film, acara TV, dan memberikan pengalaman sinematik yang komprehensif.
---

## Latar Belakang

Sebagai penikmat film dan tv, saya memulai proyek personal untuk mengembangkan aplikasi yang menyederhanakan proses mengakses informasi tentang film dan serial TV. Untuk menyediakan database film dan acara TV terbaru, saya membuat koneksi antara aplikasi dan [The Movie Database (TMDB)](https://developer.themoviedb.org/docs) melalui rest API dalam protokol HTTP.

Memanfaatkan sumber daya TMDB yang luas, saya mengintegrasikan REST API mereka untuk mengambil informasi mendetail tentang film dan serial TV. Ini memungkinkan pengguna aplikasi untuk mengakses banyak data, termasuk sinopsis, informasi pemeran, peringkat, tanggal rilis, dan banyak lagi.

## React.js Framework, Mengapa ?

Untuk memastikan pengalaman pengguna yang kuat dan dinamis, saya memilih untuk membuat aplikasi menggunakan [React.js](https://react.dev/). *Library* JavaScript ini memungkinkan saya membuat antarmuka yang sangat interaktif dan responsif yang memenuhi kebutuhan para penggemar film.

React mengimplementasikan model *component-based* yang kuat yang memungkinkan antarmuka untuk dimodulasi dan digunakan kembali dengan mudah di berbagai komponen. Pendekatan ini memungkinkan antarmuka dipecah menjadi bagian yang lebih kecil dan berdiri sendiri, yang dikenal sebagai komponen. Setiap komponen mewakili blok antarmuka yang berbeda, diatur dan terstruktur dengan cermat.

## Menghubungkan Aplikasi React dengan TMDB API

Sebelum masuk ke detail menghubungkan aplikasi React dengan API, penting untuk menyoroti metode bawaan React yang memfasilitasi integrasi yang sangat *powerful*, yakni __hooks__.Berkat kekuatan hooks yang memungkinkan kita menulis kode yang lebih dapat digunakan kembali dan modular dan juga memungkinkan kita mengelola status dengan mudah, menangani efek samping, dan memanfaatkan metode siklus hidup React. Kami tidak akan berbicara banyak detail tentang hook. Di antara berbagai hook yang tersedia di React, fokus kita adalah pada dua yang mendasar: `useState` & ``useEffect``

Hook berupa``useState`` memungkinkan kita memperkenalkan manajemen *state* dalam *functional component*. Ini memberikan cara mudah untuk mendeklarasikan dan memperbarui variabel *state*, memastikan reaktivitas yang mulus dan mengaktifkan *rendering* UI dinamis berdasarkan perubahan *state*.

Di sisi lain, hook ``useEffect`` sangat penting untuk menangani efek samping atau *side effects* dalam *functional component*. Ini memungkinkan kita untuk melakukan berbagai tindakan sebagai respons terhadap peristiwa siklus hidup komponen, seperti mengeksekusi kode setelah komponen dirender atau membersihkan *resource* saat komponen dilepas. Dengan ``useEffect``, kita dapat dengan mulus mengintegrasikan panggilan API, memantau perubahan data tampilan, dan operasi asinkron lainnya ke dalam komponen kita.

Untuk menghubungkan aplikasi reaksi dengan TMDB API (misalnya, kita ingin mendapatkan film yang sedang tren dan merendernya di dalam komponen), kita biasanya melakukannya seperti ini:

```tsx
// TrendingMovie.tsx

import {useState, useEffect} from 'react'

const API_KEY = "YOUR-API-KEY"
const GET_TRENDING_MOVIES_FROM_TMBD = 
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

const TrendingMovieComponent = () => {
    const [trendingMovies, setTrendingMovies] = useState<null | unknown[]>(null)
    const [isError, setIsError] = useState<null | boolean>(null)

    useEffect(() => {
        fetch(GET_TRENDING_MOVIES_FROM_TMBD).then((res) => {
            if (res.status === 200) {
                return res.json()
            }

            throw new Error('Fail to get trending movies from tmdb api')
        })
        .then((data) => setTrendingMovies(data) /* array of movies */ )
        .catch((err) => setIsError(true))
    }, [])

    return (
        <div>
            {!isError ? (
                trendingMovies.map((movie) => (
                    <div key={movie.id}>
                        <h1>{movie.name}</h1>
                    </div>
                ))
            ) : (
                <p>Server error, something went wrong</p>
            )}
        </div>
    )
}
```

Pertama, deklarasi *state* berfungsi sebagai referensi penting untuk menampilkan data di halaman. Status `trendingMovies` menampung data yang diambil dari API. Di sisi lain, status `isError` digunakan untuk menangkap dan mengelola informasi kesalahan apa pun yang mungkin terjadi selama pengambilan data, memastikan penanganan kesalahan yang lancar dan memberikan wawasan berharga bila diperlukan.

Selanjutnya, hook `useEffect` digunakan untuk memulai panggilan API ke TMDB segera setelah komponen berhasil dipasang di browser. Dalam fungsi `useEffect`, kita mendefinisikan fungsi `fetch` disertai dengan URL yang telah ditentukan sebelumnya yang disimpan dalam variabel konstan. Setelah panggilan API berhasil, kita menggunakan fungsi `setTrendingMovies` untuk menyimpan data yang diambil di *state*. Demikian pula, kita menggunakan fungsi `setIsError` untuk menangani dan mengelola potensi kesalahan apa pun yang mungkin terjadi selama panggilan API. Setelah itu, kita dapat mengisi dan menampilkan data korespond pada browser dengan mengembalikannya pada template.

## Aksi dari Styled Components

Styled Components berperan penting dalam menampilkan data dengan cara yang menarik dalam proyek ini. Dengan menggunakan teknik [Styled Components](https://styled-components.com/), kita mengintegrasikan kode CSS langsung ke dalam komponen React menggunakan sintaks CSS-in-JS. Metode ini memungkinkan kita membuat desain yang menarik dan harmonis secara visual, sehingga meningkatkan keseluruhan presentasi proyek.

Contoh berikut membuat beberapa komponen sederhana, container dan button, dengan beberapa *styles* yang melekat padanya:

```tsx
    // page.tsx
    import {styled} from 'styled-components'

    const MyButton = styled.button`
        font-size: 16px;
        color: red;
    `

    const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const Page = () => {
        /* some logics */

        return (
            <Container>
                <Button>
                    click me
                </Button>
            </Container>
        )
    }
```

Styled-components menangani aturan reguler CSS dengan mengenkapsulasinya di dalam backticks di dalam JavaScript/TypeScript. Integrasi tanpa batas ini memungkinkan kita untuk mengimpor *styled components* ke dalam komponen halaman kita dan merendernya langsung di dalam markup. Dengan pendekatan ini, logika gaya dan komponen dikonsolidasikan dengan rapi, menyederhanakan proses pengembangan dan meningkatkan pemeliharaan proyek secara keseluruhan.

## Kesimpulan

Dengan menggabungkan keserbagunaan React.js (disertai dengan ekosistem *library*-nya) dengan data besar dari database TMDB, aplikasi kita menjadi sumber daya yang bermanfaat bagi para penggemar film. Pengguna dapat dengan mudah menjelajahi, menemukan, dan tetap mendapat informasi tentang film dan serial TV favorit mereka melalui antarmuka yang mulus dan intuitif. Ini adalah proyek hasrat saya yang membawa dunia perfilman lebih dekat ke ujung jari setiap pengguna.

## Akhir Kata

Proyek personal ini memiliki tempat khusus dalam perjalanan saya karena sangat membekas di pikiran saya dalam pembuatan aplikasi React kompleks pertama. Meskipun mungkin tidak memiliki fitur yang luar biasa, saya sangat puas dalam mengembangkan solusi yang berguna dan berdampak. Proses membangun proyek ini sangat menyenangkan, memungkinkan saya untuk menerapkan keterampilan React.js saya dan menjelajahi potensi *frameworks* yang sangat besar.