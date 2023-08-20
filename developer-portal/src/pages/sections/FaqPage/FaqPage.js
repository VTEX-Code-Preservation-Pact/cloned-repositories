import React from 'react'
import styles from './FaqPage.module.css'
import FaqQuestion from '../../../components/FaqQuestion/FaqQuestion'

const FaqPage = () => {
  return (
    <div className={styles.FaqPage}>
      <div className={styles.sectionContent}>
        <div className={styles.FaqHeader}>
          <div>
            <h3> Frequently Asked Questions</h3>
            <div>
              Still having trouble? Don’t hesitate to get in touch!
              <br />
              <br />
              Find us at:
              <ul>
                <li>
                  <a href="https://community.vtex.com/">VTEX Community</a>
                </li>
                <li>
                  <a href="https://calendar.google.com/event?action=TEMPLATE&tmeid=NDJwNTVsMDM2Mm9rczJxcGFvYmwwZTd1cDFfMjAyMDAzMTlUMTkwMDAwWiB2dGV4LmNvbS5icl9vam9sMTFvMzE2ODU2amMwZWk4M3Vuc3Rvc0Bn&tmsrc=vtex.com.br_ojol11o316856jc0ei83unstos%40group.calendar.google.com&scp=ALL">
                    Office Hours
                  </a>
                </li>
                <li>
                  <a href="https://support.vtex.com/hc/en-us/requests">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.contentFaq}>
          <h4>Apps and Integrations</h4>
          <FaqQuestion
            title="How do I publish my app on the App Store?"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida sagittis justo, eget suscipit eros tempor ut. Etiam imperdiet dignissim feugiat. Ut erat dui, dignissim ac rutrum a, pretium sit amet lorem. Vivamus in interdum leo."
          />
          <h4>Shopping Experiences</h4>
          <FaqQuestion
            title="How do I...?"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida sagittis justo, eget suscipit eros tempor ut. Etiam imperdiet dignissim feugiat. Ut erat dui, dignissim ac rutrum a, pretium sit amet lorem. Vivamus in interdum leo."
          />
          <FaqQuestion
            title="How do I...?"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida sagittis justo, eget suscipit eros tempor ut. Etiam imperdiet dignissim feugiat. Ut erat dui, dignissim ac rutrum a, pretium sit amet lorem. Vivamus in interdum leo."
          />
          <h4>Frameworks and Tools</h4>
          <FaqQuestion
            title="What is FastStore?"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida sagittis justo, eget suscipit eros tempor ut. Etiam imperdiet dignissim feugiat. Ut erat dui, dignissim ac rutrum a, pretium sit amet lorem. Vivamus in interdum leo."
          />
          <FaqQuestion
            title="Does VTEX IO WebOps...?"
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida sagittis justo, eget suscipit eros tempor ut. Etiam imperdiet dignissim feugiat. Ut erat dui, dignissim ac rutrum a, pretium sit amet lorem. Vivamus in interdum leo."
          />
        </div>
      </div>
    </div>
  )
}

export default FaqPage
