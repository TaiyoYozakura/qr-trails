export * from "./garden";
export * from "./trails";
export * from "./topics";
export * from "./quizzes";
export * from "./flora";
export * from "./guidelines";
export * from "./images";

import { trails } from "./trails";
import { topics } from "./topics";
import { quizzes } from "./quizzes";

export function getTrail(trailId: string) {
  return trails.find((t) => t.id === trailId);
}

export function getTopic(topicId: string) {
  return topics.find((t) => t.id === topicId);
}

export function getQuiz(quizId: string) {
  return quizzes.find((q) => q.id === quizId);
}

export function getTopicByQuizId(quizId: string) {
  return topics.find((t) => t.quizId === quizId);
}

export interface TopicPosition {
  trail: ReturnType<typeof getTrail>;
  topic: ReturnType<typeof getTopic>;
  index: number;
  count: number;
  previous: ReturnType<typeof getTopic>;
  next: ReturnType<typeof getTopic>;
}

export function getTopicsForTrail(trailId: string) {
  const trail = getTrail(trailId);
  if (!trail) return [];
  return trail.topicIds
    .map((id) => getTopic(id))
    .filter((topic): topic is NonNullable<typeof topic> => Boolean(topic));
}

export function getTopicPosition(topicId: string): TopicPosition | null {
  const topic = getTopic(topicId);
  if (!topic) return null;
  const trail = getTrail(topic.trailId);
  if (!trail) return null;
  const index = trail.topicIds.indexOf(topic.id);
  return {
    trail,
    topic,
    index,
    count: trail.topicIds.length,
    previous: index > 0 ? getTopic(trail.topicIds[index - 1]) : undefined,
    next:
      index < trail.topicIds.length - 1
        ? getTopic(trail.topicIds[index + 1])
        : undefined,
  };
}