export enum STATIC_ROUTES {
  HOME = '/',
  LOGIN = '/login',
  AUTH_REDIRECT = '/auth-redirect',
  DASHBOARD = '/dashboard',
  STUDIES = '/studies',
  PROFILE_SETTINGS = '/profile/settings',
  COMMUNITY = '/community',
  ERROR = '/error',

  DATA_EXPLORATION = '/data-exploration',
  DATA_EXPLORATION_SUMMARY = '/data-exploration/summary',
  DATA_EXPLORATION_PARTICIPANTS = '/data-exploration/participants',
  DATA_EXPLORATION_BIOSPECIMENS = '/data-exploration/biospecimens',
  DATA_EXPLORATION_DATAFILES = '/data-exploration/datafiles',

  VARIANTS = '/variants',
  //fixme variantsV2
  VARIANTS_V2 = '/variants_v2',

  FILES = '/files',
  PARTICIPANTS = '/participants',

  GEN3_FENCE_REDIRECT = '/gen3_redirect',
  CAVATICA_FENCE_REDIRECT = '/cavatica_redirect',
}

export enum DYNAMIC_ROUTES {
  DATA_EXPLORATION = '/data-exploration/:tab?',
  VARIANT_ENTITY = '/variants/:locus?',
  //fixme variantsV2
  VARIANT_ENTITY_V2 = '/variants_v2/:locus?',
  FILE_ENTITY = '/files/:file_id?',
  PARTICIPANT_ENTITY = '/participants/:participant_id?',
  ERROR = '/error/:status?',
  COMMUNITY_MEMBER = '/member/:id',
}
