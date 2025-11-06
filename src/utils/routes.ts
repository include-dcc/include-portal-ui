export enum STATIC_ROUTES {
  HOME = '/',
  LOGIN = '/login',
  AUTH_REDIRECT = '/auth-redirect',
  DASHBOARD = '/dashboard',
  STUDIES = '/studies',
  PUBLIC_STUDIES = '/public-studies',
  PROFILE_SETTINGS = '/profile/settings',
  COMMUNITY = '/community',
  ERROR = '/error',

  DATA_EXPLORATION = '/data-exploration',
  DATA_EXPLORATION_SUMMARY = '/data-exploration/summary',
  DATA_EXPLORATION_PARTICIPANTS = '/data-exploration/participants',
  DATA_EXPLORATION_BIOSPECIMENS = '/data-exploration/biospecimens',
  DATA_EXPLORATION_DATAFILES = '/data-exploration/datafiles',

  VARIANTS = '/variants',

  FILES = '/files',
  PARTICIPANTS = '/participants',

  DCF_FENCE_REDIRECT = '/dcf_redirect',
  CAVATICA_FENCE_REDIRECT = '/cavatica_redirect',

  ANALYTICS = '/analytics',
  ANALYTICS_TRANSCRIPTOMIC = '/analytics/transcriptomic',
  ANALYTICS_SET_OPERATIONS = '/analytics/set-operations',
}

export enum DYNAMIC_ROUTES {
  DATA_EXPLORATION = '/data-exploration/:tab?',
  STUDY_ENTITY = '/studies/:study_code?',
  PUBLIC_STUDY = '/public-studies/:study_code?',
  VARIANT_ENTITY = '/variants/:locus?',
  FILE_ENTITY = '/files/:file_id?',
  PARTICIPANT_ENTITY = '/participants/:participant_id?',
  ERROR = '/error/:status?',
  COMMUNITY_MEMBER = '/member/:id',
}
