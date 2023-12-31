import React, { useState, Fragment } from 'react'
import { useIntl, defineMessages, FormattedMessage } from 'react-intl'
import { useDropzone } from 'react-dropzone'
import { ButtonWithIcon, IconDelete, Spinner, Divider } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import {
  useAccountCreateState,
  useAccountCreateDispatch,
} from '../AccountCreateContext'
import IconUpload from '../../images/upload.svg'
import IconWarning from '../../images/warning.svg'

interface DropProps {
  maxSize: number
  documentType: string
}

const messages = defineMessages({
  fileSizeError: {
    defaultMessage: 'File exceeds the size limit. Please choose a smaller one.',
    id: 'store/flowFinance.accountCreate.documents.fileSizeError',
  },
  genericError: {
    defaultMessage: 'Something went wrong. Please try again.',
    id: 'store/flowFinance.accountCreate.documents.genericError',
  },
  selectFileBtn: {
    defaultMessage: 'Select',
    id: 'store/flowFinance.accountCreate.documents.selectFileButton',
  },
  cnhLabel: {
    defaultMessage: 'CNH',
    id: 'store/flowFinance.accountCreate.documents.cnhLabel',
  },
  rgLabel: {
    defaultMessage: 'RG',
    id: 'store/flowFinance.accountCreate.documents.rgLabel',
  },
})

const CSS_HANDLES = [
  'dropzoneContainer',
  'dropzoneRadioOptions',
  'dropzoneRadioOption',
  'dropzoneRadioOptionInput',
  'dropzoneRadioLabelText',
  'dropzoneErrorContainer',
  'dropzoneErrorIcon',
  'dropzoneErrorText',
  'dropzoneFilenameContainer',
  'dropzoneFilenameText',
  'dropzoneUploadContainer',
  'dropzoneUploadIcon',
  'dropzoneUploadInstructions',
  'dropzoneUploadButton',
  'dropzoneUploadButtonText',
] as const

