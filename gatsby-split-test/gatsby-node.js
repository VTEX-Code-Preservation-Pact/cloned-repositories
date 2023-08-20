/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const min = parseInt(process.env.MIN, 10) || 1
  const max = parseInt(process.env.MAX, 10) || 50
  const { createPage } = actions
  for (var i = min; i <= max; i++) {
    createPage({
      path: `/products/${i}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        data: {
          index: i.toString(),
        },
      },
    })
  }

  for (var i = Math.ceil(min / 10); i <= Math.ceil(max / 10); i++) {
    createPage({
      path: `/categories/${i}`,
      component: path.resolve(`./src/templates/category.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        data: {
          index: i.toString(),
          max,
        },
      },
    })
  }
}
