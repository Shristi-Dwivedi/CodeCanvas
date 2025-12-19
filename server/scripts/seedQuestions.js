const mongoose = require("mongoose");
const path = require("path");
const Questions = require(path.join(__dirname, "../models/Questions"));

const problems = [
  { title: "Sum of Two Numbers", difficulty: "Easy", description: "Write a program that prints sum of two numbers.", input: "16 , 20", expectedOutput: "36" },
  { title: "Factorial", difficulty: "Easy", description: "Write a program to find factorial of a number.", input: "5", expectedOutput: "120" },
  { title: "Table of Number", difficulty: "Easy", description: "Print table of any number.", input: "10", expectedOutput: "10 20 30 40 50 60 70 80 90 100" },
  { title: "Fibonacci Series", difficulty: "Medium", description: "Write a program to print first N numbers of fibonacci series.", input: "5", expectedOutput: "0 1 1 2 3 ... N" },
  { title: "Reverse of a string", difficulty: "Medium", description: "Write a program that prints reverse of a string.", input: "hello mam", expectedOutput: "mam olleh" },
  { title: "Pallindrome of string", difficulty: "Medium", description: "Write a program that checks if a string is pallindrome or not.", input: "NaN", expectedOutput: "It is Pallindrome" },
  { title: "Print maximum length word", difficulty: "Hard", description: "Write a program that prints word having maximum length.", input: "Hi , how are you world", expectedOutput: "world : 5" },
  { title: "Check if a string is anagram or not.", difficulty: "Hard", description: "Write a program that checks if a string is anagram or not.", input: "computer , tomuprce", expectedOutput: "It is anagram" }
];

async function seed() {
  const MONGO = "mongodb://localhost:27017/IDEusers";
  try {
    console.log("Connecting to:", MONGO);
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB");

    // sanity check model
    if (!Questions || typeof Questions.deleteMany !== "function") {
      console.error("Model import failed — check ../models/Questions.js export");
      process.exit(1);
    }

    // optional: clear existing documents
    const del = await Questions.deleteMany({});
    console.log("Cleared Questions collection (deleted count):", del.deletedCount);

    const docsToInsert = problems.map(p => ({
      title: p.title,
      difficulty: p.difficulty,
      description: p.description,
      input: p.input,
      expectedOutput: p.expectedOutput
    }));

    const inserted = await Questions.insertMany(docsToInsert);
    console.log(`Inserted ${inserted.length} questions:`);
    inserted.forEach(doc => console.log(doc._id.toString(), "-", doc.title));

    await mongoose.disconnect();
    console.log("Disconnected from DB. Seed complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

seed();
