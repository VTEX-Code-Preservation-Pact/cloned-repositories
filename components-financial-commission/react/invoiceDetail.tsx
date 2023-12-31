import Handlebars from 'handlebars'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { Alert, Button, Layout, PageHeader, Spinner } from 'vtex.styleguide'
import type { DocumentNode } from 'graphql'

interface InvoiceDetailProps {
  invoiceQuery: DocumentNode
  getTemplate: DocumentNode
  sendEmail: DocumentNode
}

const InvoiceDetail: FC<InvoiceDetailProps> = (props) => {
  const { invoiceQuery, getTemplate, sendEmail } = props

  const { route } = useRuntime()
  const { params } = route
  const { id } = params

  const [emailSent, setEmailSent] = useState(false)
  const [template, setTemplate] = useState('')
  const [invoice, setInvoice] = useState<Invoice>({})
  const [sendEmailFunc, { data: emailData }] = useMutation(sendEmail)

  const { data } = useQuery(invoiceQuery, {
    ssr: false,
    pollInterval: 0,
    variables: {
      id,
    },
  })

  const templateSrc = useQuery(getTemplate, {
    ssr: false,
    pollInterval: 0,
  })

  useEffect(() => {
    setTemplate(templateSrc?.data?.getTemplate)
  }, [templateSrc, template])

  useEffect(() => {
    if (emailData) {
      setEmailSent(true)
    }
  }, [emailData])

  useEffect(() => {
    setInvoice(data?.getInvoice)
  }, [data])

  if (!template) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Spinner />
      </div>
    )
  }

  const hbTemplate = Handlebars.compile(template)
  const htmlString = hbTemplate({ id, ...invoice })

  const handleSendEmail = () => {
    sendEmailFunc({
      variables: {
        emailData: {
          email: invoice?.seller.contact.email,
          jsonData: JSON.stringify(invoice),
        },
      },
    })
  }

  return (
    <Layout>
      <PageHeader title="Invoice Detail">
        {emailSent ? (
          <Alert type="success">
            {<FormattedMessage id="admin/email-success" />}
          </Alert>
        ) : (
          <Button onClick={handleSendEmail}>
            <FormattedMessage id="admin/form-settings.button-email" />
          </Button>
        )}
      </PageHeader>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '100%',
        }}
      >
        <iframe
          srcDoc={htmlString}
          title="invoice detail"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </Layout>
  )
}

export default InvoiceDetail
