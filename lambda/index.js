
// Testing Git Push
// WIDGET LIST https://developer.amazon.com/alexa/console/ask/displays/widget/amzn1.ask.skill.dea26132-6b6e-4c07-9649-7d7c687aa5c2/dashboard#/listing
const Alexa = require("ask-sdk-core");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "HODL Baby!";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const InstallWidgetRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "Alexa.DataStore.PackageManager.InstallRequest" &&
      handlerInput.requestEnvelope.request.packageId !== null
    );
  },
  handle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      const skillId = handlerInput.requestEnvelope.context.System.application.applicationId;
      const version = request.version;
      console.log("===RequestID: " + request.requestId);
      console.log("===InstallRequest Received for packageId: " + request.packageId);
      console.log("===InstanceId of the installRequest: " + request.instances[0].id);
      console.log("===Install Request Event===\n" + JSON.stringify(request));
      const response = handlerInput.responseBuilder
        .addDirective({
            "type": "Alexa.DataStore.PackageManager.InstallPackage",
            "dataStorePackage": {
                "packageVersion": "1.1", // Use 1.0 for package manifest 1.0 and 1.1 for manifest version 1.1
                "packageType": "WIDGET",
                "manifest": {
                    "type": "Link",
                    "src": `package://alexa/datastore/packages/${request.packageId}/manifest.json`
                },
                "content": {
                    "document": {
                        "type": "Link",
                        "src": `package://alexa/datastore/packages/${request.packageId}/document.json`
                    },
                    "datasources": {
                        "type": "Link",
                        "src": `package://alexa/datastore/packages/${request.packageId}/datasources/default.json`
                    }
                }
            }
        })
        .getResponse();

      console.log(
        "===InstallPackage Response for Install Request===\n" +
          JSON.stringify(response)
      );

      return response;
  },
};

const RemoveWidgetRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "Alexa.DataStore.PackageManager.PackageRemoved" &&
      handlerInput.requestEnvelope.request.packageId === "price"
    );
  },
  handle(handlerInput) {
      console.log("REMOVING WIDGET");
    //   const speakOutput = "You're killing me smalls!";

        return (
          handlerInput.responseBuilder
            // .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse()
        );
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Hello World!";

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "You can say hello to me! How can I help?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Goodbye!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const RequestInterceptor = {
    process(handlerInput) {
    console.log("=== INCOMING STKILL REQUEST: " + JSON.stringify(handlerInput.requestEnvelope));
    return;
}

};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Sorry, I don't know about that. Please try again.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Sorry, I had trouble doing what you asked. Please try again.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    InstallWidgetRequestHandler,
    RemoveWidgetRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(RequestInterceptor)
  .lambda();
