import { Diary } from "./types";

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
  const data = [
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
    {
        "id": 3,
        "date": "2017-04-15",
        "weather": "windy",
        "visibility": "good",
        "comment": "I'm getting pretty confident although I hit a flock of birds"
    },
    {
        "id": 4,
        "date": "2017-05-11",
        "weather": "cloudy",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }
  ];

  return (
    <div>
      <h2>Diary Entries</h2>
      <Diaries diaries={data} />
    </div>
  );
}

export default App;
