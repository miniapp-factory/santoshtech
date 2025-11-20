'use client';

import { Button } from '@/components/ui/button';
import { Share } from '@/components/share';
import { url } from '@/lib/metadata';

export default function Result({
  animal,
  onRetake,
}: {
  animal: string;
  onRetake: () => void;
}) {
  const imageMap: Record<string, string> = {
    cat: '/cat.png',
    dog: '/dog.png',
    fox: '/fox.png',
    hamster: '/hamster.png',
    horse: '/horse.png',
  };

  const animalNames: Record<string, string> = {
    cat: 'Cat',
    dog: 'Dog',
    fox: 'Fox',
    hamster: 'Hamster',
    horse: 'Horse',
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">
        You are most like a {animalNames[animal]}!
      </h2>
      <img
        src={imageMap[animal]}
        alt={animalNames[animal]}
        width={512}
        height={512}
        className="rounded-md"
      />
      <Share text={`I am a ${animalNames[animal]}! ${url}`} />
      <Button onClick={onRetake}>Retake Quiz</Button>
    </div>
  );
}
