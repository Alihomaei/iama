const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal auth failed: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function createPayPalOrder(params: {
  amount: number; // in cents
  currency?: string;
  description: string;
  referenceId: string;
}): Promise<{ id: string; approvalUrl: string }> {
  const accessToken = await getAccessToken();
  const amountInDollars = (params.amount / 100).toFixed(2);

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: params.referenceId,
          description: params.description,
          amount: {
            currency_code: params.currency?.toUpperCase() || "USD",
            value: amountInDollars,
          },
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paypal/capture-order`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancelled`,
        brand_name: "IAMA",
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal create order failed: ${response.status} ${errorBody}`);
  }

  const order = await response.json();
  const approvalLink = order.links.find(
    (link: { rel: string; href: string }) => link.rel === "approve"
  );

  if (!approvalLink) {
    throw new Error("PayPal approval URL not found in response");
  }

  return {
    id: order.id,
    approvalUrl: approvalLink.href,
  };
}

export async function capturePayPalOrder(orderId: string): Promise<{
  id: string;
  status: string;
  captureId: string;
  amount: string;
  currency: string;
}> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`PayPal capture failed: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  const capture = data.purchase_units[0].payments.captures[0];

  return {
    id: data.id,
    status: data.status,
    captureId: capture.id,
    amount: capture.amount.value,
    currency: capture.amount.currency_code,
  };
}
