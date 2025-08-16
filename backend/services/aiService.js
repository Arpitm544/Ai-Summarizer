const { groq } = require('../config/ai');
const { v4: uuidv4 } = require('uuid');
const Summary = require('../models/Summary');

class AIService {
  async generateSummary(fileId, customPrompt, transcriptText) {
    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      throw new Error('AI service not configured. Please set GROQ_API_KEY environment variable.');
    }

    // Prepare the prompt for Groq
    const systemPrompt = `You are an expert meeting summarizer. Your task is to create a comprehensive, well-structured summary based on the user's specific instructions. 

Guidelines:
- Follow the user's custom instructions exactly
- Maintain the key points and important details
- Use clear, professional language
- Structure the output appropriately (bullet points, paragraphs, etc. as requested)
- Focus on actionable items and key decisions
- Include relevant context and background information`;

    const userPrompt = `Please summarize the following meeting transcript according to these instructions: "${customPrompt}"

Meeting Transcript:
${transcriptText}

Please provide a well-structured summary that follows the user's specific requirements.`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 4000,
      top_p: 1,
      stream: false,
    });

    const generatedSummary = completion.choices[0]?.message?.content;

    if (!generatedSummary) {
      throw new Error('Failed to generate summary');
    }

    // Store the summary
    const summaryId = uuidv4();
    const summaryData = {
      id: summaryId,
      fileId: fileId,
      originalPrompt: customPrompt,
      generatedSummary: generatedSummary,
      model: "llama3-8b-8192",
      createdAt: new Date(),
      tokensUsed: completion.usage?.total_tokens || 0
    };

    // If database is configured, save to database
    if (process.env.MONGODB_URI) {
      const summary = new Summary({
        fileId: fileId,
        originalPrompt: customPrompt,
        generatedSummary: generatedSummary,
        model: "llama3-8b-8192",
        tokensUsed: completion.usage?.total_tokens || 0
      });
      await summary.save();
      return { ...summaryData, id: summary._id };
    }

    // Otherwise, store in memory
    if (!global.summaries) {
      global.summaries = new Map();
    }
    global.summaries.set(summaryId, summaryData);

    return summaryData;
  }

  async getSummaryById(summaryId) {
    // If database is configured, get from database
    if (process.env.MONGODB_URI) {
      return await Summary.findById(summaryId);
    }

    // Otherwise, get from memory
    if (!global.summaries || !global.summaries.has(summaryId)) {
      return null;
    }
    
    return global.summaries.get(summaryId);
  }

  async updateSummary(summaryId, editedSummary) {
    // If database is configured, update in database
    if (process.env.MONGODB_URI) {
      const summary = await Summary.findByIdAndUpdate(
        summaryId,
        { 
          editedSummary: editedSummary,
          updatedAt: new Date()
        },
        { new: true }
      );
      return summary;
    }

    // Otherwise, update in memory
    if (!global.summaries || !global.summaries.has(summaryId)) {
      throw new Error('Summary not found');
    }

    const summaryData = global.summaries.get(summaryId);
    summaryData.editedSummary = editedSummary;
    summaryData.updatedAt = new Date();
    
    return summaryData;
  }
}

module.exports = new AIService();
