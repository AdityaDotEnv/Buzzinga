import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quiz from './models/quizModel';
import { getDatabaseUri } from './config/db';

dotenv.config();

const quizzes = [
  {
    title: "General Science Trivia",
    description: "Test your knowledge of basic science facts!",
    hostSecret: "science-rocks",
    creatorId: "mock-admin",
    timeLimit: 15,
    questions: [
      { text: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
      { text: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
      { text: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1 },
      { text: "What is the largest organ in the human body?", options: ["Brain", "Heart", "Skin", "Liver"], correct: 2 },
      { text: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
      { text: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0 },
      { text: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], correct: 1 },
      { text: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
      { text: "Which planet is the largest in our solar system?", options: ["Earth", "Mars", "Jupiter", "Neptune"], correct: 2 },
      { text: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "110°C", "120°C"], correct: 1 }
    ]
  },
  {
    title: "History & Geography",
    description: "How well do you know our world and its past?",
    hostSecret: "world-explorer",
    creatorId: "mock-admin",
    timeLimit: 15,
    questions: [
      { text: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
      { text: "Who was the first President of the United States?", options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], correct: 2 },
      { text: "In which country is the Great Barrier Reef located?", options: ["USA", "Australia", "Brazil", "South Africa"], correct: 1 },
      { text: "Which empire was ruled by Julius Caesar?", options: ["Greek", "Roman", "Persian", "Egyptian"], correct: 1 },
      { text: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correct: 2 },
      { text: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "South America", "Australia"], correct: 1 },
      { text: "Who wrote the 'I Have a Dream' speech?", options: ["Malcolm X", "Nelson Mandela", "Martin Luther King Jr.", "Rosa Parks"], correct: 2 },
      { text: "Which country gifted the Statue of Liberty to the USA?", options: ["France", "UK", "Germany", "Italy"], correct: 0 },
      { text: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
      { text: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correct: 2 }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(getDatabaseUri());
    console.log("Connected to MongoDB");

    await Quiz.deleteMany({ creatorId: "mock-admin" });
    console.log("Cleared existing mock quizzes");

    await Quiz.insertMany(quizzes);
    console.log("Mock quizzes seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
