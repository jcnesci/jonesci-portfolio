# JCNESCI.com

See original code [here](https://github.com/margueriteroth/gatsby-prismic-starter-prist).

To get it to run, had to do:

- in Terminal:
  - `gatsby new jcnesci-new https://github.com/margueriteroth/gatsby-prismic-starter-prist`
  - go into folder, install and fix packages using Yarn (not NPM, doesn't resolve packages properly like Yarn)
  - `yarn install`
  - `yarn remove gatsby-source-prismic-graphql` (cuz of [this issue](https://github.com/margueriteroth/gatsby-prismic-starter-prist/issues/24))
  - `yarn add @prismicio/gatsby-source-prismic-graphql`
- in `gatsby-config.js`
  - replace `gatsby-source-prismic-graphql` with `@prismicio/gatsby-source-prismic-graphql`
  - change to `repositoryName: "jcnesci-portfolio"`
- in Terminal:
  - `gatsby develop`
  - Should work.

## WIP:

- new colors: https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=00BFA5&secondary.color=FF9E80
