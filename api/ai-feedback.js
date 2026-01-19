export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userCode, language = "python" } = req.body || {};
    const HF_TOKEN = process.env.HF_TOKEN || process.env.VITE_HF_TOKEN;

    if (!HF_TOKEN) {
      console.error("No Hugging Face token set");
      return res.status(500).json({ error: 'Hugging Face token not set' });
    }

    if (!userCode) {
      console.error("No userCode provided");
      return res.status(400).json({ error: 'No code provided' });
    }

    const url = "https://router.huggingface.co/models/bigcode/starcoder";
    const prompt = `Give simple feedback about this ${language} code:\n${userCode}`;

    const hfRes = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 128 }
      })
    });

    const text = await hfRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Hugging Face response:", text);
      return res.status(500).json({ error: "Invalid response from Hugging Face" });
    }

    if (!hfRes.ok) {
      console.error("Hugging Face API error:", data);
      return res.status(hfRes.status).json({ error: data.error || "Hugging Face API error" });
    }

    return res.status(200).json({ feedback: data[0]?.generated_text || "No feedback received." });
  } catch (err) {
    console.error("API route error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
