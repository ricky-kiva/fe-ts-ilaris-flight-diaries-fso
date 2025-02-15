import { useEffect, useState } from "react";
import { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";

interface DiariesProps {
  diaries: Diary[];
}

const DiaryItem = (props: Diary) => {
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

const Diaries = (props: DiariesProps) => {
  return (
    <div>
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

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    });
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
