import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  const [pagenumber, setPagenumber] = useState(1);
  function callApi() {
    let a = fetch(
      "https://hn.algolia.com/api/v1/search_by_date?query=story&page=" +
        pagenumber
    );
    a.then((response) => {
      // console.log("data coming         ", response);
      return response.json();
    })
      .then((result) => {
        // console.log("data abc    ", result.hits);
        // setData(result.hits);
        setData([...data, ...result.hits]);
        // data.push(result.hits);/
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    callApi();
  }, []);
  console.log("ababababbaba   ", data);
  // console.log("pagenumber", pagenumber);

  useEffect(() => {
    callApi();
  }, [pagenumber]);

  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Author</th>
          <th>Created At</th>
        </tr>
        {data &&
          data.map((ele, index, array) => {
            return (
              <tr>
                <td>{ele?.title}</td>
                <td>
                  <a href={ele?.url}>{ele?.url}</a>
                </td>
                <td>{ele?.author}</td>
                <td>{ele?.created_at}</td>
              </tr>
            );
          })}
      </table>

      <button
        onClick={() => {
          setPagenumber((previous) => {
            return previous + 1;
          });
        }}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
