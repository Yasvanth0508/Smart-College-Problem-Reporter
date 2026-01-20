import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const analyzeIssueWithAI = async (description) => {
  try {
    const prompt = `
You are an assistant that processes college infrastructure complaints.

Return ONLY valid JSON with:
- summary: max 20 words
- category: one of [Electrical, Plumbing, Cleanliness, Internet, Classroom, Other]
- priority: one of [low, medium, high]

Description:
"${description}"
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0
    });

    const responseText = completion.choices[0].message.content;

    // Extract JSON safely
    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid AI response format");
    }

    const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(jsonString);

    return {
      summary: parsed.summary || "",
      category: parsed.category || "Other",
      priority: parsed.priority || "medium"
    };
  } catch (error) {
    console.error("AI analysis failed:", error.message);

    // SAFE FALLBACK (never break issue creation)
    return {
      summary: description.slice(0, 50),
      category: "Other",
      priority: "medium"
    };
  }
};
