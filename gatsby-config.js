module.exports = {
  siteMetadata: {
    title: `Blog | Positive Ko`,
    name: `Positive Ko`,
    siteUrl: `https://novela.narative.co`,
    description: `요행을 바라지 않는 개발자가 될게요`,
    hero: {
      heading: `Positive Ko Blog`,
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
