const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const { service, link, quantity, email } = JSON.parse(event.body);

  if (!service || !link || !quantity || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  const API_KEY = process.env.OWLET_API_KEY;
  const response = await fetch("https://therealowlet.com/api/v2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: API_KEY,
      action: "add",
      service: service,
      link: link,
      quantity: quantity
    }),
  });

  const data = await response.json();

  if (data.error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API Error", details: data }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ order: data.order }),
  };
};
