import SermonsContent from './SermonsContent';
import LatestSermonEmbed from '@/components/LatestSermonEmbed';
import { getRecentSermons } from '@/lib/youtube';

export default async function SermonsPage() {
  const recentSermons = await getRecentSermons();

  return (
    <SermonsContent
      latestSermonEmbed={<LatestSermonEmbed className="max-w-4xl mx-auto" />}
      recentSermons={recentSermons}
    />
  );
}
