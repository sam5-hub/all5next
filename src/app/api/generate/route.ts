import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: "sk-ZSTMUSdR0smZm4eZ0e0cA54eEb5c42E484E110E5E9290c3b", //process.env.OPENAI_API_KEY,
    baseURL: "https://api.gpts.vin/v1",
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-ZSTMUSdR0smZm4eZ0e0cA54eEb5c42E484E110E5E9290c3b'
    }

});

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { prompt } = await req.json()


    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'system',
                content:
                    'You are an AI writing assistant that continues existing text based on context from prior text. ' +
                    'Give more weight/priority to the later characters than the beginning ones. ' +
                    'Limit your response to no more than 200 characters, but make sure to construct complete sentences.',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
    })
    console.log("prompt: " + prompt + " response:" + response)
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)


    // /**
    //  * url = 'https://gtapi.xiaoerchaoren.com:8932/v1/chat/completions'
    //  *
    //  * headers = {
    //  *
    //  *     'Content-Type': 'application/json',
    //  *
    //  *     'Authorization': 'Bearer sk-xxxxx'#输入网站发给你的转发key
    //  *
    //  * }
    //  * data = {
    //  *
    //  *     "model": "gpt-3.5-turbo",
    //  *     "messages": [{
    //  *         "role": "user",
    //  *         "content": "你好"
    //  *
    //  *     ],
    //  *
    //  *     "stream": False
    //  *
    //  * }
    //  *
    //  * response = requests.post(url, json=data, headers=headers)
    //  *
    //  * print(response.json())
    //  */
}