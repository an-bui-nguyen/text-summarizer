const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const summaryMaxLength = document.getElementById('max_length');
const summaryMinLength = document.getElementById('min_length');
const length = document.getElementById('content-length-display')

length.innerText = 'Content Length: 0/100,000';
console.log(textArea)

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;
  const text_length = textArea.value.length;

  length.innerText = `Content Length: ${text_length}/100,000`;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function verifySummaryLength(e) {
  const min_length = parseInt(summaryMinLength.value);
  const max_length = parseInt(summaryMaxLength.value);
  if (max_length < min_length) {
    summaryMaxLength.value = min_length;
  }

  if (min_length > textArea.value.length) {
    summaryMinLength.value = textArea.value.length;
  }
}

function submitData(e) {
  // Get the value of the textarea
  const text_to_summarize = textArea.value;
  const min_length = summaryMinLength.value;
  const max_length = summaryMaxLength.value;

  verifySummaryLength(e)

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize,
    min_length,
    max_length
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Make a POST request to the '/summarize' endpoint
  fetch('/summarize', requestOptions)
    .then((response) => response.text())
    .then((summary) => {
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch((error) => {
      console.log(error);
    });
};