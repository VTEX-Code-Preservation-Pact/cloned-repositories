import React from 'react'
import styles from './CommunitySection.module.css'
import CommunityCard from '../../../components/CommunityCard/CommunityCard'
import officeHours from '../../../../static/img/officeHours.png'
import community from '../../../../static/img/community.png'

const CommunitySection = () => {
  return (
    <section className={styles.CommunitySection}>
      <div className="container">
        <div className={styles.CommunityContent}>
          <div className={styles.CommunityTitle}>
            <h3>
              Join a <strong>community</strong> of
              <br /> digital commerce creators
            </h3>
          </div>
          <div className={styles.allCards}>
            <CommunityCard
              title="Community"
              img={community}
              tagLine="Join the discussion"
              description="Share your questions with other VTEX IO developers."
              linkTo="https://community.vtex.com/"
            />
            <CommunityCard
              title="Office Hours"
              img={officeHours}
              tagLine="Save the date"
              description="Work with the VTEX IO team and partners in our Office Hours meeting."
              linkTo="https://calendar.google.com/event?action=TEMPLATE&tmeid=NDJwNTVsMDM2Mm9rczJxcGFvYmwwZTd1cDFfMjAyMDAzMTlUMTkwMDAwWiB2dGV4LmNvbS5icl9vam9sMTFvMzE2ODU2amMwZWk4M3Vuc3Rvc0Bn&tmsrc=vtex.com.br_ojol11o316856jc0ei83unstos%40group.calendar.google.com&scp=ALL"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
