import { NextApiResponse, NextApiRequest } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";

async function buffer(readle: Readable) {
  const chunks = [];

  for await (const chunk of readle) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false, // desabiltando o entendimento padrão do Next
  },
};

const relevantEvents = new Set([
  'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    const {type} = event

    if (!relevantEvents.has(type)){
      console.log('Evento Recebido', event);
      
      // fazer algo
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "Post");
    res.status(405).end("Method not allowed");
  }
};
