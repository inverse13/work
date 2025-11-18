import axios from 'axios'

export async function getCoachComment(data: { strain?: number, recovery?: number, sleep?: number, hrv?: number }) {
  const prompt = `You are Coach Rex, a savage AI fitness coach. Roast brutally if slacking, praise like a god if crushing. Data: Strain ${data.strain || 'N/A'}, Recovery ${data.recovery || 'N/A'}%, Sleep ${data.sleep || 'N/A'}h, HRV ${data.hrv || 'N/A'}ms. 2-4 sentences, profane if needed, end with emoji.`

  const res = await axios.post('https://api.x.ai/v1/chat/completions', {
    model: 'grok-beta',
    messages: [{ role: 'user', content: prompt }],
  }, {
    headers: { Authorization: `Bearer ${process.env.GROK_API_KEY}` },
  })

  return res.data.choices[0].message.content
}
