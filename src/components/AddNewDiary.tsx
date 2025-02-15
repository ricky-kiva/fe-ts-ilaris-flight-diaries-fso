import { useState } from "react";
import { Diary, isDiary, isString, NewDiary } from "../types";
import { createDiary } from "../services/diaryService";

interface AddNewDiaryProps {
  addDiary: (diary: Diary) => void,
}

const AddNewDiary = (props: AddNewDiaryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearFormFields = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }

    await createDiary(newDiary).then(data => {
      if (isDiary(data)) {
        props.addDiary(data);
        clearFormFields();
        setErrorMessage('');

        return;
      }
      
      if (isString(data)) setErrorMessage(`Error: ${data}`);
    });
  }

  return (
    <div onSubmit={diaryCreation}>
      <h3>Add new entry</h3>
      {errorMessage !== ''
        ? <p style={{ color: "red" }}>{errorMessage}</p>
        : <></>
      }
      <form>
        <label htmlFor="date">date</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br/>
        <label htmlFor="visibility">visibility</label>
        <input
          type="text"
          id="visibility"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br/>
        <label htmlFor="weather">weather</label>
        <input
          type="text"
          id="weather"
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br/>
        <label htmlFor="comment">comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br/>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AddNewDiary;
