import JsonToTS from "json-to-ts"
import React, { useEffect, useState } from "react"
import Button from "../components/button/Button"
import useDebounce from "../hooks/useDebounce"
import Head from 'next/head'
import { isJson } from "../helpers/json"
import useLocalStorage from "../hooks/useLocalStorage"

const exampleJson = {
  "data": {
    "id": 1001,
    "image": null,
    "title": "Blazer Jacket",
    "description": "New Test Product 1001 Description en",
  },
  "message": "Product Detail Returned Successfully",
  "status": "1"
}

export default function Home() {

  const [json, setJson] = useState<string>('')
  const [interfaces, setIntefaces] = useState<string[]>([])
  const { storedValue: localJson, setStorageValue: setLocalJson } = useLocalStorage('last-json', '')

  const debounceJson = useDebounce(json, 500)

  const loading = json !== debounceJson

  useEffect(() => {
    generateInterfaces()
    if (isJson(debounceJson)) {
      setLocalJson
    }
  }, [debounceJson])

  useEffect(() => {

    let clipboard = '';
    navigator.clipboard.readText().then(
      clipBoardData => {
        clipboard = clipBoardData
      }
    ).catch(e => alert(e));
    if (isJson(clipboard)) {
      console.log('into clipboard');

      setJson(clipboard)
      return
    }

    if (localJson) {
      console.log('into localJson');
      setJson(localJson)
      return
    }

  }, [])

  function generateInterfaces() {
    if (!json.length) {
      setIntefaces(['Paste JSON']);
      return
    }
    try {
      const data = JSON.parse(json)
      let object: string[] = [];
      JsonToTS(data).forEach(typeInterface => {
        object.push(typeInterface)
      })
      setIntefaces(object)
      setLocalJson(json)
    } catch (e) {
      setIntefaces(['Enter Valid JSON']);
    }
  }

  function getClipboardAndPaste() {
    navigator.clipboard.readText().then(
      clipBoardData => {
        setJson(clipBoardData)
      }
    ).catch(e => alert(e));
  }

  return (
    <div className="bg-black">
      <Head>
        <title>JSON 2 TS</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
        <meta property="og:url" content="https://json2ts.vercel.app/" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="Generate Typescript Interfaces from JSON" />
        <meta property="og:image" content="https://json2ts.vercel.app/twitter-large-card.jpg" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <section className="p-6">
          <textarea
            name="json"
            id="json"
            placeholder={'JSON'}
            className="bg-black text-white border border-gray-700 rounded w-full h-96 hide-scrollbar pl-4 py-4 outline-none focus:border-gray-600"
            onChange={(ev) => {
              setJson(ev.target.value)
            }}
            autoCorrect="off"
            value={json}
          >{json}</textarea>
          <div className="grid gap-2 mt-4">
            <Button
              onClick={() => generateInterfaces()}
            >
              Generate
            </Button>
            <Button
              onClick={() => getClipboardAndPaste()}
            >
              Paste from Clipboard
            </Button>
            <Button
              onClick={async () => {
                const data = document.getElementById('code-interfaces')?.innerText
                if (data) {
                  await navigator.clipboard.writeText(data ?? '').then(function () {
                    console.log('Copied Success');
                  }, function (err) {
                    alert(err)
                  });
                }
              }}
            >
              Copy Interfaces
            </Button>
          </div>
        </section>
        <section>
          <div className="whitespace-pre p-6 lg:h-screen overflow-y-auto text-gray-200">
            {
              loading &&
              // @ts-ignore
              <code>{`Loading... \n\n`}</code>
            }
            {!(loading) && interfaces.join('\n\n')}
          </div>
        </section>
      </div>
    </div>
  )
}
