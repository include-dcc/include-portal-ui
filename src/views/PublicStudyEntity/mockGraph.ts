/* eslint-disable max-len */
export const mockGraph = {
  demographic: {
    totalParticipant: 1055,
    sex: [
      {
        key: 'female',
        doc_count: 549,
      },
      {
        key: 'male',
        doc_count: 506,
      },
    ],
    ethnicity: [
      {
        key: 'Not Hispanic or Latino',
        doc_count: 862,
      },
      {
        key: 'Hispanic or Latino',
        doc_count: 153,
      },
      {
        key: 'Unknown',
        doc_count: 40,
      },
    ],
    race: [
      {
        key: 'White',
        doc_count: 890,
      },
      {
        key: 'Other Race',
        doc_count: 68,
      },
      {
        key: 'Unknown',
        doc_count: 45,
      },
      {
        key: 'Black or African American',
        doc_count: 24,
      },
      {
        key: 'Asian',
        doc_count: 19,
      },
      {
        key: 'American Indian or Alaska Native',
        doc_count: 7,
      },
      {
        key: 'Native Hawaiian or Other Pacific Islander',
        doc_count: 2,
      },
    ],
  },
  files_data_category: {
    totalParticipant: 1055,
    data: [
      {
        key: 'Transcriptomics',
        doc_count: 578,
      },
      {
        key: 'Genomics',
        doc_count: 457,
      },
      {
        key: 'Proteomics',
        doc_count: 477,
      },
      {
        key: 'Metabolomics',
        doc_count: 418,
      },
    ],
  },
  files_data_type: {
    totalParticipant: 1055,
    data: [
      {
        key: 'Gene Expression Quantifications',
        doc_count: 578,
      },
      {
        key: 'Gene Fusions',
        doc_count: 578,
      },
      {
        key: 'Aligned Reads',
        doc_count: 604,
      },
      {
        key: 'Unaligned Reads',
        doc_count: 400,
      },
      {
        key: 'Protein abundance (absolute protein concentration)',
        doc_count: 477,
      },
      {
        key: 'gVCF',
        doc_count: 457,
      },
      {
        key: 'Variant Calls',
        doc_count: 451,
      },
      {
        key: 'Preprocessed metabolite relative abundance',
        doc_count: 418,
      },
      {
        key: 'Other',
        doc_count: 21,
      },
    ],
  },
  down_syndrome_status: {
    totalParticipant: 1055,
    data: [
      {
        key: 'T21',
        doc_count: 685,
      },
      {
        key: 'D21',
        doc_count: 370,
      },
    ],
  },
  samples: {
    totalBiospecimen: 39203,
    sample_type: [
      {
        key: 'Plasma',
        doc_count: 12716,
      },
      {
        key: 'White Blood Cells',
        doc_count: 10482,
      },
      {
        key: 'Red Blood Cells',
        doc_count: 8152,
      },
      {
        key: 'DNA',
        doc_count: 2463,
      },
      {
        key: 'RNA',
        doc_count: 2120,
      },
      {
        key: 'Peripheral Whole Blood',
        doc_count: 1242,
      },
      {
        key: 'PBMCs',
        doc_count: 895,
      },
      {
        key: 'CD4+ Tconv Cells',
        doc_count: 176,
      },
      {
        key: 'Monocytes',
        doc_count: 173,
      },
      {
        key: 'NK Cells',
        doc_count: 165,
      },
      {
        key: 'CD8+ T Cells',
        doc_count: 148,
      },
      {
        key: 'B Cells',
        doc_count: 127,
      },
      {
        key: 'Granulocytes',
        doc_count: 86,
      },
      {
        key: 'Blood Smear Slide',
        doc_count: 78,
      },
      {
        key: 'Regulatory T Cells',
        doc_count: 57,
      },
      {
        key: 'Buffy Coat',
        doc_count: 53,
      },
      {
        key: 'ATAC-Seq Sample',
        doc_count: 46,
      },
      {
        key: 'Saliva',
        doc_count: 24,
      },
    ],
    status: [
      {
        key: 'available',
        doc_count: 28529,
      },
      {
        key: 'unavailable',
        doc_count: 10674,
      },
    ],
  },
};

