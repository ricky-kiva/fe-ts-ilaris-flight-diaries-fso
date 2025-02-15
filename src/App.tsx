import { useEffect, useState } from "react";
import { Diary, NewDiary } from "./types";
import { createDiary, getAllDiaries } from "./services/diaryService";

type DiaryItemProps = Omit<Diary, 'comment'>;

interface DiaryEntriesProps {
  diaries: DiaryItemProps[];
}

interface AddNewDiaryProps {
  addDiary: (diary: Diary) => void
}

const DiaryItem = (props: DiaryItemProps) => {
  return (
    <div>
      <h3>{props.date}</h3>
      <p>
        visibility: {props.visibility}
        <br/>weather: {props.weather}
      </p>
    </div>
  )
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h3>Diary entries</h3>
      {props.diaries.map((d) =>
        <DiaryItem key={d.id}
          id={d.id}
          date={d.date}
          visibility={d.visibility}
          weather={d.weather}
        />
      )}
    </div>
  )
}

const AddNewDiary = (props: AddNewDiaryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }

    createDiary(newDiary).then(data => {
      props.addDiary(data);
    });
  }

  return (
    <div onSubmit={diaryCreation}>
      <h3>Add new entry</h3>
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

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    });
  }, []);

  const addDiary = (diary: Diary) => {
    setDiaries(diaries.concat(diary));
  }

  return (
    <div>
      <AddNewDiary addDiary={addDiary}/>
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
