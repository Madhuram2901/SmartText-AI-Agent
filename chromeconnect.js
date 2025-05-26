fetch("http://localhost:5000/convert-tone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: selectedText,
      tone: selectedTone
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.result) {
      console.log("Rewritten text:", data.result);
    }
  });
  