const DocumentDropzone: StorefrontFunctionComponent<DropProps> = ({
  maxSize,
  documentType,
}) => {
  const intl = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const { businessInformation, personalInformation } = useAccountCreateState()
  const dispatch = useAccountCreateDispatch()
  const handles = useCssHandles(CSS_HANDLES)

  // function getBase64(file: File) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       resolve(reader.result)
  //     }
  //     reader.onerror = reject
  //     reader.readAsDataURL(file)
  //   })
  // }

  const onDropImage = async (files: File[]) => {
    setError(null)
    try {
      if (files?.[0]) {
        setIsLoading(true)

        // const base64EncodedFile = (await getBase64(files[0])) as string

        dispatch({
          type:
            documentType === 'business'
              ? 'SET_BUSINESS_FIELD'
              : 'SET_PERSONAL_FIELD',
          args: {
            field: 'physicalDocFile',
            value: files[0],
            // value: base64EncodedFile.split(',')[1],
          },
        })
        dispatch({
          type:
            documentType === 'business'
              ? 'SET_BUSINESS_FIELD'
              : 'SET_PERSONAL_FIELD',
          args: {
            field: 'physicalDocFileName',
            value: files[0].name,
          },
        })
        setIsLoading(false)
      } else {
        return setError(intl.formatMessage(messages.fileSizeError))
      }
    } catch (err) {
      setError(intl.formatMessage(messages.genericError))
      setIsLoading(false)
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    accept:
      documentType === 'business'
        ? ['.pdf', '.jpg', '.jpeg', '.png']
        : ['.jpg', '.jpeg', '.png'],
    maxSize,
    multiple: false,
    onDrop: onDropImage,
  })

  async function handlePersonalDocTypeChange(newType: string) {
    dispatch({
      type: 'SET_PERSONAL_FIELD',
      args: {
        field: 'docType',
        value: newType,
      },
    })
  }

  async function handleRemoveFile() {
    setError(null)
    setIsLoading(true)
    dispatch({
      type:
        documentType === 'business'
          ? 'SET_BUSINESS_FIELD'
          : 'SET_PERSONAL_FIELD',
      args: {
        field: 'physicalDocValue',
        value: '',
      },
    })
    dispatch({
      type:
        documentType === 'business'
          ? 'SET_BUSINESS_FIELD'
          : 'SET_PERSONAL_FIELD',
      args: {
        field: 'physicalDocFileName',
        value: '',
      },
    })
    setIsLoading(false)
  }

  return (
    <div
      className={`${handles.dropzoneContainer} pa7 br3 b--dashed b--muted-4 bw2 tc mb7`}
    >
      {documentType === 'personal' && (
        <Fragment>
          <div className={`${handles.dropzoneRadioOptions} mb5`}>
            <label className={`${handles.dropzoneRadioOption} pa4`}>
              <input
                type="radio"
                name="document"
                checked={personalInformation.docType === 'CNH'}
                value="CNH"
                id="cnh"
                onChange={() => handlePersonalDocTypeChange('CNH')}
                className={`${handles.dropzoneRadioOptionInput}`}
              />
              {` `}
              <span className={`${handles.dropzoneRadioLabelText}`}>
                {intl.formatMessage(messages.cnhLabel)}
              </span>
            </label>
            <label className={`${handles.dropzoneRadioOption} pa4`}>
              <input
                type="radio"
                name="document"
                checked={personalInformation.docType === 'RG'}
                value="RG"
                id="rg"
                onChange={() => handlePersonalDocTypeChange('RG')}
                className={`${handles.dropzoneRadioOptionInput}`}
              />
              {` `}
              <span className={`${handles.dropzoneRadioLabelText}`}>
                {intl.formatMessage(messages.rgLabel)}
              </span>
            </label>
          </div>
          <Divider orientation="horizontal" />
        </Fragment>
      )}
      {error && (
        <Fragment>
          <div
            className={`${handles.dropzoneErrorContainer} flex flex-row c-danger t-small justify-center items-center mt7 mb7 ph7`}
          >
            <img
              className={`${handles.dropzoneErrorIcon}`}
              src={IconWarning}
              alt="Warning"
            />
            <span className={`${handles.dropzoneErrorText}`}>{error}</span>
          </div>
          <Divider orientation="horizontal" />
        </Fragment>
      )}
      <div {...getRootProps()}>
        {isLoading ? (
          <div>
            <Spinner size={32} />
          </div>
        ) : (documentType === 'business' &&
            businessInformation.physicalDocFileName) ||
          (documentType === 'personal' &&
            personalInformation.physicalDocFileName) ? (
          <div
            className={`${handles.dropzoneFilenameContainer} black-70 flex flex-row justify-between items-center`}
          >
            <span className={`${handles.dropzoneFilenameText}`}>
              {documentType === 'business' &&
                businessInformation.physicalDocFileName}
              {documentType === 'personal' &&
                personalInformation.physicalDocFileName}
            </span>
            <ButtonWithIcon
              onClick={() => handleRemoveFile()}
              variation="tertiary"
              icon={<IconDelete />}
            />
          </div>
        ) : (
          <div className={`${handles.dropzoneUploadContainer} pt7 pb7`}>
            <input {...getInputProps()} />
            <img
              className={`${handles.dropzoneUploadIcon}`}
              src={IconUpload}
              alt="Upload Icon"
            />
            <div className={`${handles.dropzoneUploadInstructions} ma3`}>
              <FormattedMessage
                id="store/flowFinance.accountCreate.documents.uploadInstructions"
                values={{
                  lineBreak: <br />,
                }}
              />
            </div>
            <button
              className={`${handles.dropzoneUploadButton} vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-small t-action--small bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
              type="button"
            >
              <div
                className={`${handles.dropzoneUploadButtonText} vtex-button__label flex items-center justify-center h-100 ph5`}
                style={{ paddingTop: '.25em', paddingBottom: '.32em' }}
              >
                {intl.formatMessage(messages.selectFileBtn)}
              </div>
            </button>
            <div className="t-mini mt3">
              <FormattedMessage
                id="store/flowFinance.accountCreate.documents.fileRestrictions"
                values={{
                  businessFileType: documentType === 'business' ? 'PDF, ' : '',
                  fileSize: documentType === 'business' ? '10' : '3',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentDropzone
