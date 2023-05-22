const nameBtn = document.getElementById("nameBtn");
const positionBtn = document.getElementById("positionBtn");

const getSelectedText = async () => {
  try {
    let selected = window.document.getSelection();
    const getCommonElements = () => {
      let attributeNames = {};
      // Will add all the attributes to ${attributeNames} object
      selected.anchorNode.parentElement
        .getAttributeNames()
        .forEach(
          (el) =>
            (attributeNames[el] =
              selected.anchorNode.parentElement.getAttribute(el))
        );
        // 
      if (attributeNames.class) {
        console.log(
          "calssname elements",
          document.querySelectorAll(`.${attributeNames.class.split(" ")[0]}`)
        );
      }
    };
    getCommonElements();
    return selected.anchorNode.parentElement;
  } catch (error) {
    console.log("error - ", error);
  }
};

nameBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("tabs - ", tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: getSelectedText,
    },
    async (injectionResult) => {
      console.log("is working ? - ", injectionResult);
    }
  );
});
