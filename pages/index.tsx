import JsonToTS from "json-to-ts"
import React, { useEffect, useState } from "react"
import Button from "../components/button/Button"
import useDebounce from "../hooks/useDebounce"

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
  const [invalidJson, setInvalidJson] = useState(false)
  const [interfaces, setIntefaces] = useState<string[]>([])

  const debounceJson = useDebounce(json, 500)

  const loading = json !== debounceJson

  useEffect(() => {
    generateInterfaces()
  }, [debounceJson])

  useEffect(() => {
    document.addEventListener('keypress', function (ev) {
      console.log(ev.key);
    })
  }, [])

  function generateInterfaces() {
    if (!json.length) {
      setIntefaces(['Invalid JSON']);
      setInvalidJson(true)
      return
    }
    try {
      const data = JSON.parse(json)
      let object: string[] = [];
      JsonToTS(data).forEach(typeInterface => {
        object.push(typeInterface)
      })
      setIntefaces(object)
      setInvalidJson(false)
    } catch (e) {
      setIntefaces(['Invalid JSON']);
      setInvalidJson(true)
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
              onClick={() => {
                const data = document.getElementById('code-interfaces')?.innerText
                if (data) {
                  navigator.clipboard.writeText(data ?? '').then(function () {
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
          <div className="whitespace-pre p-6 h-screen overflow-y-auto text-gray-200 font-mono">
            {
              loading &&
              <code>{`Loading... \n\n`}</code>
            }
            {
              !(loading) && interfaces.map(obj => {
                return `${obj}\n\n`
              })
            }
          </div>
        </section>
      </div>
    </div>
  )
}
