import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizClient } from "@/components/quiz-client";
import { UnlockGate } from "@/components/unlock-gate";
import { getTopicByQuizId, getTrail, quizzes } from "@/data";

// Server-rendered on demand: the route reads `?scan=1` for the unlock check.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quiz = quizzes.find((q) => q.id === id);
  const topic = quiz ? getTopicByQuizId(quiz.id) : undefined;
  return {
    title: topic ? `Quiz — ${topic.title}` : "Quiz",
    description: quiz ? "A quick quiz to check what you discovered." : undefined,
  };
}

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const rawScan = query.scan;
  const scanned = (Array.isArray(rawScan) ? rawScan[0] : rawScan) === "1";

  const quiz = quizzes.find((q) => q.id === id);
  const topic = quiz ? getTopicByQuizId(quiz.id) : undefined;
  const trail = topic ? getTrail(topic.trailId) : undefined;

  if (!quiz || !topic || !trail) notFound();

  return (
    <UnlockGate topicId={topic.id} scanned={scanned}>
      <QuizClient quiz={quiz} topic={topic} trail={trail} />
    </UnlockGate>
  );
}
