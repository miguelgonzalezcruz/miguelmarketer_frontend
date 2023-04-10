const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// const OPENAI_API_KEY="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";

const openai = new OpenAIApi(configuration);

const translateContent = async (req, res, next) => {
  const { prompt } = req.body;

  //   console.log(`Prompt: ${prompt}`);
  //   console.log(`API key: ${process.env.OPENAI_API_KEY}`);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Traduce esto a un idioma raro y dime en el nombre del idioma en que lo has traducido: \n\n${prompt}\n\n  Dame una única respuesta`,
      // prompt: `Translate this to a random rare language and tell me which language it is: \n\n${prompt}\n\n1. Answer in Spanish and give me only one response`,
      temperature: 0.3,
      // maxTokens: 1000,
      // topP: 1.0,
      // frequency_penalty: 0.0,
      // presence_penalty: 0.0,
      // stop: ["\n"],
    });

    res.status(200).send({
      translation: response.data.choices[0].text,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { translateContent };
