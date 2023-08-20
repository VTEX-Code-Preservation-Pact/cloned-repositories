import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default function Category({ pageContext }) {
  const index = pageContext.data.index
  const max = pageContext.data.max
  const products = []
  for (let i = 0; i < 10; i++) {
    const product = (index - 1) * 10 + i + 1
    if (product <= max) {
      products.push(product)
    }
  }
  return (
    <Layout>
      <div>
        <h1>Category {index}</h1>
        <ul>
          {products.map(productId => (
            <li>
              <Link to={`/products/${productId}`}>Product {productId}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
