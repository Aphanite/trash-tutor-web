import { uploadToBucket } from './upload.js'
import { convertToBase64, convertToImage } from './convertHelper.js'

const filepath = './tetra.png'

const base64 = await convertToBase64(filepath)

const exampleCodes = [
  'unidentifiable_object',
  'unidentifiable_category',
  'multiple_objects',
  'no_tool_call',
  'internal_server_error',
  'connection_error',
  'response_not_json',
  'invalid_api_key',
]

const { fileName, contentType } = await convertToImage(base64)
console.log('fileName', fileName)

const response = await uploadToBucket(`./${fileName}`, exampleCodes[0])
console.log('response', response)
