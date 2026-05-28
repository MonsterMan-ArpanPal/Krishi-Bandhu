import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDiICnYRTexFDhEpNbK_cRgTTCK2imzy6o";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  try {
    console.log("Initializing model gemini-2.5-flash-lite with new key...");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });
    
    console.log("Sending message...");
    const result = await model.generateContent("How to treat yellow rust in sugarcane?");
    const response = await result.response;
    console.log("Response text:");
    console.log(response.text());
  } catch (error) {
    console.error("Test script caught error:", error);
  }
}

run();
