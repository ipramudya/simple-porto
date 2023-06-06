---
    title: Indonesia After Covid
    language: id
    category: Geolokasi
    tags: ['Typescript', 'React.js', 'Next.js', 'Rest API', 'Geolocation']
    image: {
        src: "/images/projects/indonesia-after-covid.png",
        alt: indonesia-after-covid-image
    }
    color: {
        dark: "#a3a3a3",
        light: "#737373"
    }
    isDraft: false
    externalLink: 'https://indonesiaaftercovid.vercel.app/'
    description: Aplikasi pelacak COVID yang memanfaatkan data geolokasi dinamis untuk memplot setiap kasus secara visual pada peta interaktif, memungkinkan pengguna memperoleh wawasan berharga.
---

## Tentang Proyek

Saya telah mengembangkan aplikasi pelacak COVID yang menawarkan peta interaktif, yang memungkinkan pengguna melacak kasus COVID-19 di setiap provinsi secara visual. Aplikasi ini memberikan ikhtisar yang komprehensif, memungkinkan pengguna untuk tetap mendapat informasi tentang situasi di wilayah masing-masing. Selain itu, ini lebih dari sekadar melacak kasus dengan memasukkan informasi tentang dosis vaksin yang diberikan. Pengguna dapat menggali data perkembangan vaksinasi di setiap provinsi dan kabupaten, termasuk rumah sakit, klinik, dan layanan kesehatan lainnya. Fitur ini meningkatkan utilitas aplikasi dengan memberikan gambaran menyeluruh tentang situasi COVID-19.

