import Twilio from "twilio";
import { env } from "~/env";

export const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
export const VoiceResponse = Twilio.twiml.VoiceResponse;
