const nameBtn = document.getElementById("nameBtn");
const positionBtn = document.getElementById("positionBtn");

const getSelectedText = async () => {
  try {
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
          "classname elements",
          document.querySelectorAll(`.${attributeNames.class.split(" ")[0]}`)
        );

        return document.querySelectorAll(
          `.${attributeNames.class.split(" ")[0]}`
        );
      }
    };

    //below function takes a elment and returns xPath-string
    const getXPath = (element) => {
      if (element.id !== "") return 'id["' + element.id + '"]';
      if (element === document.body) return element.tagName;

      let ix = 0;
      let siblings = element.parentNode.childNodes;
      for (let i = 0; i < siblings.length; i++) {
        let sibling = siblings[i];
        if (sibling === element)
          return (
            getXPath(element.parentNode) +
            "/" +
            element.tagName +
            "[" +
            (ix + 1) +
            "]"
          );
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
      }
    };

    const selected = window.document.getSelection();
    const xPathToEl = getPathTo(selected.anchorNode.parentElement);

    const toBeReturn = {
      parent: selected.anchorNode.parentElement,
      xPath: xPathToEl,
    };

    return toBeReturn;
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
