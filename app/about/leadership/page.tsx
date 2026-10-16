import type { Metadata } from 'next';
import { LeadershipPage } from '../../../src/views/LeadershipPage';

export const metadata: Metadata = {
  title: 'Founders & Leadership | VPD Technologies',
  description:
    'Meet the leadership team at VPD Technologies Private Limited: Sai Krishna Vuppala (Founder & CEO) and Ramcharan Gottipati (Co-Founder & Managing Director). Software innovation rooted in Kurnool, Andhra Pradesh.',
  openGraph: {
    title: 'Founders & Leadership | VPD Technologies',
    description:
      'Executive leadership and company direction for VPD Technologies Private Limited.',
  },
};

export default function AboutLeadershipRoute() {
  return <LeadershipPage />;
}
