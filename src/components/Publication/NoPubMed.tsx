import { ReactElement } from 'react';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';

interface NoPubMedProps {
  publication: string;
}

const NoPubMed = ({ publication }: NoPubMedProps): ReactElement => (
  <ExternalLink href={publication}>{publication}</ExternalLink>
);

export default NoPubMed;
