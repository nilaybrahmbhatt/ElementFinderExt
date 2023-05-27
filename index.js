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

    const findSimilarElements = (xpath, seletcedNode, childXpath) => {
      const classes = seletcedNode.className
      const allElements = document.getElementsByTagName("*");
      const similarElements = [];
      console.log(childXpath);
      for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i];
        const elementXpath = getXPath(element);
        if (elementXpath.startsWith(xpath) && elementXpath.endsWith(childXpath)) {
          console.log(elementXpath);
          if (element.className == classes) {
            element.style.border = '2px solid blue'
            similarElements.push(element);
          }
        }
      }
      return similarElements;
    }

    const LastXpath = (childXPath) => {
      var allElements = childXPath.split('/').reverse();
      var childPath = ''
      //check the path has table 
      if (allElements.findIndex((e, i) => {
        console.log(e);
        console.log(e.indexOf('td'));
        return e.indexOf('td') > -1
      }) > -1) {
        // console.log('table is here');
        var childPath = allElements.splice(0, allElements.findIndex((e, i) => {
          return e.indexOf('td') > -1
        }) + 1).join('/');
        console.log({ childPath });
        var parentIndex = allElements.findIndex((e, i) => {
          // console.log(i);
          if (i > 0) {
            return e.indexOf('table') > -1
          } else {
            return false
          }
        })

      } else {
        // var lastElement = allElements.shift()
        var parentIndex = allElements.findIndex((e, i) => {
          // console.log(i);
          if (i > 0) {
            return e.indexOf('[') > -1
          } else {
            return false
          }
        })

      }
      if (parentIndex > 0) {
        allElements = allElements.splice(parentIndex)
        var finalXpath = allElements.reverse().join('/');
        return { finalXpath, childPath };
      }
    }

    const selected = window.document.getSelection();
    const xPathToEl = getXPath(selected.anchorNode.parentElement);
    const parentElementXpath = LastXpath(xPathToEl);
    console.log(findSimilarElements(parentElementXpath.finalXpath, selected.anchorNode.parentElement, parentElementXpath.childPath));
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
