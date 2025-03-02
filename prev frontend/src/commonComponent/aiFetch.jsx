const apiKey = 'your-openai-api-key'; // Replace with your OpenAI API key

async function sendMessageToOpenAI(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // You can use gpt-4 if you have access
            messages: [{ role: 'user', content: message }],
        }),
    });

    if (response.status === 429) {
        console.log("Rate limit exceeded (429). Please try again later.");
        return false;
    }

    const data = await response.json();
    return data;
}

export async function getAIReply(text, setReply, setLoading) {
    if (!setLoading) {
        setLoading = (daa) => {
            return;
        };
    }
    if (!setReply) {
        setReply = (daa) => {
            return;
        }
    }
    setLoading(true);

    // Message to request conversion to emoji
    const message = `Please convert the following text to emoji format: "${text}". Use emojis only and leave a question mark emoji for unknown words.`;
    const data = await sendMessageToOpenAI(message);
    console.log("API response data:", data);

    if (data) {
        // Handle response data to extract the emoji conversion
        const reply = data.choices && data.choices[0] && data.choices[0].message.content;
        if (reply) {
            console.log('Emoji response from OpenAI:', reply);
            setReply(reply); // Update the state with the emoji response
        } else {
            alert('No response from the model.');
        }
    } else {
        alert("Rate limit error (429). Please try again after some time.");
    }

    setLoading(false);
}
