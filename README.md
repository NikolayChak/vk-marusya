# Online-Plattform VK Marusya

The user can view information about movies, view a list of popular movies, select movies by genre, view trailers, and can register to add movies to favorites.
It is also possible to search for movies by title (results are sorted by rating).
Registration, authorization, movie search and trailer viewing forms are opened in modal windows.

## Application structure

1. Main page consists of a dashboard with random movies and a list with 10 most popular movies.
2. Page with list of genres
3. Specific genre page with list of movies.
4. A page of a specific movie with detailed information, the ability to view the trailer and add to favorites (for logged-in users).
5. User account page with information about the user and a list of movies he/she has added to favorites. Here you can log-out.

## How to run the app

1. Install Dependencies: `npm install`;

2. Start:

- Production mode: `npm run build`;
- Development mode: `npm run dev`;
- Run tests: `npm run test`;
- Check with ESlint: `npm run lint`;

## References

[Figma - Layout VK Marusya](https://www.figma.com/design/8FW6Yt3ztcoYATQhqiy4qK/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82-VK-%D0%9C%D0%B0%D1%80%D1%83%D1%81%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%B0-Vue%2FReact?node-id=0-1&node-type=canvas)

[Movie API 1.0](https://cinemaguide.skillbox.cc/docs/)

## Stack of technologies

- React
- React-dom
- TypeScript
- react-router-dom
- axios
- Redux, @reduxjs/toolkit
- react-hook-form, @hookform/resolvers
- @tanstack/react-query
- zod
- react-icons
- react-player
- react-responsive
- react-spring
- CSS
- Vite
- ESlint
- PreCommit-Hook
- jest
- jest-environment-jsdom
