module.exports = {
  siteMetadata: {
    title: `Positive Ko | Blog`,
    name: `Positive Ko`,
    siteUrl: `https://positiveko.netlify.app`,
    description: `스스로 얼마나 부족한지 고해성사하는 주니어 개발자의 회고 블로그.`,
    image: "content/authors/authors/avatars/edieko.jpeg",
    hero: {
      heading: `虎視牛行 | 호시우행`,
      maxWidth: 652,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/positiveko`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/edie_ko/`,
      },
      {
        name: `velog`,
        url: `https://velog.io/@edie_ko`,
      },
      {
        name: `pinterest`,
        url: `https://www.pinterest.co.kr/spark1er/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Positive Ko`,
        short_name: `Positive Ko`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};
