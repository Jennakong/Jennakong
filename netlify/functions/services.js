exports.handler = async function(event, context) {
  const response = await fetch("https://therealowlet.com/api/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key: "8b341d5b972319f2d6a347b3716d7f75", // your Owlet API key
      action: "services"
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