Untuk memastikan keakuratan informasi yang ditampilkan, semua data diperoleh melalui [API pemerintah](https://documenter.getpostman.com/view/16605343/Tzm6nwoS). Ini menjamin bahwa aplikasi menyediakan statistik terkini tentang kasus dan tingkat [vaksinasi](<(https://covid19.go.id/dokumentasi-api-faskes-vaksinasi)>). Pengguna dapat memercayai data yang mereka akses, memungkinkan mereka membuat keputusan yang tepat dan tetap mendapatkan informasi terkini tentang situasi COVID-19 saat ini.

Dalam hal pengalaman pengguna, saya telah membuat halaman page server menggunakan Next.js. Pendekatan ini menawarkan beberapa keuntungan, termasuk peningkatan kinerja dan peningkatan kegunaan. Next.js mengoptimalkan pemuatan dan _rendering_ halaman, menghasilkan antarmuka pengguna yang mulus dan responsif. Kemampuan rendering sisi server dari Next.js memungkinkan pemuatan halaman awal yang lebih cepat dan pengoptimalan _SEO_ yang lebih baik.

## Server-Side Rendering

Menerapkan _server-side rendering_ dalam proyek Next.js melibatkan penulisan kode di *pages direktori. Direktori ini berfungsi sebagai dasar untuk menentukan *routes* dan merender komponen di server. Saat file baru ditambahkan ke direktori halaman, Next.js secara otomatis memetakannya ke *routes* yang sesuai di browser. Fitur praktis ini, yang dikenal sebagai *file-system based routing*, menghilangkan kebutuhan akan konfigurasi manual dan menyederhanakan proses pembuatan halaman dan *routes\* baru dalam aplikasi.

Setiap file memiliki kemampuan untuk mengekspor fungsi `getServerSideProps` atau `getStaticProps`. Fungsi-fungsi ini dijalankan di server dan memungkinkan Anda mengambil data atau melakukan komputasi sisi server. Data yang diperoleh kemudian diteruskan ke komponen sebagai parameter yang disebut `props`. Dengan memanfaatkan getServerSideProps atau getStaticProps, Next.js menyederhanakan proses pengambilan dan pengiriman data ke komponen.

Sebagai contoh, untuk mengambil data vaksin di server, kita dapat menerapkan hal berikut:

```tsx
// pages/vaccine.tsx

import { Layout, MainVaccine, SidebarVaccine } from "components/layout"
import type { GetStaticProps } from "next"
import type { FunctionComponent } from "react"
import { Vacinne } from "types/vaccine.types"

interface VaccineProps {
    vaccine: Vacinne
}

const Vaccine: FunctionComponent<VaccineProps> = ({ vaccine }) => {
    return (
        <Layout Sidebar={<SidebarVaccine vaccine={vaccine} />}>
            <MainVaccine />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const vaccineRes = await fetch(
        "https://data.covid19.go.id/public/api/pemeriksaan-vaksinasi.json"
    )

    if (!vaccineRes.ok) {
        return {
            notFound: true,
        }
    }

    const vaccineData = await vaccineRes.json()
    const { harian, ...others } = vaccineData.vaksinasi

    return {
        props: {
            vaccine: {
                ...others,
                harian,
            },
        },
        revalidate: 120,
    }
}

export default Vaccine
```

Pada cuplikan kode di atas, fungsi `getStaticProps` digunakan untuk mengambil data vaksin dari API menggunakan fungsi `fetch`. Data yang diambil kemudian ditugaskan ke objek `props`, yang memungkinkan kita untuk mengakses dan menggunakannya di dalam komponen. Properti `revalidate` disetel ke 120 detik, memastikan bahwa data disegarkan secara berkala.

Setelah itu, data vaksin kini dapat diakses di laman `/vaccine`. Mari kita lihat tampilannya dengan mengklik gambar di bawah ini:

<a href='/images/indonesia-after-covid/vaccine-page.png' target="_blank" rel="noopener noreferer">
    <img src='/images/indonesia-after-covid/vaccine-page.png' alt="indonesiaAfterCovid's vaccine page" >
</a>

## Visualisasi Data pada Map

Untuk memvisualisasikan data yang diperoleh dari API pada peta, kami menggunakan [Mapbox](https://www.mapbox.com/). Untuk memulai, kita perlu menginstal `react-map-gl` menggunakan _package manager_ pilihan Anda. Selanjutnya, kami mengimpor komponen yang diperlukan yang disediakan oleh `react-map-gl` ke dalam proyek kami.

```tsx
//components/layout/vaccine/Main.tsx

import type { FunctionComponent } from "react"
import Map from "react-map-gl"

const Main: FunctionComponent = (vaccine: any) => {
    /* ... */
    return (
        <Map
            mapStyle="mapbox://styles/ipramudya0/cl0k1g3f6000315p4q5f1grm2/draft"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={{ position: "relative" }}
        >
            {/* ... */}
        </Map>
    )
}
```

In order to successfully use the `<Map/>` component, we need to pass certain information such as the accessToken and style. You can obtain the accessToken by following the instructions provided in the [Mapbox Docs](https://www.mapbox.com/). Optionally, It is recommended to store sensitive data — including the accessToken, as `environment variables` for added security.

```tsx
//components/layout/vaccine/Main.tsx

import { useEffect useState } from "react";
import type { FunctionComponent, Ref } from "react";
import Map, { MapRef } from 'react-map-gl'

const Main: FunctionComponent = (vaccine: any) => {
    const [viewport, setViewport] = useState(defaultCoordinate);
    const mapRef: Ref<MapRef> = useRef(null);

    useEffect(() => {
        if (!vaccine.isEmpty) {
            mapRef.current?.resize();
            return setViewport({
                zoom: 16.5,
                latitude: Number(vaccine.data?.latitude),
                longitude: Number(vaccine.data?.longitude),
            });
        } else if (data) {
            mapRef.current?.resize();
            return setViewport({
                zoom: 10,
                latitude: Number(data?.data[0].latitude),
                longitude: Number(data?.data[0].longitude),
            });
        } else {
            mapRef.current?.resize();
            return setViewport(defaultCoordinate);
        }
    }, [data, vaccine]);

    return (
        <Map
            {...viewport}
            ref={mapRef}
            mapStyle="mapbox://styles/ipramudya0/cl0k1g3f6000315p4q5f1grm2/draft"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={{ position: "relative" }}
        >
        {/* ... */}
        </Map>
    )
}
```

Setelah peta dirender, kita dapat mengisi data vaksin ke viewport menggunakan hook `useEffect` dan `useState`. Kait `useEffect` memungkinkan kita menjalankan efek samping, seperti menyetel area pandang ke status tertentu, setelah komponen dipasang. Di sisi lain, hook `useState` digunakan untuk menyimpan data saat ini setelah diisi dan memicu rendering ulang halaman saat proses selesai.

Untuk meningkatkan keinformatifan peta, Anda dapat mempertimbangkan untuk menambahkan komponen tambahan seperti `<Markers/>` atau `<Legend/>` ke dalam komponen `<Map/>`. Komponen ini dapat memberikan isyarat visual, penanda, atau legenda yang berharga yang membantu pengguna menginterpretasikan data yang ditampilkan di peta secara lebih efektif

```tsx
//components/layout/vaccine/Main.tsx

import { useEffect useState } from "react";
import type { FunctionComponent, Ref } from "react";
import Map, { MapRef } from 'react-map-gl'

const Main: FunctionComponent = (vaccine: any) => {
    const [viewport, setViewport] = useState(defaultCoordinate);
    const mapRef: Ref<MapRef> = useRef(null);

    useEffect(() => {
        if (!vaccine.isEmpty) {
            mapRef.current?.resize();
            return setViewport({
                zoom: 16.5,
                latitude: Number(vaccine.data?.latitude),
                longitude: Number(vaccine.data?.longitude),
            });
        } else if (data) {
            mapRef.current?.resize();
            return setViewport({
                zoom: 10,
                latitude: Number(data?.data[0].latitude),
                longitude: Number(data?.data[0].longitude),
            });
        } else {
            mapRef.current?.resize();
            return setViewport(defaultCoordinate);
        }
    }, [data, vaccine]);

    return (
        <Map
            {...viewport}
            ref={mapRef}
            mapStyle="mapbox://styles/ipramudya0/cl0k1g3f6000315p4q5f1grm2/draft"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={{ position: "relative" }}
        >
            <MarkersVaccine data={vaccine?.data}/>
            <LegendMap />
        </Map>
    )
}
```

Begitulah cara merender data vaksin yang didapat dari API ke dalam Map menggunakan paket Mapbox.

## Teknologi & Susunan Aplikasi yang Digunakan

-   **Language**: [Typescript](https://www.typescriptlang.org/), bahasa pemrograman yang bersifat _strongly typed_ dibangun di atas JavaScript, memberi Kita alat yang lebih baik dalam skala apa pun.
-   **Framework**: Dibangun dengan _framework_ [Next.js](https://nextjs.org/docs), berjalan di atas _library_ [React.js](https://react.dev/).
-   **Styling**: [Mantine](https://mantine.dev/), pustaka komponen berfitur lengkap untuk `react`. Hal ini menggunakan sintaks CSS-in-JS, karena Mantine dibangun di atas [Emotion styled component provider](https://emotion.sh/docs/styled)
-   **Libraries**: Menggunakan [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) untuk menampilkan data pada map and [Recharts](https://recharts.org/en-US/) for _rendering_ chart.

## Akhir Kata

Proyek ini telah menjadi pengalaman belajar yang berharga bagi saya karena menandai eksplorasi pertama saya ke dalam kerangka kerja Next.js. Selain itu, saya memiliki kesempatan untuk membuat aplikasi React menggunakan TypeScript, yang meningkatkan keamanan jenis dan pengetikan basis kode yang kuat. Melalui proyek ini, saya mendapatkan dasar yang kuat dalam memahami cara kerja bagian dalam React, TypeScript, dan Next.js saat mengembangkan aplikasi yang sangat interaktif. Ini merupakan perjalanan yang mengasyikkan yang telah memperluas keterampilan dan pengetahuan saya dalam pengembangan front-end.
