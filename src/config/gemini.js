import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCGXj68oLJjXMOv0E9vHZd8u3-gfC3olDw",
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: (prompt),
        },
      ],
    },
  ];
  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullText="";
  let fileIndex = 0;
  for await (const chunk of response) {
    if(chunk.text){
      fullText+=chunk.text;
      console.log(chunk.text);
    }
  }
  
  return fullText;
}
export default main;