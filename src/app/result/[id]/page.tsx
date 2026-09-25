import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultClient } from "@/components/result-client";
import { getTopic, getTopicPosition, getTrail, topics, trails } from "@/data";

export function generateStaticParams() {
  return [
    ...topics.map((topic) => ({ id: topic.id })),
    ...trails.map((trail) => ({ id: trail.id })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const topic = getTopic(id);
  const trail = getTrail(id);
  if (topic) return { title: `Result — ${topic.title}` };
  if (trail) return { title: "Trail Complete" };
  return { title: "Result" };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topic = getTopic(id);
  const trail = getTrail(id);

  if (topic) {
    const position = getTopicPosition(id);
    if (!position?.trail) notFound();
    return (
      <ResultClient
        kind="quiz"
        quizId={topic.quizId}
        topic={topic}
        trail={position.trail}
        nextTopic={position.next}
      />
    );
  }

  if (trail) {
    return <ResultClient kind="trail" trail={trail} />;
  }

  notFound();
}