export const mockPhenotypes = [
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the cardiovascular system (HP:0001626)-Abnormal cardiovascular system morphology (HP:0030680)-Abnormal heart morphology (HP:0001627)',
    label: 'Abnormal heart morphology (HP:0001627)',
    value: 201,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the endocrine system (HP:0000818)-Abnormality of the thyroid gland (HP:0000820)-Abnormality of thyroid physiology (HP:0002926)-Hypothyroidism (HP:0000821)',
    label: 'Hypothyroidism (HP:0000821)',
    value: 191,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the nervous system (HP:0000707)-Abnormal nervous system physiology (HP:0012638)-Abnormality of mental function (HP:0011446)-Sleep abnormality (HP:0002360)-Sleep-related breathing disorders (HP:5200283)-Sleep apnea (HP:0010535)',
    label: 'Sleep apnea (HP:0010535)',
    value: 128,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the nervous system (HP:0000707)-Abnormal nervous system physiology (HP:0012638)-Abnormality of mental function (HP:0011446)-Sleep abnormality (HP:0002360)-Sleep-related breathing disorders (HP:5200283)-Sleep apnea (HP:0010535)-Obstructive sleep apnea (HP:0002870)',
    label: 'Obstructive sleep apnea (HP:0002870)',
    value: 115,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the cardiovascular system (HP:0001626)-Abnormal cardiovascular system morphology (HP:0030680)-Abnormal heart morphology (HP:0001627)-Abnormal cardiac septum morphology (HP:0001671)-Abnormal atrial septum morphology (HP:0011994)-Atrial septal defect (HP:0001631)',
    label: 'Atrial septal defect (HP:0001631)',
    value: 103,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the cardiovascular system (HP:0001626)-Abnormal cardiovascular system morphology (HP:0030680)-Abnormal heart morphology (HP:0001627)-Abnormal cardiac septum morphology (HP:0001671)-Abnormal ventricular septum morphology (HP:0010438)-Ventricular septal defect (HP:0001629)',
    label: 'Ventricular septal defect (HP:0001629)',
    value: 98,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the immune system (HP:0002715)-Abnormality of immune system physiology (HP:0010978)-Abnormal inflammatory response (HP:0012647)-Increased inflammatory response (HP:0012649)-Inflammatory abnormality of the skin (HP:0011123)-Eczematoid dermatitis (HP:0000964)',
    label: 'Eczematoid dermatitis (HP:0000964)',
    value: 94,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the musculoskeletal system (HP:0033127)-Abnormality of the skeletal system (HP:0000924)',
    label: 'Abnormality of the skeletal system (HP:0000924)',
    value: 86,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the integument (HP:0001574)-Abnormality of the skin (HP:0000951)',
    label: 'Abnormality of the skin (HP:0000951)',
    value: 80,
  },
  {
    id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the digestive system (HP:0025031)-Abnormality of the gastrointestinal tract (HP:0011024)-Functional abnormality of the gastrointestinal tract (HP:0012719)-Abnormal esophagus physiology (HP:0025270)-Gastroesophageal reflux (HP:0002020)',
    label: 'Gastroesophageal reflux (HP:0002020)',
    value: 73,
  },
];

export const mockMondo = [
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-cardiovascular disorder (MONDO:0004995)-heart disorder (MONDO:0005267)-congenital heart disease (MONDO:0005453)',
    label: 'congenital heart disease (MONDO:0005453)',
    value: 201,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-endocrine system disorder (MONDO:0005151)-thyroid gland disorder (MONDO:0003240)-hypothyroidism (MONDO:0005420)',
    label: 'hypothyroidism (MONDO:0005420)',
    value: 197,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-nervous system disorder (MONDO:0005071)-sleep disorder (MONDO:0100081)-sleep-wake disorder (MONDO:0003406)-sleep apnea syndrome (MONDO:0005296)',
    label: 'sleep apnea syndrome (MONDO:0005296)',
    value: 128,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-nervous system disorder (MONDO:0005071)-sleep disorder (MONDO:0100081)-sleep-wake disorder (MONDO:0003406)-sleep apnea syndrome (MONDO:0005296)-obstructive sleep apnea syndrome (MONDO:0007147)',
    label: 'obstructive sleep apnea syndrome (MONDO:0007147)',
    value: 115,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-hereditary disease (MONDO:0003847)-cardiogenetic disease (MONDO:0100547)-atrial septal defect (MONDO:0006664)',
    label: 'atrial septal defect (MONDO:0006664)',
    value: 103,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-hereditary disease (MONDO:0003847)-cardiogenetic disease (MONDO:0100547)-ventricular septal defect (MONDO:0002070)',
    label: 'ventricular septal defect (MONDO:0002070)',
    value: 98,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-inflammatory disease (MONDO:0021166)-dermatitis (MONDO:0002406)-atopic eczema (MONDO:0004980)',
    label: 'atopic eczema (MONDO:0004980)',
    value: 94,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-musculoskeletal system disorder (MONDO:0002081)-skeletal system disorder (MONDO:0005172)',
    label: 'skeletal system disorder (MONDO:0005172)',
    value: 86,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-integumentary system disorder (MONDO:0002051)-skin disorder (MONDO:0005093)',
    label: 'skin disorder (MONDO:0005093)',
    value: 80,
  },
  {
    id: 'disease (MONDO:0000001)-human disease (MONDO:0700096)-nervous system disorder (MONDO:0005071)-perceptual disorders (MONDO:0024417)-hearing disorder (MONDO:0021945)-hearing loss disorder (MONDO:0005365)',
    label: 'hearing loss disorder (MONDO:0005365)',
    value: 79,
  },
];
