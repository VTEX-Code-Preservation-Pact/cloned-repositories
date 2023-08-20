import React from 'react'
import Layout from '@theme/Layout'
import StartSection from './sections/StartSection/StartSection'
import ShoppingExperiences from './sections/ShoppingExperiences/ShoppingExperiences'
import Apps from './sections/Apps/Apps'
import DeveloperTools from './sections/DeveloperTools/DeveloperTools.js'
import UpdatesSection from './sections/UpdatesSection/UpdatesSection'
import CommunitySection from './sections/CommunitySection/CommunitySection'

function Home() {
  return (
    <Layout title="Developer Portal">
      <main>
        <StartSection />
        <ShoppingExperiences />
        <Apps />
        <DeveloperTools />
        <UpdatesSection />
        <CommunitySection />
      </main>
    </Layout>
  )
}

export default Home
