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
      const xpathSegments = [];

      // Iterate through ancestors
      for (; element && element.nodeType === Node.ELEMENT_NODE; element = element.parentNode) {
        let xpathSegment = element.tagName.toLowerCase();

        if (element.hasAttribute('id')) {
          // Use the element ID if available
          xpathSegment += `[@id="${element.getAttribute('id')}"]`;
          xpathSegments.unshift(xpathSegment);
          break;
        } else {
          // Generate XPath index
          let index = 1;
          let sibling = element.previousSibling;

          while (sibling) {
            if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName.toLowerCase() === element.tagName.toLowerCase()) {
              index++;
            }
            sibling = sibling.previousSibling;
          }

          if (index > 1) {
            xpathSegment += `[${index}]`;
          }

          xpathSegments.unshift(xpathSegment);
        }
      }

      return xpathSegments.length ? `//${xpathSegments.join('/')}` : null;

    }

    const findSimilarElements = (xpath, classes) => {

      const allElements = document.getElementsByTagName("*");
      const similarElements = [];

      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];

        const elementXpath = getXPath(element);
        if (elementXpath.endsWith(xpath)) {
          if (classes != '') {
            if (element.className == classes) {
              element.style.border = '2px solid blue'
              similarElements.push(element);
            }
          } else {
            similarElements.push(element);
          }
        }
      }
      return similarElements;
    }

    const LastXpath = (childXPath) => {
      console.log({childXPath});
      var allElements = childXPath.split('/').reverse();
      // var lastElement = allElements.shift()
      var parentIndex = allElements.findIndex((e,i) => {
        console.log(i);
        if(i > 0){
          return e.indexOf('[') > -1
        }else{
          return false
        }
      })
      console.log(parentIndex);
      if (parentIndex > 0) {
        allElements = allElements.splice(0, parentIndex)
        var finalXpath = allElements.reverse().join('/');
        console.log({finalXpath});
        // console.log(getElementByXPath(finalXpath));
        return finalXpath;
      }
    }

    const selected = window.document.getSelection();

    const xPathToEl = getXPath(selected.anchorNode.parentElement);

    console.log(findSimilarElements(LastXpath(xPathToEl), selected.anchorNode.parentElement.className));
    const toBeReturn = {
      parent: selected.anchorNode.parentElement,
      xPath: xPathToEl,
    };
    console.log(toBeReturn);
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
