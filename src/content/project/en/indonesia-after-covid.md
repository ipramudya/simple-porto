---
    title: Indonesia After Covid
    tags: ['Typescript', 'React.js', 'Next.js', 'Rest API', 'Geolocation']
    language: en
    category: Geolocation
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
    description: A COVID tracker app harnessing dynamic geolocation data to visually plot each case on an interactive map, enabling users to gain valuable insights.
---

## About The Project

I have developed a COVID tracker application that offers an interactive map, allowing users to visually track COVID-19 cases in each province. The app provides a comprehensive overview, enabling users to stay informed about the situation in their respective regions. Additionally, it goes beyond just tracking cases by incorporating information on vaccine doses administered. Users can explore data on the vaccination progress in each province and district, including hospitals, clinics, and other health services. This feature enhances the app's utility by providing a holistic view of the COVID-19 situation.

To ensure the accuracy of the information displayed, all data is obtained through [government APIs](https://documenter.getpostman.com/view/16605343/Tzm6nwoS). This guarantees that the app provides up-to-date statistics on cases and [vaccination rates](https://covid19.go.id/dokumentasi-api-faskes-vaksinasi). Users can trust the data they access, allowing them to make informed decisions and stay well-informed about the current COVID-19 situation.

In terms of user experience, I have built the pages on the server using Next.js. This approach offers several benefits, including improved performance and enhanced usability. Next.js optimizes the loading and rendering of the pages, resulting in a seamless and responsive user interface. The server-side rendering capabilities of Next.js enable faster initial page loads and improved search engine optimization.

## Server-Side Rendering

Implementing server-side rendering in a Next.js project involves writing code in the pages directory. This directory serves as the foundation for defining routes and rendering components on the server. When a new file is added to the pages directory, Next.js automatically maps it to a corresponding route in the browser. This convenient feature, known as file-system based routing, eliminates the need for manual configuration and simplifies the process of creating new pages and routes within the application.

Each file has the ability to export either `getServerSideProps` or `getStaticProps` functions. These functions are executed on the server and allow you to fetch data or perform server-side computations. The data obtained is then passed to the component as a parameter called `props`. By utilizing getServerSideProps or getStaticProps, Next.js simplifies the process of fetching and passing data to components.

For example, to retrieve vaccine data on the server, we can implement the following:

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

In the code snippet above, the `getStaticProps` function is used to retrieve vaccine data from an API using the `fetch` function. The retrieved data is then assigned to the props object, which allows us to access and utilize it within the component. The `revalidate` property is set to 120 seconds, ensuring that the data is refreshed periodically.

After that, the vaccine data now is accessible on the `/vaccine` page. Let's take a look at how it is displayed by clicking this image below:

<a href='/images/indonesia-after-covid/vaccine-page.png' target="_blank" rel="noopener noreferer">
    <img src='/images/indonesia-after-covid/vaccine-page.png' alt="indonesiaAfterCovid's vaccine page" >
</a>

## Data Visualization on The Map

To visualize the data obtained from the API on the map, we are utilizing [Mapbox](https://www.mapbox.com/). To begin, we need to install the `react-map-gl` package using a package manager of your choice. Next, we import the necessary components provided by react-map-gl into our project.

```tsx
//components/layout/vaccine/Main.tsx

import type { FunctionComponent } from "react";
import Map from 'react-map-gl'

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

Once the map is rendered, we can populate the vaccine data onto the viewport using the `useEffect` and `useState` hooks. The `useEffect` hook allows us to run side effects, such as setting the viewport to a specific state, after the component has been mounted. On the other hand, the `useState` hook is used to store the current data after it has been populated and triggers a re-rendering of the page when the process is completed.

To enhance the informativeness of the map, you can consider adding additional components such as `<Markers/>` or `<Legend/>` onto the `<Map/>` component. These components can provide valuable visual cues, markers, or a legend that help users interpret the data displayed on the map more effectively

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

That's how we can render vaccine data that got from API onto Map using Mapbox package.

## Technologies & Stack Used

- **Language**: [Typescript](https://www.typescriptlang.org/), strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Framework**: Build using [Next.js](https://nextjs.org/docs) framework, on top of [React.js](https://react.dev/) library
- **Styling**: [Mantine](https://mantine.dev/), fully featured components library for react. It uses CSS-in-JS syntax, because Mantine build on top of [Emotion styled component provider](https://emotion.sh/docs/styled)
- **Libraries**: We use [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) for rendering maps and [Recharts](https://recharts.org/en-US/) for rendering charts.

## Closing Thoughts

This project has been a valuable learning experience for me as it marked my first exploration into the Next.js framework. Additionally, I had the opportunity to build a React application using TypeScript, which enhanced the type safety and strong typing of the codebase. Through this project, I have gained a solid foundation in understanding the inner workings of React, TypeScript, and Next.js when developing highly interactive applications. It has been an exciting journey that has expanded my skills and knowledge in front-end development.