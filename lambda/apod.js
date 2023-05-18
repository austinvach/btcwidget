const LaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log("LaunchRequestHandler Can Handle")
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'APODIntent';
    },
    async handle(handlerInput) {
        var speakOutput = 'Welcome to Space';
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        const response = await getJSON(url);
        const datasource = {
            "apod": {
                "img": response.url,
                "title": response.title,
                "properties": {
                    "exp": response.explanation
                },
                "transformers": [
                    {
                        "inputPath": "exp",
                        "outputName": "expSpeech",
                        "transformer": "textToSpeech"
                    }
                ]
            }
        };
        
        // Check if the user's device supports APL. If yes, send an APL response.
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            // Add the RenderDocument directive to the response
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: {
                    src: 'doc://alexa/apl/documents/launch',
                    type: 'Link'
                },
                datasources: datasource
            });
        } else {
            speakOutput = 'This skill shows images from NASA but your current device can\'t display them. Try launching this skill on a device with a screen.';
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};