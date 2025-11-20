'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Result from '@/components/result';

export default function Quiz() {
  const questions = [
    {
      question: 'What is your favorite type of food?',
      options: [
        { text: 'Meat', animal: 'dog' },
        { text: 'Fish', animal: 'cat' },
        { text: 'Plants', animal: 'hamster' },
        { text: 'Grains', animal: 'horse' },
        { text: 'Berries', animal: 'fox' },
      ],
    },
    {
      question: 'Which activity do you enjoy most?',
      options: [
        { text: 'Running', animal: 'horse' },
        { text: 'Playing fetch', animal: 'dog' },
        { text: 'Sleeping', animal: 'cat' },
        { text: 'Hiding', animal: 'fox' },
        { text: 'Nibbling', animal: 'hamster' },
      ],
    },
    {
      question: 'What is your preferred living environment?',
      options: [
        { text: 'Open fields', animal: 'horse' },
        { text: 'Homes', animal: 'dog' },
        { text: 'Cats', animal: 'cat' },
        { text: 'Forests', animal: 'fox' },
        { text: 'Cages', animal: 'hamster' },
      ],
    },
    {
      question: 'How do you like to communicate?',
      options: [
        { text: 'Bark', animal: 'dog' },
        { text: 'Meow', animal: 'cat' },
        { text: 'Whistle', animal: 'horse' },
        { text: 'Squeak', animal: 'hamster' },
        { text: 'Howl', animal: 'fox' },
      ],
    },
    {
      question: 'What is your favorite pastime?',
      options: [
        { text: 'Chasing', animal: 'dog' },
        { text: 'Purring', animal: 'cat' },
        { text: 'Running', animal: 'horse' },
        { text: 'Sneaking', animal: 'fox' },
        { text: 'Nibbling', animal: 'hamster' },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const shuffledOptions = useMemo(() => {
    return questions[current].options
      .slice()
      .sort(() => Math.random() - 0.5);
  }, [current]);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({
      ...prev,
      [animal]: prev[animal] + 1,
    }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
  };

  if (showResult) {
    const maxAnimal = Object.entries(scores).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];
    return <Result animal={maxAnimal} onRetake={retake} />;
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {questions[current].question}
      </h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
