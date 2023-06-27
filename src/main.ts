import { Configuration, OpenAIApi, ChatCompletionResponseMessageRoleEnum, ChatCompletionRequestMessageRoleEnum } from  "openai";
const KEY = "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"
export default async function () {
  figma.on("run", async ({command, parameters}) => {
    const instruction = parameters!.instruction
    const prompt = `Please write figma plugin API code for the command at the end of the prompt.  Only use valid syntax from the figma plugin api documentation.  Run the code immediately don't wrap it in any handlers.  Only respond with the actual javascript code, do not add any explanations.  We don't need to use a UI, just the code that actually executes the command.  \n\n The command is "${instruction}"`
    console.log("Command", {command, instruction, prompt})
    try {
     const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${KEY}`
        },
        body: JSON.stringify({model: 'gpt-4', messages: [{
          role: 'user', 'content': prompt
        }]})
      }).then(r => r.json())
    console.log(res.choices[0].message?.content)
    eval(res.choices[0].message?.content!)
    figma.closePlugin()
  } catch (e) {
    console.error("FAIL", e)
  }
  })
}
