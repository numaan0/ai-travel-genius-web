// src/lib/adk-service.ts
import axios from 'axios';

const ADK_API_URL = process.env.NEXT_PUBLIC_ADK_SERVICE_URL || "http://localhost:8000";

export const adkService = {
  async generateItinerary(userInput: any): Promise<any> {
    try {
      // Create session first
      await this.getSession();

      // Build query
      const query = `Create a complete ${userInput.days}-day travel itinerary for ${userInput.destination} with budget ₹${userInput.budget} for ${userInput.groupSize} ${userInput.personality} travelers interested in ${userInput.preferences.join(', ')}.`;

      // Call ADK agent
      const adkPayload = {
        appName: 'agent',
        userId: 'u_123',
        sessionId: 's_123',
        new_message: {
          role: "user",
          parts: [{ text: query }]
        }
      };

      const response = await axios.post(
        `${ADK_API_URL}`,
        adkPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Extract JSON from response
      const jsonResponse = this.extractJsonFromAdkResponse(response.data);
      
      if (!jsonResponse) {
        throw new Error('No valid JSON response received from agent');
      }

      return jsonResponse;
    } catch (error) {
      console.error('Error calling ADK service:', error);
      throw new Error('Could not generate itinerary. Please try again.');
    }
  },

  async getSession() {
    try {
      const response = await axios.post(
        `http://localhost:8000/apps/agent/users/u_123/sessions/s_123`,
        { state: { key1: "value1", key2: 42 } },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
    }
  },

  extractJsonFromAdkResponse(adkResponse: any): any {
    try {
      const responseArray = Array.isArray(adkResponse) ? adkResponse : [adkResponse];
      
      // Look for the final text response
      for (const turn of responseArray.reverse()) { // Start from the end
        if (turn.content?.parts) {
          for (const part of turn.content.parts) {
            if (part.text) {
              // Try to parse as JSON
              const cleanText = part.text.trim();
              
              // Remove any markdown code blocks if present
              const jsonText = cleanText.replace(/``````\n?/g, '');
              
              try {
                const parsed = JSON.parse(jsonText);
                if (parsed.dailyPlans && Array.isArray(parsed.dailyPlans)) {
                  return parsed;
                }
              } catch (parseError) {
                // If it's not valid JSON, try to extract JSON from within text
                const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  return JSON.parse(jsonMatch[0]);
                }
              }
            }
          }
        }
      }
      
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Failed to extract JSON:', error);
      return null;
    }
  },
  async askQuestion(userInput: any): Promise<any> {
    try {
     
      const adkPayload = {
        appName: 'agent',
        userId: 'u_123',
        sessionId: 's_123',
        new_message: {
          role: "assistant",
          parts: [{ text: userInput }]
        }
      };

      const response = await axios.post(
        `${ADK_API_URL}`,
        adkPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Extract JSON from response
      const jsonResponse = response.data;
      
      if (!jsonResponse) {
        throw new Error('No valid JSON response received from agent');
      }

      return jsonResponse;
    } catch (error) {
      console.error('Error calling ADK service:', error);
      throw new Error('Could not generate itinerary. Please try again.');
    }
  },
  parseAdkJson(adk: any): Record<string, unknown> | null {
  const arr = Array.isArray(adk) ? adk : [adk];

  // walk from last → first (final turn is usually last)
  for (let i = arr.length - 1; i >= 0; i--) {
    const parts = arr[i]?.content?.parts;
    if (!parts) continue;

    for (const p of parts) {
      if (!p?.text) continue;

      // strip ```
      const txt = p.text.replace(/```json\s*|```/g, '');
      try {
        return JSON.parse(txt);                  // success
      } catch { /* fall through */ }

      // fallback – grab first {...} block inside the string
      const m = txt.match(/\\{[\\s\\S]*\\}/);
      if (m) {
        try { return JSON.parse(m); } catch {/* ignore */ }
      }
    }
  }
  console.error('parseAdkJson: no JSON found');
  return null;
}
};
