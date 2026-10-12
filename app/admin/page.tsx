import type { Metadata } from 'next';
import { AdminPage } from '../../src/views/AdminPage';

export const metadata: Metadata = {
  title: 'Admin Gateway | VPD Technologies',
};

export default function AdminPageRoute() {
  return <AdminPage />;
}
