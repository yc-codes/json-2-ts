import { Highlight } from "prism-react-renderer";
import theme from "@theme/github-dark";

import { FC } from "react";

interface HighLighterProps {
  code: string;
}

const HighLighter: FC<HighLighterProps> = ({ code }) => {
  return (
    <Highlight theme={theme} code={code} language="typescript">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              <div key={i} className="text-gray-700 select-none w-8 pr-3 inline-block text-right">
                {i + 1}
              </div>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default HighLighter;
