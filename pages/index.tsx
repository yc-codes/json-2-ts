import JsonToTS from "json-to-ts"
import { useEffect, useState } from "react"
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

  function generateInterfaces() {
    if (!json) {
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


  return (
    <div className="">
      <div className="grid grid-cols-2">
        <section className="sticky top-0 pt-6 pl-6">
          <textarea
            name="json"
            id="json"
            placeholder={'JSON'}
            className="bg-gray-50 border rounded-md w-full h-96 hide-scrollbar pl-4 py-4 outline-none focus:border-gray-300 focus:bg-white"
            onChange={(ev) => {
              setJson(ev.target.value)
            }}
            value={json}
          >{json}</textarea>
          <div className="grid gap-2 mt-4">
            <button
              className="bg-gray-200 rounded-md py-2"
              onClick={() => {
              }}
            >
              Generate
            </button>
            <button
              className="bg-gray-200 rounded-md py-2"
              onClick={() => {
                navigator.clipboard.readText().then(
                  clipBoardData => {
                    setJson(clipBoardData)
                  }
                ).catch(e => alert(e));
              }}
            >
              Paste from Clipboard
            </button>
            <button
              className="bg-gray-200 rounded-md py-2"
              onClick={() => {
                if (invalidJson) {
                  alert('invalid JSON');
                }
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
            </button>
          </div>
        </section>
        <section>
          <div className="whitespace-pre p-6 h-screen overflow-y-auto">
            {
              loading &&
              <code>{`Loading... \n\n`}</code>
            }
            <code id="code-interfaces">
              {
                (!loading) && interfaces.map(obj => {
                  return `${obj}\n\n`
                })
              }
            </code>
          </div>
        </section>
      </div>
    </div>
  )
}
