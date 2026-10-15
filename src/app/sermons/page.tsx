import SermonsContent from './SermonsContent';
import LatestSermonEmbed from '@/components/LatestSermonEmbed';

export default function SermonsPage() {
  return <SermonsContent latestSermonEmbed={<LatestSermonEmbed className="max-w-4xl mx-auto" />} />;
}
