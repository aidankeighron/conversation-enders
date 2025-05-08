"use client";
import { useEffect, useState } from "react";

const topicsEasy: string[] = [
  `Honey never spoils: Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.`,
  `Bananas are berries, but strawberries aren't: Botanically speaking, bananas fit the definition of a berry, while strawberries do not.`,
  `A group of flamingos is called a "flamboyance": It's a fun and descriptive collective noun for these vibrant birds.`,
  `Humans share about 50% of their DNA with bananas: It's a surprising reminder of our shared biological heritage.`,
  `It's impossible to hum while holding your nose: Go ahead, try it!`,
  `A jiffy is an actual unit of time: It's defined as 1/100th of a second.`,
];

const topicsMedium: string[] = [
  `The inventor of the Pringles can is now buried in one: Fredric Baur, who designed the iconic tubular can, had his ashes interred in a Pringles container.`,
  `Cleopatra lived closer in time to the invention of the iPhone than to the building of the Great Pyramid of Giza: This really puts historical timelines into perspective.`,
  `A shrimp's heart is in its head: Specifically, it's located in the cephalothorax, which is the fused head and thorax region.`,
  `Wombats have cube-shaped poop: This unique shape is thought to prevent their droppings from rolling away, helping them mark their territory.`,
  `There are more trees on Earth than stars in the Milky Way galaxy: Current estimates suggest around 3 trillion trees versus 100-400 billion stars.`,
  `The toy poodle did not originate in France, but in Germany: Despite its strong association with France, the breed was originally a water retriever in Germany.`,
  `An octopus has three hearts: Two pump blood through the gills, and the third circulates blood to the rest of the body.`,
]

const topicsHard: string[] = [
  `The national animal of Scotland is the unicorn: This mythical creature has been a Scottish symbol since the 15th century.`,
  `There's a species of jellyfish that is considered biologically immortal: Turritopsis dohrnii, often called the immortal jellyfish, can revert to an earlier cellular stage after reaching sexual maturity, potentially repeating its life cycle indefinitely.`,
  `The state of Kentucky has more bourbon barrels aging than it has people: It's a testament to the state's massive bourbon industry.`,
  `No number from 1 to 999 includes the letter "a" in its word form: (e.g., one, two, three... nine hundred ninety-nine). You have to get to "one thousand" to find an "a".`,
  `The first oranges weren't orange: The original citrus fruit from Southeast Asia was actually a green-skinned tangerine-pomelo hybrid. The orange color came later through mutation.`,
  `A "moment" was a medieval unit of time equal to 90 seconds: So, "just a moment" historically meant a minute and a half.`,
]

const bonusOdds: number = 5;
const bonusTopics: string[] = [
  `Get them to pick up a small, inconspicuous item you "accidentally" dropped, and hand it back to you, without you verbally acknowledging the drop or asking them to pick it up.`,
  `Get them to offer you a small, insignificant item of theirs that you've subtly admired (e.g., "That's a cool-looking pen!").`,
  `Get them to shake your hand without asking.`,
  `Get them to offer you a drink without you asking for one.`,
  `Get them to tell you their favorite childhood memory without directly asking "What's your favorite childhood memory?"`,
  `Get them to recommend a book or movie to you without you explicitly asking for a recommendation.`,
  `Get them to say the name of a specific, fairly common animal (e.g., "elephant") while discussing travel.`,
  `Get them to say the name of a fruit while discussing colors.`,
]

const topics: string[][] = [topicsEasy, topicsMedium, topicsHard];
const difficultyToString: string[] = ["easy", "medium", "hard"];

type Topic = {difficulty: number, topic: string};

function getRandomTopic(): Topic {
  const bonus = Math.floor(Math.random() * bonusOdds) == 0; 
  if (bonus) {
    const index = Math.floor(Math.random() * bonusTopics.length);
    return {difficulty: -1, topic: bonusTopics[index]};
  }

  const difficulty = Math.floor(Math.random() * topics.length); 
  const index = Math.floor(Math.random() * topics[difficulty].length);
  return {difficulty, topic: topics[difficulty][index]};
}

export default function Home() {
  const [topic, setTopic] = useState<Topic>(getRandomTopic());
  const [score, setScore] = useState<number>(parseInt(localStorage.getItem("score") ?? "") || 0);

  useEffect(() => {
    if (score < 0) {
      setScore(0);
    }
    localStorage.setItem("score", score.toString());
  }, [score]);

  return (
    <main className="flex flex-col items-center min-h-screen p-8 font-mono justify-self-center md:w-2/3 lg:w-1/2">
      <p className="text-2xl mt-10">
        <span className="font-bold">Topic ({topic.difficulty === -1 ? "bonus" : difficultyToString[topic.difficulty]}): </span>
        {topic.topic}
      </p>
      <div className="fixed bottom-0 mb-10 flex flex-col flex-wrap items-center justify-center">
        <div className="flex gap-10 mb-10">
          <button className="base-button text-xl px-6 py-4 bg-green-200" onClick={() => {
            setTopic(getRandomTopic());
            if (topic.difficulty === -1) {
              setScore(score*2);
            }
            else {
              setScore(score+(topic.difficulty+1)*2);
            }
          }}>Solved {topic.difficulty === -1 ? "2x" : `+${(topic.difficulty+1)*2}`}</button>
          <button className="base-button text-xl px-6 py-4 bg-red-200" onClick={() => {
            setTopic(getRandomTopic());
            if (topic.difficulty !== -1) {
              setScore(score-(3-topic.difficulty));
            }
          }}>New Topic {topic.difficulty === -1 ? "0" : `-${3-topic.difficulty}`}</button>
        </div>
        <p className="text-2xl mb-10"><span className="font-bold">Score: </span>{Math.max(0, score)}</p>
        <button className="base-button text-xl px-4 py-2 bg-white" onClick={() => {
          setScore(0);
        }}>Reset</button>
      </div>
    </main>
  );
}
