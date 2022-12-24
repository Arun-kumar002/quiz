import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/** Custom Hook */
import { useFetchQestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked,count }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();
  const questions = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  console.log("questions", questions);
  // if(isLoading) return <h3 className='text-light'>isLoading</h3>
  // if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
  return (
    <div className="questions">
      <ul >
        <h1>{questions?.questions?.queue[count]?.question}</h1>
        {questions?.questions.queue[count]?.options?.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] == i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
