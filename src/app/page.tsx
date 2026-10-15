import HomeContent from './HomeContent';
import LatestSermonEmbed from '@/components/LatestSermonEmbed';

export default function Home() {
  return <HomeContent latestSermonEmbed={<LatestSermonEmbed />} />;
}
