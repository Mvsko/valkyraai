const axios = require('axios');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const url = `https://api.edenai.run/v2/workflow/${config.workflowId}/execution/`;
const headers = {
    "Content-Type": "application/json",
    "Authorization": config.authorization
};

const checkStatus = async (userMessage) => {
    try {
        const postResponse = await axios.post(url, { text: userMessage }, { headers });
        const executionId = postResponse.data.id;
        const uriStatus = `https://api.edenai.run/v2/workflow/${config.workflowId}/execution/${executionId}`;
        
        let statusResponse;
        while (true) {
            statusResponse = await axios.get(uriStatus, { headers });
            if (statusResponse.data.content.status === 'running') {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                break;
            }
        }

        const id = statusResponse.data.id;
        const results = statusResponse.data.content.results;
        
        let generatedText = "none";
        let status = "none";
        let provider = "none";
        let cost = "none";

        if (results && results.text__code_generation && results.text__code_generation.results.length > 0) {
            const outputData = results.output;
            generatedText = outputData.results[0].generated_text || "none";
            status = outputData.results[0].status || "none";
            provider = outputData.results[0].provider || "none";
            cost = outputData.results[0].cost || "none";
        }

        return { id, generatedText, status, provider, cost };
    } catch (error) {
        console.error("Error during execution or fetching status:", error);
        return { id: "none", generatedText: "none", status: "none", provider: "none", cost: "none" };
    }
};

module.exports = { checkStatus };
