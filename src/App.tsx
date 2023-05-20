import { useState } from "react";
import "./App.css";

function App() {
  const [ director, setDirector ] = useState({
    name: "",
    position: ""
  });

  // const [ location, setLocation ] = useState({
  //   name: {
  //     className: "",
  //     id: ""
  //   },
  //   position: {
  //     className: "",
  //     id: ""
  //   },
  // });

  // const [ name, setName ] = useState([]);
  // const [ position, setPosition ] = useState([]);

  console.log("extension");
  const handleUseName = async () => {
    // console.log("click");
    const [ tab ]: any = await window.chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    let result: string;
    try {
      [ { result } ] = await (window as any).chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
          const nameElement = window.getSelection();
          const nameString = await (nameElement as any)?.anchorNode?.parentElement?.textContent();
          const nameClass = await nameElement?.anchorNode?.parentElement?.getAttribute("class");
          const nameId = await nameElement?.anchorNode?.parentElement?.getAttribute("id");

          // setLocation((prev) => ({
          //   ...prev,
          //   name: {
          //     className: nameClass || "",
          //     id: nameId || ""
          //   }
          // }))
          console.log("name string: ", nameString);
          console.log("name element: ", nameElement?.toString());
          console.log("name class: ", nameClass);
          console.log("name Id: ", nameId);
          console.log("name : ", nameElement);
          return nameString;
        },
      });
      setDirector((prev) => ({
        ...prev,
        name: result
      }));
    } catch (e) {
      console.log("error:", e);
      return; // ignoring an unsupported page like chrome://extensions
    }
    console.log("rel n - ");
  };

  // const handleUsePosition = async () => {
  //   console.log("click");
  //   const [ tab ]: any = await window.chrome.tabs.query({
  //     active: true,
  //     currentWindow: true,
  //   });
  //   let result: Selection;
  //   try {
  //     [ { result } ] = await (window as any).chrome.scripting.executeScript({
  //       target: { tabId: tab.id },
  //       function: () => {
  //         const positionElement = window.getSelection();
  //         const positionClass = positionElement?.anchorNode?.parentElement?.getAttribute("class");
  //         const positionId = positionElement?.anchorNode?.parentElement?.getAttribute("id");

  //         setLocation((prev) => ({
  //           ...prev,
  //           name: {
  //             className: positionClass || "",
  //             id: positionId || ""
  //           }
  //         }))

  //         console.log("position element: ", positionElement?.toString());
  //         console.log("position : ", positionElement);

  //         return positionElement;
  //         // console.log(
  //         //   "result: ",
  //         //   string?.anchorNode?.parentElement
  //         //     ?.getAttributeNames()
  //         //     .map((el) => ({
  //         //       [ el ]: string?.anchorNode?.parentElement?.getAttribute(el),
  //         //     }))
  //         // );
  //       },
  //     });
  //     document.body.append(
  //       "Selection: ", JSON.stringify(result)
  //     );
  //     setDirector((prev) => ({
  //       ...prev,
  //       position: result.toString()
  //     }));
  //     console.log("rel p - ", result);
  //   } catch (e) {
  //     console.log("error:", e);
  //     return; // ignoring an unsupported page like chrome://extensions
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}>
      <div className="card">
        <button onClick={() => handleUseName()}>Get Name</button>
        {/* <button onClick={() => handleUsePosition()}>Get Position</button> */}
      </div>
      {director.name && <p className="read-the-docs">{director.name}</p>}
      {/* {director.position && <p className="read-the-docs">{director.position}</p>} */}
      {/* {director.position && <p className="read-the-docs">{JSON.stringify({ location }, null, '\t')}</p>} */}
      <p className="read-the-docs">Click on button to get the selected text</p>
    </div>
  );
}

export default App;
