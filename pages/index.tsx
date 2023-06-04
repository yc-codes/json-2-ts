import {
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  ClipboardListIcon,
  CodeIcon,
} from "@heroicons/react/outline";
import JsonToTS from "json-to-ts";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import { isJson } from "../helpers/json";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "../theme/github-dark";

export default function Home() {
  const [json, setJson] = useState<string>("");
  const [interfaces, setIntefaces] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [rootObjectName, setRootObjectName] = useState("");
  const { storedValue: localJson, setStorageValue: setLocalJson } =
    useLocalStorage("last-json", "");
  const { storedValue: localRootObject, setStorageValue: setLocalRootObject } =
    useLocalStorage("root-oject-name", "");

  const debounceJson = useDebounce(json, 500);

  const loading = json !== debounceJson;

  useEffect(() => {
    if (!copied) {
      return;
    }
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => {};
  }, [copied]);

  useEffect(() => {
    generateInterfaces();
    if (isJson(debounceJson)) {
      setLocalJson(debounceJson);
    }
  }, [debounceJson, rootObjectName]);

  useEffect(() => {
    let clipboard = "";
    if (navigator.clipboard && document.hasFocus()) {
      navigator.clipboard
        .readText()
        .then((clipBoardData) => {
          clipboard = clipBoardData;
        })
        .catch((e) => alert(e));
    }
    if (isJson(clipboard)) {
      console.log("into clipboard");

      setJson(clipboard);
      return;
    }

    if (localJson) {
      console.log("into localJson");
      setJson(localJson);
      return;
    }
  }, []);

  function generateInterfaces() {
    if (!json.length) {
      setIntefaces(["Paste JSON"]);
      return;
    }
    try {
      const data = JSON.parse(json);
      let object: string[] = [];
      JsonToTS(data, {
        rootName: rootObjectName.length ? rootObjectName : "RootObject",
      }).forEach((typeInterface) => {
        object.push(typeInterface);
      });
      setIntefaces(object);
      setLocalJson(json);
    } catch (e) {
      setIntefaces(["Enter Valid JSON"]);
    }
  }

  function getClipboardAndPaste() {
    if (!navigator.clipboard && !document.hasFocus()) {
      return;
    }
    navigator.clipboard
      .readText()
      .then((clipBoardData) => {
        setJson(clipBoardData);
      })
      .catch((e) => alert(e));
  }

  return (
    <div className="bg-black">
      <Head>
        <title>JSON 2 TS</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <meta property="og:url" content="https://json2ts.vercel.app/" />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content="Generate Typescript Interfaces from JSON"
        />
        <meta
          property="og:image"
          content="https://json2ts.vercel.app/twitter-large-card.jpg"
        />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <section className="p-6 grid grid-cols-1 gap-4 place-content-start">
          <textarea
            name="json"
            id="json"
            placeholder={"JSON"}
            className="bg-black text-white border border-gray-700 rounded w-full h-96 hide-scrollbar pl-4 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={(ev) => {
              setJson(ev.target.value);
            }}
            autoCorrect="off"
            value={json}
          >
            {json}
          </textarea>
          <input
            className="bg-black text-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border-gray-700 rounded w-full hide-scrollbar pl-4 py-2 outline-none"
            type="text"
            name="root"
            id="rootObject"
            value={rootObjectName}
            onChange={(e) => {
              setRootObjectName(e.target.value);
            }}
            placeholder="Root Interface Name"
          />
          <div className="flex space-y-4 flex-col items-start">
            <Button onClick={() => getClipboardAndPaste()}>
              <div className="flex space-x-2 items-center">
                <p>Paste from Clipboard</p>
                <ClipboardCopyIcon className="h-5" />
              </div>
            </Button>
            <Button
              onClick={async () => {
                const data =
                  document.getElementById("code-interfaces")?.innerText;
                if (data) {
                  if (!navigator.clipboard && !document.hasFocus()) {
                    return;
                  }
                  await navigator.clipboard.writeText(data ?? "").then(
                    function () {
                      setCopied(true);
                      console.log("Copied Success");
                    },
                    function (err) {
                      alert(err);
                    }
                  );
                }
              }}
            >
              <div className="flex space-x-2 items-center">
                <p>Copy Interfaces</p>
                {copied ? (
                  <ClipboardCheckIcon className="h-5" />
                ) : (
                  <ClipboardListIcon className="h-5" />
                )}
              </div>
            </Button>
          </div>
          <div className="py-2" />
          <p className="text-gray-400">
            Handcrafted with <span className="text-red-500">&#9829;</span> by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 underline"
              href="https://twitter.com/yc_codes"
            >
              Yash Chauhan
            </a>
          </p>
          <div className="">
            <Button
              onClick={() => {
                const githubLink = "https://github.com/yc-codes/json-2-ts";
                window.open(githubLink);
              }}
            >
              <div className="flex space-x-2 items-center">
                <p>Star on GitHub</p>
                <CodeIcon className="h-5" />
              </div>
            </Button>
          </div>
        </section>
        <section>
          <div className="whitespace-pre p-6 lg:h-screen overflow-y-auto text-gray-200">
            <Highlight
              {...defaultProps}
              theme={theme}
              code={
                loading
                  ? `// Loading... \n\n`
                  : interfaces
                      .map((int) => "export " + int)
                      .join("\n\n")
                      .trim()
              }
              language="typescript"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })} key={i}>
                      <div className="text-gray-700 select-none w-8 pr-3 inline-block text-right">
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
            <code id="code-interfaces" className="hidden">
              {loading
                ? `Loading... \n\n`
                : interfaces
                    .map((int) => "export " + int)
                    .join("\n\n")
                    .trim()}
            </code>
          </div>
        </section>
      </div>
    </div>
  );
}
