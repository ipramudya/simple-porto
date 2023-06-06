---
    title: Darky Movie
    language: en
    tags: ['React.js', 'Styled Components', 'Rest API', 'Responsive Design']
    category: Entertainment
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
    description: A dynamic movie database showcasing a vast collection of movies, TV shows, and providing a comprehensive cinematic experiences.
---

## Background

As a movies and tv enjoyer, I embarked on a personal project to develop an application that simplifies the process of accessing information about movies and TV series. To provide an up-to-date database of films and TV shows, I established a connection between the application and [The Movie Database (TMDB)](https://developer.themoviedb.org/docs) via rest API within HTTP protocol.

Leveraging the TMDB's extensive resources, I integrated their REST API to retrieve detailed information about movies and TV series. This enables users of the application to access a wealth of data, including synopses, cast information, ratings, release dates, and much more.

## Why React ?

To ensure a robust and dynamic user experience, I chose to build the application using [React.js](https://react.dev/). This powerful JavaScript library allowed me to create a highly interactive and responsive interface that caters to the needs of movie enthusiasts. Leveraging the power and flexibility of React.js, I meticulously crafted this application to provide users with a seamless and immersive experience.

React implements a powerful component-based model that allows interfaces to be modularized and easily reused across various components. This approach enables the interface to be broken down into smaller, self-contained parts, known as components. Each component represents a distinct interface block, thoughtfully arranged and structured.

## Connect React App with TMDB API

Before dive into the details of connecting a React app with an API, it's important to highlight React's built-in methods that facilitate such integration. Thanks to the power of hooks by enabling us to write more reusable and modular code and also allow us to easily manage state, handle side effects, and tap into React's lifecycle methods. We're not gonna talk much detail on hooks. Among the various hooks available in React, our focus will be on two fundamental ones: `useState` & `useEffect`

The `useState` hook allows us to introduce state management within functional components. It provides a straightforward way to declare and update state variables, ensuring seamless reactivity and enabling dynamic UI rendering based on state changes.

On the other hand, the `useEffect` hook is essential for handling side effects within functional components. It enables us to perform various actions in response to component lifecycle events, such as executing code after the component has rendered or cleaning up resources when the component unmounts. With `useEffect`, we can seamlessly integrate API calls, event listeners, and other asynchronous operations into our components.

To connect react app with TMDB API (for example, we want to get trending movies and render them inside a component), we usually do like this:

```tsx
// TrendingMovie.tsx

import { useState, useEffect } from "react"

const API_KEY = "YOUR-API-KEY"
const GET_TRENDING_MOVIES_FROM_TMBD = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

const TrendingMovieComponent = () => {
    const [trendingMovies, setTrendingMovies] = useState<null | unknown[]>(null)
    const [isError, setIsError] = useState<null | boolean>(null)

    useEffect(() => {
        fetch(GET_TRENDING_MOVIES_FROM_TMBD)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                }

                throw new Error("Fail to get trending movies from tmdb api")
            })
            .then((data) => setTrendingMovies(data) /* array of movies */)
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

Firstly, the state declaration serves as a crucial reference for displaying data on the page. The `trendingMovies` state holds the retrieved data from the API. On the other hand, the `isError` state is utilized to capture and manage any error information that may occur during data retrieval, ensuring smooth error handling and providing valuable insights when needed.

Next, the `useEffect` hook is utilized to initiate an API call to TMDB immediately after the component is successfully mounted in the browser. Within the `useEffect` function, we define a `fetch` function accompanied by the pre-defined URL stored in a constant variable. Upon a successful API call, we utilize the `setTrendingMovies` function to store the retrieved data in the state. Similarly, we utilize the `setIsError` function to handle and manage any potential errors that may occur during the API call. After that, we can populate and display corespond data on the browser by returning them on template.

## Styled Components in Action

Styled components are instrumental in showcasing data in an appealing manner within this project. By using the technique of [styled components](https://styled-components.com/), we integrate CSS code directly into React components using CSS-in-JS syntax. This method enables us to craft visually attractive and harmonious designs, thereby enhancing the overall presentation of the project.

This example creates some simple components, a container and a button, with some styles attached to it:

```tsx
// page.tsx
import { styled } from "styled-components"

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
            <Button>click me</Button>
        </Container>
    )
}
```

Styled-components handles CSS regular rules by encapsulating them within backticks inside JavaScript/TypeScript. This seamless integration allows us to import the styled component into our page component and render it directly within the markup. With this approach, the styling and component logic are neatly consolidated, simplifying the development process and enhancing the overall maintainability of the project.

## Conclusion

By combining the versatility of React.js with the vast data from the TMDB database, my application becomes an invaluable resource for film enthusiasts. Users can easily explore, discover, and stay informed about their favorite movies and TV series through a seamless and intuitive interface. It's my passion project that brings the world of cinema closer to the fingertips of every user.

## Closing Thoughts

This personal project holds a special place in my journey as it marks the creation of my first complex React application. While it may not boast extravagant features, I take immense satisfaction in developing useful and impactful solutions. The process of building this project has been incredibly enjoyable, allowing me to apply my React skills and explore the vast potential of the framework.
