import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from './page-content';
import { db } from '@/db';

export const metadata: Metadata = {
  title: 'Edit draft',
};

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const draft = await db.query.drafts.findFirst({
    where: (drafts, { eq }) => eq(drafts.id, id),
  });

  if (!draft) {
    return notFound();
  }

  return <PageContent draftData={draft} />;
}

export default Page;
