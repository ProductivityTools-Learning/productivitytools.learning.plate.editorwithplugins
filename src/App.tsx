import React, { ReactElement, useState, useRef } from "react";
import { PTPlate } from "./Components/PTPlate";
import { MyParagraphElement, MyValue } from "./Components/PTPlate/typescript/plateTypes";

const initialValue = (content: string) => [
  {
    type: "p",
    children: [
      {
        text: content,
      },
    ],
  } as MyParagraphElement,
];

function App() {
  // const [content, setContent] = useState<string>("[{\"type\":\"title\",\"children\":[{\"text\":\"SWE Salary Zurich L7\"}]},{\"type\":\"paragraph\",\"children\":[{\"text\":\"The US base salary range for this full-time position is $218,000-$326,000 + bonus + equity + benefits. Transfer compensation is determined algorithmically and is non-negotiable. Your recruiter will share more about the specific salary for your targeted location during the hiring process\"}]}]");
  const [content, setContent] = useState<MyParagraphElement[]>(
    JSON.parse(
      '[{"type":"title","children":[{"text":"121"}]},{"type":"unorderedList","children":[{"type":"list-item","children":[{"text":""},{"type":"link","href":"https://cloud.google.com/blog/topics/developers-practitioners/troubleshooting-cloud-functions-connection-issues-cloud-sql-private-ips/","children":[{"text":"Blog "}]},{"text":"opublikowany"}]},{"type":"list-item","children":[{"text":""},{"type":"link","href":"https://www.youtube.com/watch?time_continue=9&v=eSP4Y9fDDkQ&feature=emb_logo&themeRefresh=1","children":[{"text":"Youtube "}]},{"text":"opublikowane"}]},{"type":"list-item","children":[{"text":"Przeprowadziła się do nowego domu, "}]},{"type":"list-item","children":[{"text":"Nie wie jak będzie się komunikować"}]}]}]'
    )
  );
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const setRawContent = (value: string) => {
    let x: MyParagraphElement[] = initialValue(value);
    setContent(x);
  };

  const [changedContent, setChangedContent] = useState<MyParagraphElement[]>(initialValue("emppty"));
  const contentChanged = (e: MyParagraphElement[]) => {
    setChangedContent(e);
  };

  return (
    <div className="App">
      hello
      <input type="text" onChange={(x) => setRawContent(x.target.value)}></input>
      <button onClick={() => setReadOnly(!readOnly)}>Switch readonly</button>
      <br></br>
      raw content:{JSON.stringify(content)}
      <br></br> <br></br> <br></br> <br></br>
      <span>plate2:</span>
      <PTPlate content={content} forceResetContent={content} contentChanged={contentChanged} readOnly={readOnly}></PTPlate>
      changed content (in the app.tsx):{JSON.stringify(changedContent)}
    </div>
  );
}

export default App;
