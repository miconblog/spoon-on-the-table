module.exports = {
  MSG: {
    'NO_ATTACHMENT': 'NO_ATTACHMENT',
    'UNSUPPORT_MEDIATYE': 'UNSUPPORT_MEDIATYE',
    'NEED_FROM_FIELD': 'NEED_FROM_FIELD',
    'NOT_CORRECT_FROM_FIELD': 'NOT_CORRECT_FROM_FIELD',
    'UNKNOWN_S3': 'UNKNOWN_S3',
    'NEED_AUTHENTICATION': 'NEED_AUTHENTICATION'
  },
  NO_ATTACHMENT: {
    code: 400,
    message: '첨부파일이 없다'
  },
  UNSUPPORT_MEDIATYE: {
    code: 415,
    message: '이미지 파일이 아니다.'
  },
  NEED_FROM_FIELD: {
    code: 400,
    message: '어디에서 이미지를 올렸는지 알수없다.'
  },
  NOT_CORRECT_FROM_FIELD: {
    code: 400,
    message: '지원하는 필드값이 아니다'
  },
  NEED_AUTHENTICATION: {
    code: 403,
    message: '인증이 필요합니다.'
  },
  UNKNOWN_S3: {
    code: 500,
    message: 'S3 업로드 중에 발생한 알수없는 에러, 에러 로그를 확인하시오!'
  }
}