import React from "react"
import Layout from "../components/layout"

export default function Product({ pageContext }) {
  const index = pageContext.data.index
  return (
    <Layout>
      <div>
        <h1>Product {index}</h1>
      </div>
    </Layout>
  )
}
